import { createContext, useEffect, useState } from "react";
import { fetchData, homeData } from "../utils/api";

export const Context = createContext();

export function AppContextProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (selectedCategory === "Home") {
      fetchHomeData();
    } else {
      fetchSelectedCategoryData(selectedCategory);
    }
  }, [selectedCategory]);

  async function fetchSelectedCategoryData(query) {
    setLoading(true);
    try {
      const response = await fetchData(`search/?q=${query}`);
      setSearchResults(response.contents);
      console.log(response.contents);
    } catch (e) {
      console.log("Error occured while fetching the data.");
      console.log(e);
      setSearchResults([]);
    }
    setLoading(false);
  }

  async function fetchHomeData() {
    setLoading(true);
    try {
      const response = await homeData();
      setSearchResults(response.contents);
      console.log(response.contents);
    } catch (e) {
      console.log("Error while fetching the data");
      console.log(e);
    }
    setLoading(false);
  }

  const values = {
    selectedCategory,
    setSelectedCategory,
    loading,
    setLoading,
    searchResults,
    setSearchResults,
    mobileMenu,
    setMobileMenu,
    fetchSelectedCategoryData,
    fetchHomeData,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/AppContext";
import { fetchData } from "../utils/api";
import LeftNav from "../components/LeftNav";
import SearchResultVideoCard from "../components/SearchResultVideoCard";

function SearchResult() {
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);
  const [result, setResult] = useState();

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  async function fetchSearchResults() {
    setLoading(true);
    try {
      const response = await fetchData(`search/?q=${searchQuery}`);
      setResult(response?.contents);
      console.log(response?.contents);
    } catch (e) {
      console.log("Error while fetching the data");
      console.log(e);
      setResult();
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black text-white">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) => {
            if (item.type !== "video") return false;
            let video = item?.video;
            return <SearchResultVideoCard key={video?.videoId} video={video} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;

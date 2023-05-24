import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  params: {
    hl: "en",
    gl: "US",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};

export async function fetchData(url) {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return await data;
}

export async function homeData() {
  const { data } = await axios.request(`${BASE_URL}/home/`, options);
  return await data;
}

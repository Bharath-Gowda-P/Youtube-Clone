import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Feed from "./pages/Feed";
import SearchResult from "./pages/SearchResult";
import VideoDetails from "./pages/VideoDetails";

function App() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
        <Route path="/video/:id" element={<VideoDetails />} />
      </Routes>
    </div>
  );
}

export default App;

import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/api";
import ReactPlayer from "react-player";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillEye, AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestionVideoCard from "../components/SuggestionVideoCard";

function VideoDetails() {
  const { setLoading } = useContext(Context);
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { id } = useParams();

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRealtedVideos();
  }, [id]);

  async function fetchVideoDetails() {
    setLoading(true);
    try {
      const response = await fetchData(`video/details/?id=${id}`);
      console.log(response);
      setVideo(response);
    } catch (e) {
      console.log("Error while fetching the data");
      console.log(e);
      setVideo();
    }
    setLoading(false);
  }

  async function fetchRealtedVideos() {
    setLoading(true);
    try {
      const response = await fetchData(`video/related-contents/?id=${id}`);
      console.log(response.contents);
      setRelatedVideos(response.contents);
    } catch (e) {
      console.log("Error while fetching the data");
      console.log(e);
      setRelatedVideos();
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-row justify-center  h-[calc(100%-56px)] bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="text-white text-sm font-bold md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex md:flex-row flex-col justify-between mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div>
                <div className="text-sm text-white/[0.7]">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] cursor-pointer">
                <AiOutlineLike className="text-xl text-white mr-2" />
                {`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4 cursor-pointer">
                <AiFillEye className="text-xl text-white mr-2" />
                {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-6 px-4  overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {relatedVideos?.map((item) => {
            if (item.type !== "video") return false;
            return (
              <SuggestionVideoCard
                key={item?.video?.videoId}
                video={item.video}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;

import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/api";
import ReactPlayer from "react-player";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestionVideoCard from "../components/SuggestionVideoCard";
import myImg from "../images/IMG_5360-2.jpg";
import { TbShare3 } from "react-icons/tb";
import CommentCard from "../components/CommentCard";

function VideoDetails() {
  const { setLoading } = useContext(Context);
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { id } = useParams();
  const [readMore, setReadMore] = useState(false);
  const [comments, setComments] = useState();

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRealtedVideos();
    fetchComments();
  }, [id]);

  async function fetchVideoDetails() {
    setLoading(true);
    try {
      const response = await fetchData(`video/details/?id=${id}`);
      console.log(response);
      setVideo(response);
    } catch (e) {
      console.log("Error while fetching the video details");
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
      console.log("Error while fetching the related videos");
      console.log(e);
      setRelatedVideos();
    }
    setLoading(false);
  }

  async function fetchComments() {
    setLoading(true);
    try {
      const response = await fetchData(`video/comments/?id=${id}`);
      console.log(response.comments);
      setComments(response.comments);
    } catch (e) {
      console.log("Error while fetching comments");
      console.log(e);
    }
  }

  return (
    <div className="flex flex-row justify-center  bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row h-full">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[800px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
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
                <TbShare3 className="text-xl text-white mr-2" />
                {"Share"}
              </div>
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-2 p-3 rounded-lg bg-white/[0.15] overflow-clip">
            <div className="text-white flex gap-5 items-center text-[14px] font-semibold">
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} Views`}</span>
              <span>{video?.publishedDate}</span>
            </div>
            {video?.description ? (
              <p className="text-white text-[13px] whitespace-pre-line">
                {readMore
                  ? video?.description
                  : `${video?.description.substring(0, 300)}...`}
                <br />
                <span
                  className="text-white text-[13px] cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Show less" : "Show more"}
                </span>
              </p>
            ) : (
              <div></div>
            )}
          </div>
          <div className="text-white mt-5">
            <p className="text-[15px]">{`${abbreviateNumber(
              video?.stats?.comments,
              2
            )} Comments`}</p>
          </div>
          <div className="flex gap-5">
            <div className="flex h-10 w-10 mb-3 overflow-hidden rounded-full mt-6">
              <img src={myImg} alt="" />
            </div>
            <div className="flex flex-col text-white mt-7">
              <span className="text-[15px] text-white/[0.5]">
                Add a comment...
              </span>
              <hr className="my-1 border-white/[0.2] lg:w-[600px] w-[300px]" />
            </div>
          </div>
          <div className="text-white hidden md:block" id="commentCard">
            {comments?.map((item) => {
              return <CommentCard key={item.commentId} comment={item} />;
            })}
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

import { Link } from "react-router-dom";
import VideoLength from "../shared/VIdeoLength";
import LiveBadge from "../shared/LiveBadge";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video.videoId}`}>
      <div className="flex flex-col mb-8">
        <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
          <img
            src={video?.thumbnails[0]?.url}
            alt=""
            className="h-full w-full object-cover"
          />
          {video?.lengthSeconds === null ? (
            <LiveBadge badge={video?.badges[0]} />
          ) : (
            <VideoLength time={video?.lengthSeconds} />
          )}
        </div>
        <div className="flex mt-3 text-white">
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={video?.author?.avatar[0]?.url}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold line-clamp-2">
              {video?.title}
            </span>
            <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
              {video?.author?.title}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
              )}
            </span>
            <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
              <span>
                {video?.stats?.views
                  ? `${abbreviateNumber(video?.stats?.views, 2)} views`
                  : `${abbreviateNumber(video?.stats?.viewers, 2)} watching`}
              </span>
              <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                {video?.badges[0] === "LIVE" ? "" : "."}
              </span>
              <span className="truncate">{video?.publishedTimeText}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;

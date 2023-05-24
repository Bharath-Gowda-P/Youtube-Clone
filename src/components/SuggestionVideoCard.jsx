import { Link } from "react-router-dom";
import VideoLength from "../shared/VIdeoLength";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

function SuggestionVideoCard({ video }) {
  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex mb-3">
        <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={video?.thumbnails[0]?.url}
            alt=""
          />
          {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
        </div>
        <div className="flex flex-col ml-3 overflow-hidden">
          <span className="text-white text-sm lg:text-xs xl:text-sm font-bold line-clamp-2">
            {video?.title}
          </span>
          <span className="text-white/[0.7] text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 flex items-center">
            {video?.author?.title}
            {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
              <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
            )}
          </span>
          <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
            <span>
              {video?.stats?.views
                ? `${abbreviateNumber(video?.stats?.views, 2)} views`
                : `${abbreviateNumber(video?.stats?.viewers, 2)} watching`}
            </span>
            <span className="flex text-[24px] items-center justify-center leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
              {video?.isLiveNow ? "" : "."}
            </span>
            <span className="truncate">{video?.publishedTimeText}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SuggestionVideoCard;

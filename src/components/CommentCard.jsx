import { AiOutlineDislike, AiOutlineDown, AiOutlineLike } from "react-icons/ai";

function CommentCard({ comment }) {
  return (
    <div className="flex gap-5">
      <div className="flex h-10 w-10 overflow-hidden rounded-full mt-6">
        <img src={comment?.author?.avatar[0]?.url} alt="" />
      </div>
      <div className="flex flex-col mt-7">
        <div className="flex gap-2">
          <p className="font-bold text-[12px]">{comment?.author?.title}</p>
          <p className="text-white/[0.7] text-[12px] font-semibold">
            {comment?.publishedTimeText}
          </p>
        </div>
        <div className="mt-1">
          <p className="line-clamp-3 text-sm font-medium">{comment?.content}</p>
        </div>
        <div className="mt-2 flex gap-2 items-center">
          <AiOutlineLike className="text-[20px]" />
          <span className="text-[13px] text-white/[0.7]">
            {comment?.stats?.votes}
          </span>
          <AiOutlineDislike className="ml-2 text-[20px]" />
          <span className="flex ml-4 text-[12px] font-bold items-center">
            Reply
          </span>
        </div>
        {comment?.stats?.replies > 0 ? (
          <div className="flex gap-2 mt-2 text-[13px] font-bold items-center ml-3">
            <AiOutlineDown className="text-blue-400" />
            <span className="text-blue-400">
              {comment?.stats?.replies} Replies
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default CommentCard;

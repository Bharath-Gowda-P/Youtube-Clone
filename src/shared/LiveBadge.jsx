function LiveBadge({ badge }) {
  return (
    <span className="absolute top-2 right-2 bg-red-800 py-1 px-2 text-white text-xs rounded-md">
      {badge}
    </span>
  );
}

export default LiveBadge;

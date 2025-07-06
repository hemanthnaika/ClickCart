const CardSkeleton = () => {
  return (
    <div className="animate-pulse border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[220px]">
      <div className="flex items-center justify-center px-2">
        <div className="bg-gray-300 rounded-md w-24 h-24 md:w-36 md:h-36" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="flex items-center gap-1">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="h-3 w-3 bg-gray-300 rounded" />
            ))}
          <div className="h-3 w-6 bg-gray-300 rounded" />
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="h-5 bg-gray-300 rounded w-1/2" />
          <div className="h-8 w-16 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;

const SkeletonCard = () => (
  <div className="animate-pulse bg-white shadow-lg rounded-xl overflow-hidden flex flex-col justify-start items-center h-full">
    <div className="w-full h-64 bg-gray-200" />
    <div className="w-3/4 h-6 mt-4 bg-gray-300 rounded" />
    <div className="w-1/2 h-4 mt-2 bg-gray-300 rounded" />
  </div>
);

export default SkeletonCard;

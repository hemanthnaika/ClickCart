const Spinner = () => {
  return (
    <div className="h-[55vh] w-full flex items-center justify-center">
      <div className="flex justify-center items-center py-10">
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;

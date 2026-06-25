function LoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-5 animate-pulse"
        >
          <div className="w-full h-52 bg-gray-300 rounded-lg"></div>

          <div className="h-6 bg-gray-300 rounded mt-5"></div>

          <div className="h-4 bg-gray-300 rounded mt-3 w-3/4"></div>

          <div className="h-4 bg-gray-300 rounded mt-2 w-1/2"></div>

          <div className="h-5 bg-gray-300 rounded mt-5 w-1/3"></div>

          <div className="h-4 bg-gray-300 rounded mt-4 w-2/3"></div>

          <div className="h-10 bg-gray-300 rounded mt-6"></div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
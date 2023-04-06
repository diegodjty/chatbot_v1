const Animation = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 rounded-full bg-gradient-to-t from-red-400 to-red-600 animate-pulse"></div>
      <div className="w-4 h-4 rounded-full bg-gradient-to-t from-red-400 to-red-600  delay-75"></div>
      <div className="w-4 h-4 rounded-full bg-gradient-to-t from-red-400 to-red-600 animate-pulse delay-150"></div>
    </div>
  );
};

export default Animation;

export default function Loader() {
  return (
    <div className="w-full h-full min-h-[200px] flex flex-col justify-center items-center bg-transparent">
      {/* Outer Ring */}
      <div className="relative">
        {/* Static Background Ring */}
        <div className="w-16 h-16 border-4 border-slate-800 rounded-full"></div>
        
        {/* Animated Spinning Ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      
      {/*  Loading Text */}
      <span className="mt-4 text-slate-400 text-sm font-medium animate-pulse">
        Loading...
      </span>
    </div>
  );
}
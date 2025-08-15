"use client";

export const LoaderPoint = () => {
  return (
    <div className="flex gap-1">
      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.3s" }}></span>
      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.5s" }}></span>
    </div>
  );
}
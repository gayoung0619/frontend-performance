import { useEffect, useRef } from "react";

interface SkeltonProps {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

const Skelton = ({ x, y, width, height, visible }: SkeltonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !ref.current) return;

    setTimeout(() => {
      ref.current!.style.display = "none";
    }, 1000);
  }, [ref, visible]);

  return (
    <div 
      ref={ref} 
      className={`opacity-100 transition-opacity duration-1000`}
      style={{ opacity: visible ? 0 : 1 }}
    >
      <div 
        className="absolute animate-pulse"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`, 
          left: `${x}px`, 
          top: `${y}px`,
        }}
      >
        <div className="w-full h-full bg-gray-200 rounded-md dark:bg-gray-700 mb-4"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
};

export default Skelton;

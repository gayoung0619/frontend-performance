import React, {useEffect, useRef, useState} from "react";
import NoImage from "../assets/noImage.jpg";
interface ILazyImage {
  isLCP: string,
  src: string
}
const LazyImage: React.FC<ILazyImage> = ({src, isLCP}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const imgRef = useRef<HTMLImageElement>(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver(intersectionOberserver)
    imgRef.current && observer.current.observe(imgRef.current)
  }, []);

  const intersectionOberserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        setIsLoading(true);
      }
    })
  }

  return (
      <img
          ref={imgRef}
          alt={"숲이미지"}
          srcSet={isLoading ? src : NoImage}
          fetchPriority={isLCP ? "high" : "auto"}
          width="100%"
          height="100%"
      />
  )
}

export default LazyImage
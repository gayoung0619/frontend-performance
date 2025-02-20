import React, {useEffect, useRef, useState} from "react";
import NoImage from "../assets/noImage.jpg";
interface ILazyImage {
  isLCP: boolean;
  src: string;
}
const LazyImage: React.FC<ILazyImage> = ({src, isLCP}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const imgRef = useRef<HTMLImageElement>(null);
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(intersectionOberserver)
    // imgRef.current가 존재하면 observe를 호출하여 해당 이미지 요소를 감시
    imgRef.current && observer.current.observe(imgRef.current)
  }, []);

  const intersectionOberserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    // entries -> 감시중인 요소들의 상태 정보를 담은 배열
    // io -> observer.current를의미
    entries.forEach((entry) => {
      // 요소가 화면에 들어왔다?
      if (entry.isIntersecting) {
        // 감시 해재
        io.unobserve(entry.target);
        // 실제 이미지를 로드
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
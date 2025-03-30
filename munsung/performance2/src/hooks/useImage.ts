import { useEffect, useRef, useState } from "react"

const options = {};

export const useImage = (src: string): [React.RefObject<HTMLImageElement | null>, boolean] => {
  const ref = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            ref.current!.src = img.src;
            setVisible(true);
          };
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, src]);

  return [ref, visible];
}
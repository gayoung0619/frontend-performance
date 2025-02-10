import { useCallback, useEffect, useState } from "react";

const PER_SCROLL_MOVE = 100;
const SHADOW_ITEM_LENGTH = 5;

const calculateScrollHeight = (containerHeight: number, itemHeight: number, total: number) => {
  const totalHeight = itemHeight * total;
  return containerHeight < totalHeight 
    ? containerHeight * (containerHeight / totalHeight)
    : 0
};

interface ScrollProps {
  itemHeight: number;
  total: number;
  container: HTMLElement | null;
}

export const useScroll = ({ container, itemHeight, total }: ScrollProps) => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [position, setPosition] = useState(0);

  const scroll = useCallback((e: WheelEvent) => {
    if (!container) return;

    const parentHeight = container.offsetHeight;
    const max = itemHeight * total - parentHeight + 1;
    const moveBy = e.deltaY > 0 ? PER_SCROLL_MOVE : -PER_SCROLL_MOVE;

    setPosition((prev) => {
      const move = Math.min(Math.max(prev + moveBy, 0), max);

      setScrollPosition(() => {
        const percent = move / max;
        return (parentHeight - scrollHeight) * percent
      });

      return move;
    });
  }, [scrollHeight, itemHeight, container, total]);

  const start = useCallback((container: HTMLElement) => {
    container.addEventListener('wheel', scroll);
  }, [scroll]);

  const end = useCallback((container: HTMLElement) => {
    container.removeEventListener('wheel', scroll);
  }, [scroll]);

  const init = useCallback(() => {
    if (!container) return;
    
    setScrollHeight(calculateScrollHeight(container.clientHeight, itemHeight, total));
    start(container);
  }, [itemHeight, container, start, total]);


  useEffect(() => {
    if (!container || !itemHeight || !total) return;

    init();
    return () => end(container);
  }, [itemHeight, total, init, start, end, container]);

  return {
    scrollHeight, 
    scrollPosition,
    position
  };
};


interface DataProps {
  itemHeight: number;
  position: number;
  container: HTMLElement | null;
  total: number;
}

export const useDataByScroll = ({ 
  container, 
  itemHeight, 
  position, 
  total 
}: DataProps) => {
  if (!container || !itemHeight) return { startData: 0, endData: 1, top: 0 };

  const containerHeight = container.offsetHeight;
  const contentLength = Math.ceil(containerHeight / itemHeight);

  const start = Math.floor(position / itemHeight);

  const startData = Math.max(0, start - SHADOW_ITEM_LENGTH);
  const endData = Math.min(total, start + contentLength + SHADOW_ITEM_LENGTH + 1);

  const index = Math.floor(position / itemHeight);
  const top = index < 10 ? position : position % itemHeight;

  return {
    startData,
    endData,
    top,
  }
};
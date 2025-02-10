import { useData } from "../hooks/useData";
import Scroll from "./Scroll";
import List from "./List";

import style from "./component.module.css";
import { createRef, useEffect, useRef, useState } from "react";
import { useDataByScroll, useScroll } from "../hooks/useScroll";

const Container = () => {
  const [itemHeight, setItemHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = createRef<HTMLDivElement>();
  
  const { data = [] } = useData();

  const { 
    scrollHeight, 
    scrollPosition,  
    position, 
  } = useScroll({ 
    container: containerRef.current, 
    itemHeight, 
    total: data.length
  });

  const {
    startData,
    endData,
    top,
  } = useDataByScroll({ 
    container: containerRef.current, 
    itemHeight, 
    position,
    total: data.length
  });

  useEffect(() => {
    if (!itemRef.current) return;

    const ONLY_FIRST_ITEM_BORDER_WIDTH = 1
    setItemHeight(itemRef.current.offsetHeight - ONLY_FIRST_ITEM_BORDER_WIDTH);

    const ref = itemRef.current;

    window.addEventListener(type, listener)
    const a = setInterval(() => {

    });

    return () => {
      clearInterval(id);
      console.log(ref.ariaValueMax);
    }
  }, [itemRef]);

  const filterData = data.slice(startData, endData);

  return(
    <div ref={containerRef} className={style.container}>
      <List 
        ref={itemRef} 
        data={filterData} 
        position={top}
      />
      <Scroll 
        height={scrollHeight}
        position={scrollPosition}
      />
    </div>
  )
};

export default Container;
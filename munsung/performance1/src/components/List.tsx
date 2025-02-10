import { forwardRef } from "react";
import { Data } from "../api/school";

import style from "./component.module.css";

interface ListProps {
  data: Data[];
  position: number;
}


const Item = forwardRef<HTMLDivElement, Data>(({ name }: Data, ref) => {
  return (
    <div ref={ref} className={style.item}>
      <p>{name}</p>
    </div>
  )
});

const List = forwardRef<HTMLDivElement, ListProps>(({ data, position }: ListProps, ref) => {
  return (
    <div className={style.list} style={{ top: -position }}>
      {data.map((item, i) => 
        <Item 
          ref={!i ? ref : null}
          key={item.id} 
          {...item} 
        />)}
    </div>
  )
});

export default List;
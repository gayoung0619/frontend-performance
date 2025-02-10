import style from "./component.module.css";

interface ScrollProps {
  height: number;
  position: number;
}

const Scroll = ({ height, position }: ScrollProps) => {
  return (
    <div className={style['scroll-container']}>
      <div 
        className={style.scroll} 
        style={{ 
          height: `${Math.max(height, 10)}px`,
          top: `${position}px`
        }}
      />
    </div>
  )
};

export default Scroll;
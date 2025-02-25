import Image from "./image";

const List = () => {
  const WIDTH = 300;
  const HEIGHT = 400;
  const length = 100;

  return (
    <div className="relative w-[930px] h-full">
      {Array.from({ length }).map((_, index) => (
        <Image 
          src={`https://picsum.photos/id/${index}/300/400`}
          key={index} 
          width={WIDTH} 
          height={HEIGHT} 
          x={index % 3 * WIDTH + 15 * (index % 3)} 
          y={Math.floor(index / 3) * HEIGHT + 15 * Math.floor(index / 3)}
        />
      ))}
    </div>
  )
};
export default List;

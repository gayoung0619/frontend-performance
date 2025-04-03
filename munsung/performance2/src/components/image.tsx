import { useImage } from "../hooks/useImage";
import Skelton from "./skelton";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
}

const Image = ({ x, y, width, height, src, ...props }: ImageProps) => {
  const [imageRef, visible] = useImage(src);

  return (
    <div>
      <img
        ref={imageRef}
        className="absolute rounded-md opacity-0 transition-opacity duration-1000"
        style={{ left: x, top: y, width, height, opacity: visible ? 1 : 0 }}
        {...props}
      />
      <Skelton x={x} y={y} width={width} height={height} visible={visible} />
    </div>
  );
};

export default Image;

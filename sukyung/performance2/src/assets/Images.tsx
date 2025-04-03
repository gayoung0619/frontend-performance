import { useQuery } from '@tanstack/react-query';
import LazyImage from './LazyImage';

type LargeImgType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

const Images = () => {
  const fetcImages = () => {
    return fetch('https://picsum.photos/v2/list').then((res) => res.json());
  };

  const { data } = useQuery({
    queryKey: ['images'],
    queryFn: () => fetcImages(),
  });

  if (!data) return;

  console.log(data);

  return (
    <div className="w-full">
      {data.map((image: LargeImgType) => (
        <LazyImage
          key={image.id}
          url={image.download_url}
          author={image.author}
        />
      ))}
    </div>
  );
};
export default Images;

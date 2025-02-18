import image from './assets/image.jpg';
import './App.css';
import LazyImage from "./components/lazylmage.tsx";

function App() {

  const images = Array.from({ length: 100 }, (_, index) => (
      <LazyImage
          key={index}
          src={`https://picsum.photos/id/${index}/800/600 800w, https://picsum.photos/id/${index}/400/300 400w`}
          sizes="(max-width: 600px) 400px, 800px"
          isLCP={index === 0}
      />
  ));

  return (
      <div className="image-container">
        {images}
      </div>
  )}

export default App;

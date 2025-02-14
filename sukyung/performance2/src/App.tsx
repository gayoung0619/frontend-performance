import image from './assets/image.webp';
import './App.css';

function App() {
  const images = Array.from({ length: 100 }, (_, index) => (
    <img key={index} src={image} width="100%" loading="lazy" />
  ));

  return <div className="image-grid">{images}</div>;
}

export default App;

import image from './assets/image.jpg';
import './App.css';

function App() {
  const images = Array.from({ length: 100 }, (_, index) => (
      <img key={index} src={image} width="100%" />
  ));

  return <div className="image-grid">{images}</div>;
}

export default App;

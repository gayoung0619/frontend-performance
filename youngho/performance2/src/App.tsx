import image from './assets/image.jpg';
import './App.css';
import { useState } from 'react';
import styled from 'styled-components';

function App() {
  const images = Array.from({ length: 100 }, () => image);
  const [loadedImages, setLoadedImages] = useState(Array(100).fill(false));

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  return (
    <GridContainer>
      {images.map((src, index) => (
        <StyledCard key={index}>
          <ImageContainer>
            {!loadedImages[index] && <p>Loading...</p>}
            <StyledImage
              src={src}
              alt={`Random Image ${index}`}
              loading="lazy"
              onLoad={() => handleImageLoad(index)}
            />
          </ImageContainer>
        </StyledCard>
      ))}
    </GridContainer>
  );
}

export default App;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
`;

const StyledCard = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
  background-color: #fff;
  position: relative;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5e7eb;
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

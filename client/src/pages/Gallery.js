import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FsLightbox from 'fslightbox-react';

import { Spinner, Thumbnail } from '../components';

const Gallery = () => {
  const [images, setImages] = useState({});
  const [fullImages, setFullImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxController, setLightboxController] = useState({ toggler: false, slide: 1 });

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axios.get('./images');

        setImages(response.data);

        const tempFullImages = await response.data.map(image => {
          return "/uploads/originals/" + image.filename;
        });
        setFullImages(tempFullImages);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchImages();
  }, []);

  const openLightboxOnSlide = (number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number
    });
  };

  return (
    <>
      <h1>Gallery</h1>
      <div>
        {loading ? <Spinner /> :
          images.map((image, index) => (
            <Thumbnail key={image._id} image={image.name} selectSlide={() => openLightboxOnSlide(index + 1)} />
          ))
        }
      </div>
      {!loading && <FsLightbox
        toggler={lightboxController.toggler}
        sources={fullImages}
        slide={lightboxController.slide} 
      />}
    </>
  );
}

export default Gallery;

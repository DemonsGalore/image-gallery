import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Spinner, Thumbnail } from '../components';

const Gallery = () => {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axios.get('./images');

        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchImages();
  }, []);

  return (
    <>
      <h1>Gallery</h1>
      <div>
        {loading ? <Spinner /> :
          images.map(image => (
            <Thumbnail key={image._id} image={image.name} />
          ))
        }
      </div>
    </>
  );
}

export default Gallery;

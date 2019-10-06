import React from 'react';
import PropTypes from 'prop-types';
import { StyledThumbnail } from './Thumbnail.styled';

const Thumbnail = ({ image }) => {  
  return (
    <StyledThumbnail>
      <source srcSet={"./uploads/thumbnails/" + image + "-thumbnail.webp"} type="image/webp" />
      <source srcSet={"./uploads/thumbnails/" + image + "-thumbnail.jpg"} type="image/jpeg" /> 
      <img src={"./uploads/thumbnails/" + image + "-thumbnail.jpg"} alt="" />
    </StyledThumbnail>
  );
};

Thumbnail.propTypes = {
  image: PropTypes.string.isRequired
};

export default Thumbnail;

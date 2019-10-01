import React from 'react';
import { NavLink } from 'react-router-dom';
import { StyledNavigation } from './Navigation.styled';

const Navigation = () => {
  return (
    <StyledNavigation>
      <ul>
        <li><NavLink to="/gallery">Gallery</NavLink></li>
        <li><NavLink to="/upload">Upload</NavLink></li>
      </ul>
    </StyledNavigation>
  );
};

export default Navigation;

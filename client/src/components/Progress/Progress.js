import React from 'react';
import PropTypes from 'prop-types';
import { StyledProgress } from './Progress.styled';

const Progress = ({ percentage }) => {
  return (
    <StyledProgress
      role="progressbar"
      style={{ width: `${percentage}%` }}
      aria-valuenow={ percentage }
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {percentage}%
    </StyledProgress>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;

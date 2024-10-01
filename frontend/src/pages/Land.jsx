import React from 'react';
import backgroundImage from '../assets/petbg.gif';

const Land = () => {
  return (
    <div
      className="h-screen bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
    </div>
  );
};

export default Land;

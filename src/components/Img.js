import React from 'react';

const Img = () => {
  return (
    <img
      src="https://www.noyen.com/wp-content/uploads/2020/10/iso.jpg"
      alt="Baron Fig Notebook"
      style={{
        width: '100%', // Take up 100% of the container width
        height: 'auto', // Automatically adjust the height to maintain aspect ratio
        display: 'block', // Ensure the image behaves as a block element
        objectFit: 'cover', // Cover the entire area while maintaining aspect ratio
      }}
    />
  );
};

export default Img;

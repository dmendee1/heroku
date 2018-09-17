import React from 'react';
import Dropzone from 'react-dropzone';

const Uploader = ({ children, disableClick }) => (
  <Dropzone className="ignore" onDrop={files => console.log(files)} disableClick={disableClick}>
    {children}
  </Dropzone>
);

export default Uploader;
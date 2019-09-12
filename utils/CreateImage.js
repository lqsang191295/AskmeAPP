const CreateImage = src => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = src;
  return img;
};

export default CreateImage;

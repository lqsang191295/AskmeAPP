import CreateImage from '~/utils/CreateImage';

export const CacheImage = image => {
  if (!window.resources) window.resources = {};
  const images = [{ name: image.name, src: image.src }];

  for (let i in images) {
    window.resources[images[i].name] = CreateImage(images[i].src);
  }
};

export const CacheImages = images => {
  if (!window.resources) window.resources = {};
  for (let i in images) {
    window.resources[images[i].name] = CreateImage(images[i].src);
  }
};

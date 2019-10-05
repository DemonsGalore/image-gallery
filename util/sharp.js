const sharp = require('sharp');

const sharpWebP = async (image, destination) => {
  await sharp(image)
    .webp({
      quality: 90,
    })
    .toFile(destination);
};

const sharpWebPThumbnail = async (image, destination) => {
  await sharp(image)
    .webp({
      quality: 90,
    })
    .resize(300, 300, {
      fit: 'cover'
    })
    .toFile(destination);
};

const sharpJPEGThumbnail = async (image, destination) => {
  await sharp(image)
    .jpeg({
      quality: 90,
      progressive: true
    })
    .resize(300, 300, {
      fit: 'cover'
    })
    .toFile(destination);
};

const sharpJPEG = async (image, destination) => {

};

module.exports = {
  sharpWebP,
  sharpWebPThumbnail,
  sharpJPEGThumbnail,
};

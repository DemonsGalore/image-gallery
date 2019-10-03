const path = require('path');

module.exports = checkForImageType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime 
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname) {
    return cb(null, true);
  } else {
    cb({ message: 'Images only!' });
  }
};

const express = require('express');
const path = require('path');
const multer = require('multer');
const isEmpty = require('./util/is-empty');

// set storage engine
const storage = multer.diskStorage({
  destination: './client/public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// upload initialization
const upload = multer({
  storage,
  limits: { fileSize: 5242880 }, // 5MB in Byte
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('file');

// check file type
const checkFileType = (file, cb) => {
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

// ExpressServer initialization
const app = express();
app.disable('x-powered-by');

// express body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/upload', (req, res) => {
  upload(req, res, (error) => {
    
    if (error) {
      return res.status(500).send(error);
    }

    if (isEmpty(req.file)) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { file } = req;

    // TODO: store in database

    return res.json({ fileName: file.filename, filePath: `/uploads/${file.filename}` });
  });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

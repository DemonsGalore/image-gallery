const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');

const { Image } = require('./models');
const isEmpty = require('./util/is-empty');
const checkForImageType = require('./util/check-for-image');
const { sharpWebP, sharpWebPThumbnail, sharpJPEGThumbnail } = require('./util/sharp');
const { mongoURI } = require('./config/keys');

// set storage engine
const storage = multer.diskStorage({
  destination: './client/public/uploads/originals',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// upload initialization
const upload = multer({
  storage,
  limits: { fileSize: 5242880 }, // 5MB in Byte
  fileFilter: (req, file, cb) => {
    checkForImageType(file, cb);
  }
}).single('file');

// ExpressServer initialization
const app = express();
app.disable('x-powered-by');

// express body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// upload route
app.post('/upload', (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res.status(500).send(error);
    }

    if (isEmpty(req.file)) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { file } = req;
    const name = path.parse(file.filename).name;

    const newImage = new Image(req.file);
    newImage.name = name;

    // store image in database
    try {
      const result = await newImage.save();

      // save as webP
      sharpWebP(result.path, `./client/public/uploads/webp/${result.name}.webp`);
      // save thumbnail as WebP and JPG
      sharpWebPThumbnail(result.path, `./client/public/uploads/thumbnails/${result.name}-thumbnail.webp`);
      sharpJPEGThumbnail(result.path, `./client/public/uploads/thumbnails/${result.name}-thumbnail.jpg`);

      return res.json({ fileName: result.filename, filePath: `./uploads/originals/${result.filename}` });
    } catch (error) {
      throw error;
    }
  });
});

// get all images
app.get('/images', async (req, res) => {
  const errors = {};

  const images = await Image.find();

  if (!images) {
    errors.noimages = 'There are no iamges.';
    return res.status(404).json(errors);
  }

  return res.json(images)
});

// connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected.');
    // start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT}`));
  })
  .catch(error => console.log("Error", error));

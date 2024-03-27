const express = require("express");
const app = express();
const fs = require("fs");
const port = 5000;
const cors = require("cors");
const multer = require("multer");
app.use(cors());
// app.use('/uploads', express.static('./uploads'));
// Use above if you wanna get all images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
  //   filename: (req, file, cb) => {
  //     cb(null, file.originalname);
  //   },
});

const upload = multer({ storage: storage });

app.post("/image", upload.single("image"), function (req, res) {
  const imageName = req.file.filename;
  const description = req.body.description;
  res.json({ succss: true, message: "Uploaded", description, imageName });
});
app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const readStream = fs.createReadStream(`images/${imageName}`);
  readStream.pipe(res);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

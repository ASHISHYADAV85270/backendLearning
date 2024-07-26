import multer from "multer";

const storage = multer.diskStorage({
  // the location where files is saved
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  // filename
  filename: function (req, file, cb) {
  // date we are using kii same file alag alag name sai aaigii
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

import multer from "multer";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Middleware to handling the images
 */
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "public");
  },
  filename: (_req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype as keyof typeof MIME_TYPES];
    callback(null, name + Date.now() + "." + extension);
  },
});

export const multerConfig = multer({ storage }).single("file");

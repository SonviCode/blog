import multer from "multer";
import { NextFunction, Request, Response } from "express";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Middleware to handling the images
 */
export const multerConfig = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const storage = multer.diskStorage({
      destination: (_req, _file, callback) => {
        callback(null, "images");
      },
      filename: (_req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype as keyof typeof MIME_TYPES];
        callback(null, name + Date.now() + "." + extension);
      },
    });

    console.log(storage);

    multer({ storage }).single("image");

    next();
  } catch (error) {
    res.status(401).json({ message: "problème avec image" });
  }
};

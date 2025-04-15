import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

// set storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`
    );
  },
});

// filters
type FileFilterMulter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => void;
const checkFileFilters: FileFilterMulter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'));
  }
};

// multer middleware

const multerMiddleware = multer({
  storage,
  fileFilter: checkFileFilters,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
});

export default multerMiddleware;

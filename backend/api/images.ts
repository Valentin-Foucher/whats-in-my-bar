import express from 'express';
import { Multer } from 'multer';
import { retrieveImage, uploadImage, updateImage } from '../services/images';


export default (upload: Multer): express.Router => {
  const router = express.Router();

  router.post('', upload.single('file'), (req, res) => {
    uploadImage(req, res);
  });

  router.get('/:filename', (req, res) => {
    retrieveImage(req, res);
  });

  router.put('', upload.single('file'), (req, res) => {
    updateImage(req, res);
  });

  return router
}
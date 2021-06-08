import { ObjectID } from 'bson';
import { Response } from 'express';
import { Request } from 'express';
import { Types } from 'mongoose';
import fs from 'fs';
import path from 'path';
import { gfs } from '../app';
import { badRequest, conflict, noReply } from '../helpers/communication';
import { FILE_TYPES } from '../helpers/constants';
import images from './../db/business/images';


const uploadImage = async (req: Request, res: Response) => {
  const { filename, originalname } = req.file;

  if (await images.count(new ObjectID(filename)) > 0) {
    return conflict(res, 'An image already exists for this item');
  };

  await images.create(new ObjectID(filename), path.extname(originalname).replace('.', ''));

  noReply(res);
};

const retrieveImage = async (req: Request, res: Response) => {
  const { filename } = req.params;

  gfs.find({ filename }).sort({ uploadDate: 1 }).toArray((_, files) => {
    if (files.length !== 0) {
      files.forEach((file, i) => {
        if (i > 0) {
          gfs.delete(new Types.ObjectId(file._id), () => {})
        };
      });

      const file = files[0];
      if (FILE_TYPES.includes(file.contentType.replace('image/', ''))) {
        gfs.openDownloadStreamByName(filename).pipe(res);
      } else {
        badRequest(res, 'Not a valid image');
      };
    } else {
      fs.createReadStream("../assets/not_found.png").pipe(res);
    }
  });
};

const updateImage = async (req: Request, res: Response) => {
  const { filename, originalname } = req.file;
  await images.removeByFilename(new ObjectID(filename));

  await images.create(new ObjectID(filename), path.extname(originalname).replace('.', ''));

  noReply(res);
};

export { uploadImage, retrieveImage, updateImage };

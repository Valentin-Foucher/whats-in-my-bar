import { Request } from 'express';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import multer, { Multer } from 'multer';
import GridFsStorage from 'multer-gridfs-storage';

export const mongoConnect = async (connectionString: string): Promise<{ connection: mongoose.Connection, upload: Multer, gfs: GridFSBucket }> => {
  console.log(`Connecting to mongo ${connectionString}...`);
  await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log(`Connected to ${connectionString}`);

  const connection = mongoose.connection;
  connection.on('error', console.error.bind(console, 'Connection error:'));

  const storage = new GridFsStorage({
    url: connectionString,
    file: (req: Request, _) => {
        return new Promise((resolve, _) => {
          const fileInfo = {
              filename: req.body.referenceId,
              bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      }
  });
  const upload = multer({ storage });

  const gfs = new GridFSBucket(connection.db, { bucketName: 'uploads' });

  return { connection, upload, gfs };
}
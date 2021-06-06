import { GridFSBucket } from 'mongodb';
import { Connection } from 'mongoose';
import { Multer } from 'multer';
import images from './api/images';
import { mongoConnect } from './loaders/mongo';
import { makeServer } from './loaders/server';

const port = process.env.PORT || 8080;

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'bar';

const connectionString = process.env.ENV == 'production'
    ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${dbHost}/${dbName}`
    : `mongodb://${dbHost}:${dbPort}/${dbName}`;

let connection: Connection = null;
let upload: Multer = null;
let gfs: GridFSBucket = null;

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});


mongoConnect(connectionString).then((result) => {
  connection = result.connection;
  upload = result.upload;
  gfs = result.gfs;

  server.use('/api/images', images(upload))
});

const server = makeServer({ port });

server.start();


export default server;
export { connection, gfs, upload };

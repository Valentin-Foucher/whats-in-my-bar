import { ObjectID } from 'bson';
import { IImage } from 'whats-in-my-bar';
import Image from './../models/images';

module Images {
  export const create = async (filename: ObjectID, filetype: string): Promise<IImage> => {
    return await Image.create({ filename, filetype });
  };

  export const count = async (filename: ObjectID): Promise<number> => {
    return await Image.countDocuments({ filename });
  };

  export const removeByFilename = async (filename: ObjectID) => {
    await Image.deleteMany({ filename });
  };

  export const drop = async () => {
    await Image.deleteMany({});
  };
};

export default Images;
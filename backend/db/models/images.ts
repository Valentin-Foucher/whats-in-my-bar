import { model, Schema, Types } from 'mongoose';
import { IImage } from 'whats-in-my-bar';
import { FILE_TYPES } from '../../helpers/constants';


const ImageSchemaDefinition = {
  filename: { type: Types.ObjectId, required: true },
  filetype: { type: String, enum: FILE_TYPES, required: true },
  content: { type: String, required: false }
}

export default model<IImage>('Image', new Schema(ImageSchemaDefinition), 'images');

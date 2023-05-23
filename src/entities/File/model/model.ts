import { Schema, model } from 'mongoose';

export const fileModel = model(
  'file-data',
  new Schema({
    uploadDate: { type: Number, required: true },
  })
);

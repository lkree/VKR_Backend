import { Schema, model } from 'mongoose';

export const configModel = model(
  'Config',
  new Schema({
    emailSettings: {
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      config: { type: Object, required: true },
    },
  })
);

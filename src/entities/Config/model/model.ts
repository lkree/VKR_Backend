import { Schema, model } from 'mongoose';

export const configModel = model(
  'Config',
  new Schema({
    emailSettings: {
      host: { type: String, unique: true, required: true },
      port: { type: Number, required: true },
      secure: { type: Boolean, required: true },
      user: { type: String, required: true },
      password: { type: String, required: true },
    },
  })
);

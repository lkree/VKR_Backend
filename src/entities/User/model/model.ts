import { Schema, model } from 'mongoose';

export const userModel = model(
  'User',
  new Schema({
    email: { type: String, unique: true, required: true },
    emailForMailings: { type: String, required: true },
    password: { type: String, required: true },
    accessLevel: { type: String, required: true },
  })
);

// root
// jk2CKqcsRqFaVOdY

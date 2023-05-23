import { Schema, model } from 'mongoose';

export const citiesPrefixModel = model(
  'cities-prefixes',
  new Schema({
    name: { type: String, required: true },
    prefix: { type: String, unique: true, required: true },
  })
);

// root
// jk2CKqcsRqFaVOdY

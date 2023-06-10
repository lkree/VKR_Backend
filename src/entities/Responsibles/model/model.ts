import { Schema, model } from 'mongoose';

export const responsiblePersonsModel = model(
  'responsible-persons',
  new Schema({
    cityName: { type: String, required: true, unique: true },
    notifyEmail: { type: String },
    accountEmail: { type: String },
  })
);

import { Schema, model } from 'mongoose';

export const minimalLeftoversModel = model(
  'minimal-leftovers',
  new Schema({
    cityName: { type: String, required: true, unique: true },
    products: [
      { name: { type: String, required: true }, minimalLeftover: { type: Number }, orderingCount: { type: Number } },
    ],
  })
);

// root
// jk2CKqcsRqFaVOdY

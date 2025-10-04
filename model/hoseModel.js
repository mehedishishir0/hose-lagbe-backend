const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    propertyId: {
      type: String,
      required: true,
      unique: true,
    },
    availableFrom: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],

    features: [
      {
        name: { type: String, required: true }, 
        value: { type: String, required: true }, 
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("House", houseSchema);

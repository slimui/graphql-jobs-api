// @flow

import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    benefits: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    workload: {
      type: String,
      required: true,
    },
    localization: {
      type: String,
      required: true,
    },
    addinfo: {
      type: String,
    },
    contract: {
      type: String,
      required: true,
    },
    areas: [
      {
        type: String,
        required: true,
      },
    ],
    subareas: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'job',
  },
);

export default mongoose.model('Job', Schema);

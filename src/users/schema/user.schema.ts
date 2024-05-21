import { Schema } from 'mongoose';
import { HearAbout } from '../types/hear-about.enum';

export const userSchema = new Schema(
  {
    initials: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    birth: {
      type: String,
      required: true,
    },
    hearAbout: {
      type: String,
      required: true,
      enum: {
        values: Object.values(HearAbout),
        message: '{VALUE} is not supported',
      },
    },
  },
  {
    timestamps: true,
  },
);

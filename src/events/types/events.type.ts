import { Document, Types } from 'mongoose';

export interface Events extends Document {
  title: string;
  description: string;
  eventDate: Date;
  organizer: string;
  participants: Types.ObjectId[];
}

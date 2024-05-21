import { Document, Types } from 'mongoose';

export interface Events extends Document {
  title: string;
  description: string;
  eventDate: string;
  organizer: string;
  participants: Types.ObjectId[];
}

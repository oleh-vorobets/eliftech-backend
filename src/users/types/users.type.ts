import { Document } from 'mongoose';

export interface Users extends Document {
  initials: string;
  email: string;
  birth: Date;
  hearAbout: string;
}

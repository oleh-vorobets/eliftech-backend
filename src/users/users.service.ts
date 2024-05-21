import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users } from './types/users.type';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<Users>) {}

  async addOne(user: Users): Promise<Types.ObjectId> {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      return existingUser._id as Types.ObjectId;
    }
    const newUser = await new this.userModel(user).save();
    return newUser._id as Types.ObjectId;
  }
}

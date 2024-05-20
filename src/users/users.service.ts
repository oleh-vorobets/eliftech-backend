import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './types/users.type';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<Users>) {}

  async addOne(user: Users) {
    const newUser = await new this.userModel(user).save();
    return newUser._id;
  }
}

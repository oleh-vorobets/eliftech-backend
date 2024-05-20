import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Events } from './types/events.type';
import { AddUserDto } from './dtos/add-user.dto';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/types/users.type';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Events') private eventsModel: Model<Events>,
    private readonly usersService: UsersService,
  ) {}

  async getAll(
    offset: number,
    limit: number,
    sortBy?: string,
    sortOrder?: string,
  ) {
    const sortOptions: { [key: string]: 1 | -1 } = {};

    if (sortBy) {
      sortOptions[sortBy] = (sortOrder ?? 'asc') === 'asc' ? 1 : -1;
    }

    const events = await this.eventsModel
      .find()
      .skip(offset)
      .limit(limit === 0 ? undefined : limit)
      .sort(sortOptions)
      .exec();

    return events;
  }

  async addToEvent(eventId: string, participant: AddUserDto) {
    const participantId = await this.usersService.addOne(participant as Users);
    await this.eventsModel.updateOne(
      { _id: eventId },
      { $push: { participants: participant } },
    );
    return participantId;
  }

  async getEventUsers(eventId: string) {
    const res = await this.eventsModel.find({ id: eventId }).populate('Users');
    console.log(res);
    return res;
  }
}

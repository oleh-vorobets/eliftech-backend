import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    sortBy: string,
    sortOrder: string,
    offset?: number,
    limit?: number,
  ) {
    const sortOptions: { [key: string]: 1 | -1 } = {};

    if (sortBy) {
      sortOptions[sortBy] = +sortOrder as 1 | -1;
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
    const event = await this.eventsModel.findOne({ _id: eventId });
    // { $push: { participants: participantId } },
    if (event.participants.includes(participantId)) {
      throw new BadRequestException('This participant is already registered');
    }
    event.participants.push(participantId);
    await event.save();
    return participantId;
  }

  async getEventUsers(
    eventId: string,
    searchKey?: string,
    searchValue?: string,
  ) {
    console.log(searchKey, searchValue);
    const event = await this.eventsModel.findOne({ _id: eventId }).populate({
      path: 'participants',
      match:
        searchValue && searchKey
          ? { [searchKey]: { $regex: searchValue, $options: 'i' } }
          : {},
    });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return {
      participants: event.participants,
      eventTitle: event.title,
    };
  }
}

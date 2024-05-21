import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as faker from '@faker-js/faker';
import { Users } from 'src/users/types/users.type';
import { Events } from 'src/events/types/events.type';

@Injectable()
export class DataInitializerService {
  constructor(
    @InjectModel('Users') private usersModel: Model<Users>,
    @InjectModel('Events') private eventsModel: Model<Events>,
  ) {}

  async initializeData() {
    await this.usersModel.deleteMany({});
    await this.eventsModel.deleteMany({});
    const response = await fetch(
      'https://my.vatsim.net/api/v2/events/latest/50',
    );
    const { data } = await response.json();

    await Promise.all(
      data.map((element) => {
        return new this.eventsModel({
          title: element.name,
          description: element.short_description,
          eventDate: element.start_time,
          organizer: faker.allFakers.en.person.firstName(),
        }).save();
      }),
    );
  }
}

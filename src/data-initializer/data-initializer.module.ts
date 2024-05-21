import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { eventSchema } from 'src/events/schema/event.schema';
import { userSchema } from 'src/users/schema/user.schema';
import { DataInitializerService } from './data-initializer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'Events', schema: eventSchema }]),
  ],
  exports: [DataInitializerService],
  providers: [DataInitializerService],
})
export class DataInitializerModule {}

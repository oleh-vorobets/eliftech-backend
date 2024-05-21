import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schema/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: userSchema }])],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}

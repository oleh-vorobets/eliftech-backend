import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { AddUserDto } from './dtos/add-user.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('')
  async getAllEvents(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: string,
  ) {
    const offsetValue = offset ?? 0;
    const limitValue = limit ?? 0;
    return await this.eventsService.getAll(
      offsetValue,
      limitValue,
      sortBy,
      sortOrder,
    );
  }

  @Get(':id')
  async getEventUsers(@Param('id') eventId: string) {
    return await this.eventsService.getEventUsers(eventId);
  }

  @Post(':id')
  async addUserToEvent(
    @Param('id') eventId: string,
    @Body() payload: AddUserDto,
  ) {
    return await this.eventsService.addToEvent(eventId, payload);
  }
}

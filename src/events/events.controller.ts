import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { AddUserDto } from './dtos/add-user.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get(':id')
  async getEventUsers(
    @Param('id') eventId: string,
    @Query('searchKey') searchKey: string,
    @Query('searchValue') searchValue: string,
  ) {
    return await this.eventsService.getEventUsers(
      eventId,
      searchKey,
      searchValue,
    );
  }

  @Post(':id')
  async addUserToEvent(
    @Param('id') eventId: string,
    @Body() payload: AddUserDto,
  ) {
    return await this.eventsService.addToEvent(eventId, payload);
  }

  @Get('')
  async getAllEvents(
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: string,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
  ) {
    const offsetValue = offset ? +offset : 0;
    const limitValue = limit ? +limit : 0;
    return await this.eventsService.getAll(
      sortBy,
      sortOrder,
      offsetValue,
      limitValue,
    );
  }
}

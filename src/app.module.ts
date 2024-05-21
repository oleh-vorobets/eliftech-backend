import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataInitializerService } from './data-initializer/data-initializer.service';
import { DataInitializerModule } from './data-initializer/data-initializer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    EventsModule,
    UsersModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return { uri: config.get<string>('MONGO_URI') };
      },
    }),
    DataInitializerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly dataInitializerService: DataInitializerService,
  ) {}

  async onApplicationBootstrap() {
    await this.dataInitializerService.initializeData();
  }
}

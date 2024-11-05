import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '~/users/users.module';
import configuration from '~/config/configuration';

@Module({
  imports: [
    // loads .env
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // connects to MongoDB
    MongooseModule.forRoot(process.env.MONGO_URI),
    // include modules
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

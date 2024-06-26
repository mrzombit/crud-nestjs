import { mongooseFactory } from './_utils/factory/mongoose.factory';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`./.env`],
    }),
    MongooseModule.forRootAsync(mongooseFactory),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

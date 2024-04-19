import { UserSchema } from './model/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User', 
      schema: UserSchema
    }]),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}



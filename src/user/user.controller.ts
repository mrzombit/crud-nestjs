import { CreateUserDTO } from './model/create-user.dto';
import { User } from './model/user.interface';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDTO): Promise<User> {
        return this.userService.create(createUserDto)
    }

    @Get()
    async getAll(): Promise<User[]> {
        return await this.userService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
        var mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundException("Id is not valid!")

        const user = await this.userService.getById(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        } else {
            return user;
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: User): Promise<any> {
        var mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundException("Id is not valid!")

        const userValid = await this.userService.getById(id)
        if (userValid) {
            await this.userService.update(id, user);
            return { user: await this.userService.getById(id), message: "User updated successfully" }
        } else throw new NotFoundException("User does not exist!")

    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any> {
        var mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundException("Id is not valid!")
        
        const user = await this.userService.getById(id)
        if (user) {
            await this.userService.delete(id);
            return { message: "User deleted successfully" }
        } else throw new NotFoundException("User does not exist!")
    }

}
import { Body, Controller, Delete, Post, Request, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { CreateUserDto } from "../dtos/createUser.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Response } from 'express'
import { sendResponse } from "src/utils/sendResponse";


@Controller('users') 
export class UsersController {

    constructor(private usersService: UsersService) {};

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
        const createdUser = await this.usersService.createUser(createUserDto, response);
        sendResponse(response, { message: 'User created.', createdUser }, 200);
    }

    @UseGuards(AuthGuard)
    @Delete()
    async deleteUser(@Request() request, @Res() response: Response) {
        const deletedUser = await this.usersService.deleteUser(request, response);
        sendResponse(response, { message: 'User deleted.', data: deletedUser }, 200);
    }
}
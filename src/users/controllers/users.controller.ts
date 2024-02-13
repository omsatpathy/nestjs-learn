import { Body, Controller, Delete, Post, Request, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { CreateUserDto } from "../dtos/createUser.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Response } from 'express'
import { CustomApiResponse } from "src/utils/sendResponse";


@Controller('users') 
export class UsersController {

    constructor(private usersService: UsersService) {};

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            
            const createdUser = await this.usersService.createUser(createUserDto);
            const responseToSend  = new CustomApiResponse(200, { message: 'User succesfully created.', userData: createdUser})
            responseToSend.sendResponse(res);
            
        } catch (error) {
            throw new Error(error)
        }

    }

    @UseGuards(AuthGuard)
    @Delete()
    async deleteUser(@Request() request, @Res() res: Response) {
        try {
            
            const deletedUser = await this.usersService.deleteUser(request);
            const responseToSend = new CustomApiResponse(200, { message: 'User deleted.', deletedUser });
            responseToSend.sendResponse(res);

        } catch (error) {
            throw new Error(error)
        }
    }
}
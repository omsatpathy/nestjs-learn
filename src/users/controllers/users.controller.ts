import { Body, Controller, Delete, Param, Post, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { CreateUserDto } from "../dtos/createUser.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";


@Controller('users') 
export class UsersController {

    constructor(private usersService: UsersService) {};

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const createdUser = await this.usersService.createUser(createUserDto);
        return createdUser;
    }

    @UseGuards(AuthGuard)
    @Delete()
    async deleteUser(@Request() request) {
        const deletedUser = await this.usersService.deleteUser(request);
        return deletedUser;
    }
}
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetUsersDto } from './dto/get-users.dto';
import {  Patch} from '@nestjs/common';
import { CreateAddToPasswordDto } from './dto/password.dto';
import { ADDTOPASSWORD } from './entities/password.entity';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAllUsers(@Query() query: GetUsersDto) {
    return this.usersService.getUsers(query);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('unblock-user')
  activeUser(@Body('id') id: number) {
    return this.usersService.activeUser(+id);
  }

  @Post('block-user')
  banUser(@Body('id') id: number) {
    return this.usersService.banUser(+id);
  }

  @Post('make-admin')
  makeAdmin(@Param('user_id') id: string) {
    return this.usersService.makeAdmin(id);
  }

  @Post('add-to-password')
  async addToPassword(@Body() addToPasswordDto: CreateAddToPasswordDto): Promise<string> {
    try {
      const result = await this.usersService.addToPassword(addToPasswordDto);
      return result;
    } catch (error) {
      console.error(error);
      return 'Failed to update password';
    }
  }
}

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    console.log(createProfileDto);
  }

  @Put(':id')
  updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
    console.log(updateProfileDto);
  }

  @Delete(':id')
  deleteProfile(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}

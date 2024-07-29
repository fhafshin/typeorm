import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile-dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(@Query('search') search: string) {
    return this.userService.findAll(search);
  }

  @Get('/blogs/:userId')
  blogsOfUser(@Param('userId') userId: number) {
    return this.userService.blogsOfUsers(userId);
  }

  @Get('/profile/:id')
  findOneWithProfile(@Param('id') id: number) {
    return this.userService.findUserWithProfile(id);
  }
  @Get('/order')
  getOrder() {
    return this.userService.orderData();
  }

  @Get('/selection')
  selectionUser() {
    return this.userService.selection();
  }

  @Get('/pagination')
  paginationUser(@Query() paginationDto: { page: number; limit: number }) {
    return this.userService.pagination(paginationDto);
  }

  @Post()
  create(@Body() data: UserCreateDto) {
    return this.userService.create(data);
  }
  @Post('/profile')
  createProfile(@Body() data: CreateProfileDto) {
    return this.userService.createProfile(data);
  }

  @Put('/edit/:id')
  updateByFields(@Query('id') id: number, data: UserUpdateDto) {
    this.userService.updateByFields(id, data);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: number) {
    console.log(id);
    return this.userService.remove(+id);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.userService.delete(+id);
  }
  @Put('/:id')
  update(@Query('id') id: number, data: UserUpdateDto) {
    this.userService.update(id, data);
  }
}

import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(@Query('search') search: string) {
    return this.userService.findAll(search);
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

  @Put('/edit/:id')
  updateByFields(@Query('id') id: number, data: UserUpdateDto) {
    this.userService.updateByFields(id, data);
  }

  @Put('/:id')
  update(@Query('id') id: number, data: UserUpdateDto) {
    this.userService.update(id, data);
  }
}

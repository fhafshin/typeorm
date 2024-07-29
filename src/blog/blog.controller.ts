import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog-dto';

@Controller('/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/')
  create(@Body() data: CreateBlogDto) {
    return this.blogService.create(data);
  }

  @Get('/')
  findAll() {
    return this.blogService.findAll();
  }
}

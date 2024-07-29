import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entity/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
  ) {}

  async create(data: CreateBlogDto) {
    const { title, text, userId } = data;
    await this.blogRepository.insert({ title, text, userId });
    return {
      message: 'successfully created blog',
    };
  }

  async findAll() {
    return await this.blogRepository.find({
      relations: { user: true },
      select: { user: { first_name: true, last_name: true } },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  And,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { ProfileEntity } from './entity/profile.entity';
import moment from 'moment';

@Injectable()
export class QueryBuilderService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async findAll(search: string) {
    const where: FindOptionsWhere<UserEntity> = {};

    if (search && moment(search, 'YYYY-MM-DD', true).isValid()) {
      const date = new Date(search);
      const started_at = new Date(date.setUTCHours(0, 0, 0));
      const finished_at = new Date(date.setUTCHours(23, 59, 59));
      console.log(started_at, finished_at);
      where['created_at'] = And(
        MoreThanOrEqual(started_at),
        LessThanOrEqual(finished_at),
      );
    }

    return await this.userRepository
      .createQueryBuilder('user')
      .where(where)
      .getMany();
  }

  async blogsOfUser(userId: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.blogs', 'blogs')
      .where({ id: userId })
      .getOne();
  }

  async orderData() {
    return await this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.age', 'ASC')
      .getMany();
  }

  async pagination(paginationDto: { page: number; limit: number }) {
    let { page, limit } = paginationDto;
    if (!page || page < 1) page = 0;
    else page--;
    if (!limit || limit < 1) limit = 5;
    const skip = page * limit;

    return this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.id', 'ASC')
      .take(limit)
      .skip(skip)
      .getMany();
  }

  async selection() {
    return await this.userRepository
      .createQueryBuilder('user')
      .select('user.first_name');
  }
}

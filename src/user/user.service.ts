import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  And,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { UserCreateDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import * as moment from 'moment';
import { UserUpdateDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(search: string) {
    const where: FindOptionsWhere<UserEntity> = {};

    if (search && moment(search, 'YYYY-MM-DD', true).isValid()) {
      console.log(moment(search, 'YYYY-MM-DD', true).isValid());

      const date = new Date(search);
      const started_at = new Date(date.setUTCHours(0, 0, 0));
      const finished_at = new Date(date.setUTCHours(23, 59, 59));
      console.log(started_at, finished_at);
      where['created_at'] = And(
        MoreThanOrEqual(started_at),
        LessThanOrEqual(finished_at),
      );
    }

    // where: { first_name: Not(ILike('af%')) },morethan Ilike NOT
    return await this.userRepository.find({
      where,
    });
  }
  async updateByFields(id: number, data: UserUpdateDto) {
    const { first_name, last_name, age, email } = data;
    const user = await this.userRepository.findOneBy({ id });
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (age) user.age = age;
    if (email) user.email = email;

    this.userRepository.save(user);
  }
  async update(id: number, data: UserUpdateDto) {
    const { first_name, last_name, age, email } = data;
    await this.userRepository.update(
      { id },
      { first_name, last_name, age, email },
    );
  }

  async orderData() {
    return await this.userRepository.find({
      where: {},
      order: { first_name: 'ASC', id: 'DESC' },
    });
  }

  async pagination(paginationDto: { page: number; limit: number }) {
    let { page, limit } = paginationDto;
    if (!page || page < 1) page = 0;
    else page--;
    if (!limit || limit < 1) limit = 5;
    const skip = page * limit;
    return this.userRepository.find({
      where: {},
      order: { id: 'ASC' },
      take: limit,
      skip,
    });
  }
  async selection() {
    // const arr: string[] = ['first_name'];
    return this.userRepository.find({
      select: { first_name: true },
      // select: ['age'],
    });
  }

  create(userCreateDto: UserCreateDto) {
    const { first_name, last_name, age, email } = userCreateDto;
    const user = this.userRepository.create({
      first_name,
      last_name,
      age,
      email,
    });
    return this.userRepository.save(user);

    // return this.userRepository.insert(userCreateDto);
  }
}

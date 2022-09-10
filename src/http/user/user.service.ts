import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async create(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserDto & User> {
    try {
      createUserDto.level = 1;
      createUserDto.password = this.hashPassword(createUserDto.password);
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  public async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat mengambil data!',
      });
    }
  }

  public async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat mengambil data!',
      });
    }
  }

  public async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto & User> {
    try {
      updateUserDto.id = id;
      if (updateUserDto.password) {
        updateUserDto.password = this.hashPassword(updateUserDto.password);
      }
      return await this.userRepository.save(updateUserDto);
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  public async findEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat mengambil data!',
      });
    }
  }

  public async remove(id: number): Promise<User> {
    try {
      const user: User = await this.userRepository.findOneBy({ id });
      return this.userRepository.remove(user);
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menghapus data!',
      });
    }
  }

  private readonly genSalt: string = bcrypt.genSaltSync();

  private hashPassword(plainPassword: string): string {
    return bcrypt.hashSync(plainPassword, this.genSalt);
  }

  public comparePassword(plainPassword: string, hashPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashPassword);
  }
}

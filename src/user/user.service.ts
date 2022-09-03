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
    createUserDto.level = 1;
    createUserDto.password = this.hashPassword(createUserDto.password);
    const user: User = await this.userRepository.save(createUserDto);
    if (!user) throw new BadRequestException();
    return user;
  }

  public async findAll(): Promise<User[]> {
    const user: User[] = await this.userRepository.find();
    if (!user) throw new BadRequestException();
    return user;
  }

  public async findOne(id: number): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException();
    return user;
  }

  public async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto & User> {
    updateUserDto.id = id;
    if (updateUserDto.password) {
      updateUserDto.password = this.hashPassword(updateUserDto.password);
    }
    const user: UpdateUserDto & User = await this.userRepository.save(
      updateUserDto,
    );
    if (!user) throw new BadRequestException();
    return user;
  }

  public async findEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ email });
    if (!user) throw new BadRequestException();
    return user;
  }

  public async remove(id: number): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException();
    return this.userRepository.remove(user);
  }

  private readonly genSalt: string = bcrypt.genSaltSync();

  private hashPassword(plainPassword: string): string {
    const hash: string = bcrypt.hashSync(plainPassword, this.genSalt);
    return hash;
  }

  public comparePassword(plainPassword: string, hashPassword: string): boolean {
    const isValid: boolean = bcrypt.compareSync(plainPassword, hashPassword);
    return isValid;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { In, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  /**
   * create
   */
  public async create(createUserDto: CreateUserDto) {
    try {
      //jika user memiliki password
      if (createUserDto.password) {
        //encrypt password user
        createUserDto.password = this.hashPassword(createUserDto.password);
      }
      //get data roles untuk ditambahkan ke user
      const roles = await this.roleRepository
        .createQueryBuilder('role')
        .where('role.id IN (:ids)', { ids: createUserDto.roles })
        .getMany();
      //simpan data user ke database beserta relasi tabel role
      return await this.userRepository.save({ ...createUserDto, roles }); //TODO: add user roles as array :)
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  /**
   * findAll
   */
  public async findAll(): Promise<User[]> {
    try {
      //cari data user
      return await this.userRepository.find({ relations: { roles: true } });
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat mengambil data!',
      });
    }
  }

  /**
   * findOne
   */
  public async findOne(id: number): Promise<User> {
    try {
      //cari data user
      return await this.userRepository.findOne({
        where: { id },
        relations: { roles: true },
      });
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat mengambil data!',
      });
    }
  }

  /**
   * update data user
   */
  public async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      updateUserDto.id = id;
      if (updateUserDto.password) {
        updateUserDto.password = this.hashPassword(updateUserDto.password);
      }
      //cari data role berdasarkan id role
      const roles = await this.roleRepository.findBy({
        id: In(updateUserDto.roles),
      });
      return await this.userRepository.save({ ...updateUserDto, roles }); //simpan data ke database
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  /**
   * findEmail dari database
   */
  public async findEmail(email: string): Promise<User> {
    try {
      //cari data user berdasarkan email
      return await this.userRepository.findOne({
        where: { email },
        relations: { roles: true },
      });
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat mengambil data!',
      });
    }
  }

  /**
   * delete user dari database
   */
  public async remove(id: number): Promise<User> {
    try {
      //cari data user
      const user: User = await this.userRepository.findOneBy({ id });
      return this.userRepository.remove(user); //hapus data dari database
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menghapus data!',
      });
    }
  }

  /**
   * delete beberapa user dari database
   */
  public async removeMany(ids: number[]): Promise<User[]> {
    try {
      //cari data user
      const user: User[] = await this.userRepository.findBy({ id: In(ids) });
      return this.userRepository.remove(user); //hapus data dari database
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

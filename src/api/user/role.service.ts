import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserRoleDto, UpdateUserRoleDto } from './dto/role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  /**
   * create
   */
  public async create(createUserRoleDto: CreateUserRoleDto): Promise<Role> {
    try {
      return await this.roleRepository.save(createUserRoleDto); //save data ke database
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  /**
   * findAll
   */
  public async findAll(): Promise<Role[]> {
    try {
      return await this.roleRepository.find(); //get data dari database
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  /**
   * findOne
   */
  public async findOne(id: number): Promise<Role> {
    try {
      return await this.roleRepository.findOneBy({ id }); //get data dari database
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  /**
   * update
   */
  public async update(
    id: number,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<Role> {
    try {
      updateUserRoleDto.id = id;
      return await this.roleRepository.save(updateUserRoleDto); //simpan data ke database
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  /**
   * remove
   */
  public async remove(id: number): Promise<Role> {
    try {
      const role: Role = await this.roleRepository.findOneBy({ id });
      return await this.roleRepository.remove(role); //hapus data dari database
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  /**
   * removeMany
   */
  public async removeMany(ids: number[]): Promise<Role[]> {
    try {
      const roles: Role[] = await this.roleRepository.findBy({ id: In(ids) });
      return await this.roleRepository.remove(roles); //hapus data dari database
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }
}

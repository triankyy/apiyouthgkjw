import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import {
  CreateJadwalPelayanDto,
  UpdateJadwalPelayanDto,
} from './dto/jadwal_pelayan.dto';
import { JadwalPelayan } from './entities/jadwal_pelayan.entity';
import * as moment from 'moment';
import { Ibadah } from './entities/ibadah.entity';

@Injectable()
export class JadwalPelayanService {
  constructor(
    @InjectRepository(JadwalPelayan)
    private jadwalRepository: Repository<JadwalPelayan>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Ibadah)
    private ibadahRepository: Repository<Ibadah>,
  ) {}

  public async create(createJadwalPelayanDto: CreateJadwalPelayanDto) {
    try {
      const pelayan: User = await this.userRepository.findOneBy({
        id: createJadwalPelayanDto.pelayan,
      });
      const ibadah: Ibadah = await this.ibadahRepository.findOneBy({
        id: createJadwalPelayanDto.ibadah,
      });
      const wl: User[] = await this.userRepository.findBy({
        id: In(createJadwalPelayanDto.wl),
      });
      const musik: User[] = await this.userRepository.findBy({
        id: In(createJadwalPelayanDto.musik),
      });
      const singer: User[] = await this.userRepository.findBy({
        id: In(createJadwalPelayanDto.singer),
      });
      const operator: User[] = await this.userRepository.findBy({
        id: In(createJadwalPelayanDto.operator),
      });
      createJadwalPelayanDto.tanggal = moment(
        createJadwalPelayanDto.tanggal,
      ).toDate();
      return await this.jadwalRepository.save({
        pelayan,
        ibadah,
        wl,
        musik,
        singer,
        operator,
        tanggal: createJadwalPelayanDto.tanggal,
      });
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menyimpan data!'],
      });
    }
  }

  public async findAll() {
    try {
      return await this.jadwalRepository.find({
        relations: {
          pelayan: true,
          ibadah: true,
          wl: true,
          musik: true,
          singer: true,
          operator: true,
        },
      });
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat mengambil data!'],
      });
    }
  }

  /**
   * findOneMonth
   */
  public async findOneMonth(month: number, year: number) {
    try {
      return await this.findAll().then((val) => {
        return val.filter(
          (el) =>
            this.yearFilter(el.tanggal, year) &&
            this.monthFilter(el.tanggal, month - 1),
        );
      });
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat mengambil data!'],
      });
    }
  }

  private monthFilter(val: Date, diff: number): boolean {
    return moment(val).month() == diff;
  }

  private yearFilter(val: Date, diff: number): boolean {
    return moment(val).year() == diff;
  }

  public async findOne(id: number) {
    try {
      return await this.jadwalRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat mengambil data!'],
      });
    }
  }

  update(id: number, updateJadwalPelayanDto: UpdateJadwalPelayanDto) {
    return `This action updates a #${id} jadwalPelayan`;
  }

  remove(id: number) {
    return `This action removes a #${id} jadwalPelayan`;
  }
}

import { User } from 'src/api/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ibadah } from './ibadah.entity';

@Entity()
export class JadwalPelayan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ibadah, (i: Ibadah) => i.id)
  ibadah: Ibadah;

  @ManyToOne(() => User, (u: User) => u.id)
  pelayan: User;

  @ManyToMany(() => User)
  @JoinTable({ name: 'user_wl' })
  wl: User[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'user_musik' })
  musik: User[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'user_singer' })
  singer: User[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'user_operator' })
  operator: User[];

  @Column()
  tanggal: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

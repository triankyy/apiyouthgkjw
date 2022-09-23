import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Carousel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  label: string;

  @ManyToOne(() => User, (u: User) => u.id)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

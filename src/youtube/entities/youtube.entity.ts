import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'youtubes' })
export class Youtube {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  youtube_id: string;

  @ManyToOne(() => User, (u: User) => u.id)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

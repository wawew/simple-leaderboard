import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_credentials')
export class UserCredentialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}

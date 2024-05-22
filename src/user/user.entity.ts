import { LeaderboardEntity } from 'src/leaderboard/leaderboard.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserCredentialEntity } from './user_credential.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @OneToOne(() => UserCredentialEntity, (credential) => credential.user)
  @JoinColumn()
  credential: UserCredentialEntity;

  @OneToOne(() => LeaderboardEntity, (leaderboards) => leaderboards.player)
  @JoinColumn()
  leaderboard: LeaderboardEntity;
}

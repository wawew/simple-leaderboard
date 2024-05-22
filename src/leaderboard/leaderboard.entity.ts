import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('leaderboards')
export class LeaderboardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'score', nullable: false })
  score: number;

  @Column({ name: 'player_id', nullable: false })
  playerId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'player_id', referencedColumnName: 'id' })
  player: UserEntity;
}

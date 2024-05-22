import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('leaderboards')
export class LeaderboardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column('player_id')
  playerId: number;

  @OneToOne(() => UserEntity, (user) => user.leaderboard)
  player: UserEntity;
}

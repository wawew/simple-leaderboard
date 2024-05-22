import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaderboardEntity } from './leaderboard.entity';
import { SubmitScoreDTO } from './dto/leaderboard.dto';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(LeaderboardEntity)
    private readonly leaderboardRepository: Repository<LeaderboardEntity>,
  ) {}

  async submitScore({
    playerId,
    score,
  }: SubmitScoreDTO): Promise<LeaderboardEntity> {
    let entry = await this.leaderboardRepository.findOne({
      where: { playerId },
    });

    entry = this.leaderboardRepository.create({ playerId, score });
    return this.leaderboardRepository.save(entry);
  }

  async getLeaderboard(): Promise<LeaderboardEntity[]> {
    return await this.leaderboardRepository.find({
      order: {
        score: 'DESC',
      },
      take: 10,
      relations: { player: true },
    });
  }
}

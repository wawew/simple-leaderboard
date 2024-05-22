import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaderboardEntity } from './leaderboard.entity';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(LeaderboardEntity)
    private readonly leaderboardRepository: Repository<LeaderboardEntity>,
  ) {}

  async submitScore(
    playerId: number,
    score: number,
  ): Promise<LeaderboardEntity> {
    let entry = await this.leaderboardRepository.findOne({
      where: { playerId },
    });

    if (!entry) {
      entry = this.leaderboardRepository.create({ playerId, score });
    } else {
      entry.score = score;
    }

    return this.leaderboardRepository.save(entry);
  }

  async getLeaderboard(): Promise<LeaderboardEntity[]> {
    return this.leaderboardRepository.find({
      select: {
        score: true,
        player: {
          name: true,
        },
      },
      order: {
        score: 'DESC',
      },
      take: 10,
    });
  }
}

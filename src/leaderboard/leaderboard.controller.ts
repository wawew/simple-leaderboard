import { Get, Post, Body, Controller } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LeaderboardService } from './leaderboard.service';
import { UserDecorator } from 'src/user/user.decorator';
import { UserEntity } from 'src/user/user.entity';

@ApiBearerAuth()
@ApiTags('leaderboard')
@Controller()
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post('/scores')
  async submitScore(
    @UserDecorator({ field: null, roles: ['PLAYER', 'ADMIN'] })
    user: UserEntity,
    @Body() body: { score: number; playerId?: number },
  ): Promise<void> {
    if (!body.playerId && user.role == 'ADMIN') {
      await this.leaderboardService.submitScore(body.playerId, body.score);
    } else {
      await this.leaderboardService.submitScore(user.id, body.score);
    }
  }

  @Get('/leaderboard')
  async getLeaderboard(): Promise<{ name: string; score: number }[]> {
    const leaderboard = await this.leaderboardService.getLeaderboard();
    return leaderboard.map((entry) => ({
      name: entry.player.name,
      score: entry.score,
    }));
  }
}

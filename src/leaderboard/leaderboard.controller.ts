import {
  Get,
  Post,
  Body,
  Controller,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LeaderboardService } from './leaderboard.service';
import { UserDecorator } from 'src/user/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { SubmitScoreDTO } from './dto/leaderboard.dto';

@ApiBearerAuth()
@ApiTags('leaderboard')
@Controller()
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post('/scores')
  @HttpCode(201)
  async submitScore(
    @UserDecorator({ field: null, roles: ['PLAYER', 'ADMIN'] })
    user: UserEntity,
    @Body() spec: SubmitScoreDTO,
  ): Promise<{ message: string }> {
    if (user.role == 'ADMIN') {
      if (!spec.playerId) {
        throw new HttpException(
          'playerId is mandatory.',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.leaderboardService.submitScore(spec);
    } else {
      await this.leaderboardService.submitScore({
        playerId: user.id,
        score: spec.score,
      });
    }
    return { message: 'Score submitted' };
  }

  @Get('/leaderboard')
  @HttpCode(200)
  async getLeaderboard(): Promise<{
    leaderboards: { name: string; score: number }[];
  }> {
    const leaderboard = await this.leaderboardService.getLeaderboard();
    return {
      leaderboards: leaderboard.map((entry) => ({
        name: entry.player.name,
        score: entry.score,
      })),
    };
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaderboardEntity } from './leaderboard.entity';
import { LeaderboardService } from './leaderboard.service';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { UserCredentialEntity } from 'src/user/userCredential.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      LeaderboardEntity,
      UserCredentialEntity,
    ]),
    UserModule,
  ],
  providers: [LeaderboardService],
  controllers: [LeaderboardController],
  exports: [LeaderboardService],
})
export class LeaderboardModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/scores', method: RequestMethod.POST },
        { path: '/leaderboard', method: RequestMethod.GET },
      );
  }
}

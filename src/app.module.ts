import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, LeaderboardModule],
  controllers: [AppController],
  providers: [],
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}

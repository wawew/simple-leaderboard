import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SubmitScoreDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly score: number;

  @ApiProperty()
  readonly playerId?: number;
}

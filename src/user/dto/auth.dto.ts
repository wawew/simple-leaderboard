import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

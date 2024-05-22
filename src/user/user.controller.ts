import { Post, Body, Controller, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from './dto/auth.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDTO): Promise<{ token: string }> {
    try {
      const token = await this.userService.login(loginUserDto);
      return { token };
    } catch {
      throw new HttpException('Invalid email or password', 401);
    }
  }
}

import { Post, Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<{ token: string }> {
    try {
      const token = await this.userService.login(loginUserDto);
      return { token };
    } catch {
      throw new HttpException('Invalid email or password', 401);
    }
  }
}

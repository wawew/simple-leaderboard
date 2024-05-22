import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import jwt from 'jsonwebtoken';
import { LoginUserDto } from './dto/login.dto';
import { SECRET } from 'src/config';
import { UserData } from './user.interface';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login({ email, password }: LoginUserDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.credential.password,
    );

    if (isValidPassword) {
      return this.generateJWT(user);
    }

    throw new Error('Invalid username or password');
  }

  async findById(id: number): Promise<UserData> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  private generateJWT(user: UserEntity) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as jwt from 'jsonwebtoken';
import { LoginUserDTO } from './dto/auth.dto';
import { SECRET } from 'src/config';
import { UserData } from './user.interface';
import * as bcrypt from 'bcrypt';
import { UserCredentialEntity } from './userCredential.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserCredentialEntity)
    private readonly userCredentialRepository: Repository<UserCredentialEntity>,
  ) {}

  async login({ email, password }: LoginUserDTO): Promise<string> {
    const userCred = await this.userCredentialRepository.findOne({
      where: { user: { email } },
      relations: { user: true },
    });
    if (!userCred) {
      throw new Error('Invalid username or passwords');
    }

    const isValidPassword = await bcrypt.compare(password, userCred.password);

    if (isValidPassword) {
      return this.generateJWT(userCred.user);
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
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }
}

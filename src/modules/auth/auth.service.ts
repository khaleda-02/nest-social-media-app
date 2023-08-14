import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/Register.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private JwtService: JwtService
  ) {}

  async login({ username, password }: LoginDto) {
    const { password: userPassword, ...user } = await this.userService.findOne(
      username
    );
    if (userPassword != password)
      throw new UnauthorizedException('woring usernaem or password');
    return { user, accessToken: this.JwtService.sign(user) };
  }

  async register(registerDto: RegisterDto) {
    const { password, ...user } = await this.userService.create(registerDto);
    return { user, accessToken: this.JwtService.sign(user) };
  }
}

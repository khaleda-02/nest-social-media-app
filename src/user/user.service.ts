import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from '../common/contants';
import { User } from './entities/user.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User
  ) {}

  async create({ username, password, email }: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) throw new BadRequestException('User already exists');

    const newUser = await this.userRepository.create({
      username,
      password,
      email,
    });
    return newUser.get({ plain: true });
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('wrong username or password');
    return user.get({ plain: true });
  }

  canCreate(user: User): boolean {
    if (user.postsCreatedToday == 5) return false;
    return true;
  }

  async incrementPostCreated({ username }: User) {
    const user = await this.userRepository.findOne({ where: { username } });
    user.postsCreatedToday++;
    return await user.save();
  }
}

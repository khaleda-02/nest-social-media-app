import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { Cron, CronExpression } from '@nestjs/schedule';
import { USER_REPOSITORY } from 'src/common/contants';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User
  ) {}

  //! Base Methods
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

  //! Hleper Methods
  canCreate({ postsCreatedToday }: User): boolean {
    if (postsCreatedToday == 5) return false;
    return true;
  }

  async incrementPostCreated({ username }: User) {
    const user = await this.userRepository.findOne({ where: { username } });
    user.postsCreatedToday++;
    return await user.save();
  }

  //! Scheduled Tasks
  @Cron('0 0 * * *')
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async resetPostCreated() {
    this.logger.log('Starting Resetting the postCreatedToday');
    await this.userRepository.update({ postsCreatedToday: 0 }, { where: {} });
    this.logger.log('Finish Resetting the postCreatedToday');
  }
}

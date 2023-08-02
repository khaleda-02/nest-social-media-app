import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { USER_REPOSITORY } from '../common/contants';
import { User } from '..//user/entities/user.entity';

@Injectable()
export class DailyResetTask {
  private readonly logger = new Logger(DailyResetTask.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User
  ) {}

  @Cron('0 0 * * *') // Run at midnight every day (UTC time)
  async handleDailyReset() {
    try {
      this.logger.debug('Performing daily reset...');

      // Reset the postsCreatedToday count for all users to 0
      // await this.userRepository.update({ postsCreatedToday: 0 }, { where: {} });

      this.logger.debug('Daily reset completed.');
    } catch (error) {
      this.logger.error('Error performing daily reset:', error);
    }
  }
}

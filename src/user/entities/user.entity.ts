import {
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
  Unique,
  Model,
  AutoIncrement,
} from 'sequelize-typescript';
import { Post } from '../../post/entities/post.entity';

const { DATE, NUMBER, STRING } = DataType;

@Table({ underscored: true, paranoid: true, tableName: 'Users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(NUMBER)
  id: number;

  @Column(STRING)
  email: string;

  @Unique
  @Column(STRING)
  username: string;

  @Column(STRING)
  password: string;

  @Column({ type: NUMBER, defaultValue: 0 })
  postsCreatedToday: number;

  @HasMany(() => Post)
  posts: Post[];

  @Column(DATE)
  createdAt: Date;

  @Column(DATE)
  updatedAt: Date;

  @Column(DATE)
  deletedAt: Date;
}

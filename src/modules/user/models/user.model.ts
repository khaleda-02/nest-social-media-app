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
import { Block } from '../../block/models/block.model';
import { Post } from '../../post/models/post.model';
import { Comment } from 'src/modules/post/models';

const { DATE, NUMBER, STRING } = DataType;

@Table({ underscored: true, paranoid: true, tableName: 'Users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(NUMBER)
  id: number;

  @Unique
  @Column(STRING)
  username: string;

  @Column(STRING)
  email: string;

  @Column(STRING)
  password: string;

  @Column({ type: NUMBER, defaultValue: 0 })
  postsCreatedToday: number;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comment: Comment[];

  @HasMany(() => Block)
  blocks: Block[];

  @Column(DATE)
  createdAt: Date;

  @Column(DATE)
  updatedAt: Date;

  @Column(DATE)
  deletedAt: Date;
}

import { DataTypes } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Post } from './post.model';

const { STRING, NUMBER, DATE } = DataTypes;

@Table({ tableName: 'Comments', paranoid: true, underscored: true })
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(NUMBER)
  id: number;

  @Column(STRING)
  content: string;

  @ForeignKey(() => Post)
  @Column(NUMBER)
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => User)
  @Column(NUMBER)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column(DATE)
  createdAt: Date;

  @Column(DATE)
  updatedAt: Date;

  @Column(DATE)
  deletedAt: Date;
}

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
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

const { STRING, NUMBER, DATE } = DataTypes;

@Table({ tableName: 'Comments', paranoid: true, underscored: true })
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @Column(DATE)
  createdAt: Date;

  @Column(DATE)
  updatedAt: Date;

  @Column(DATE)
  deletedAt: Date;
}

import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

const { STRING, NUMBER, DATE, BOOLEAN } = DataType;
@Table({ tableName: 'Posts', paranoid: true, underscored: true })
export class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @Column(NUMBER)
  id: number;

  @Column(STRING)
  content: string;

  @Column({ type: NUMBER, defaultValue: 0 })
  numOfWatchers: number;

  @Column({ type: BOOLEAN, defaultValue: false })
  isEdited: boolean;

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

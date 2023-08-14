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
import { User } from 'src/modules/user/entities/user.entity';

const { NUMBER, DATE } = DataType;
@Table({ tableName: 'Blocks', paranoid: true, underscored: true })
export class Block extends Model<Block> {
  @PrimaryKey
  @AutoIncrement
  @Column(NUMBER)
  id: number;

  @ForeignKey(() => User)
  @Column(NUMBER)
  blockerUserId: number;

  @ForeignKey(() => User)
  @Column(NUMBER)
  blockedUserId: number;

  @BelongsTo(() => User)
  user: User;

  @Column(DATE)
  createdAt: Date;

  @Column(DATE)
  updatedAt: Date;

  @Column(DATE)
  deletedAt: Date;
}

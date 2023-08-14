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
import { ParentType } from 'src/common/enums/reply-parent.enum';

const { STRING, NUMBER, DATE, ENUM } = DataTypes;

@Table({ tableName: 'Replies', paranoid: true, underscored: true })
export class Reply extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(NUMBER)
  id: number;

  @Column(STRING)
  content: string;

  @Column(NUMBER)
  parentId: number;

  @Column(ENUM(ParentType.COMMENT, ParentType.REPLY))
  parentType: string;

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

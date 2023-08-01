import {
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
  Unique,
  Model
} from 'sequelize-typescript';

const { DATE, NUMBER, STRING } = DataType;

@Table({ underscored: true, paranoid: true, tableName: 'Users' })
export class User extends Model<User> {
  @PrimaryKey
  @Column(NUMBER)
  id: number;

  @Column(STRING)
  email: string;

  @Unique
  @Column(STRING)
  username: string;

  @Column(STRING)
  password: string;

  // @HasMany()
  // todos : Todo[];

  @Column(DATE)
  createdAt: Date;

  @Column(DATE)
  updatedAt: Date;

  @Column(DATE)
  deletedAt: Date;
}

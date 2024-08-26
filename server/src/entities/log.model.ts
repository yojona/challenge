import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from './user.model';

export enum LogType {
  GENERAL_LOG='GENERAL_LOG',
  CATEGORY_LOG='CATEGORY_LOG',
  CHANNEL_LOG='CHANNEL_LOG'
}

@Entity()
export default class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ type: 'timestamp with time zone', default: new Date() })
  createdAt: Date;

  @Column({ type: 'enum', enum: LogType, default: LogType.GENERAL_LOG })
  type: LogType;

  @ManyToOne(() => User, user => user, {
    eager: true
  })
  user: User;

  toAPI = (): Partial<Log> => {
    return {
      id: this.id,
      message: this.message,
      createdAt: this.createdAt,
      type: this.type,
    }
  }
}

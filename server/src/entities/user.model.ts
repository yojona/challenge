import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Log from './log.model';

export enum NotificationChannel {
  SMS = 'SMS',
  EMAIL = 'Email',
  PUSH = 'Push Notification',
}

export enum MessageCategory {
  SPORTS = 'Sports',
  FINANCE = 'Finance',
  MOVIES = 'Movies',
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    default: null,
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value.split(','),
    }
  })
  subscribed: MessageCategory[];

  @Column({
    type: 'varchar',
    default: NotificationChannel.EMAIL,
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value.split(','),
    }
  })
  channels: NotificationChannel[]

  @OneToMany(() => Log, log => log.user, { nullable: true })
  logs: Log[];

  toAPI = (): Partial<User> => {
    return {
      id: this.id,
      name: this.name,
      phoneNumber: this.phoneNumber,
      email: this.email,
      subscribed: this.subscribed,
      channels: this.channels,
    }
  }
}
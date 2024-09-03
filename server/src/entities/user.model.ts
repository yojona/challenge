import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ChannelType } from '../types';

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
    nullable: true,
  })
  subscribed: string;

  @Column({ default: ChannelType.EMAIL })
  channels: string;

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
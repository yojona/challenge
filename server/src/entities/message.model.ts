import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { MessageCategory } from '../types';

@Entity()
export default class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({
    type: 'enum',
    enum: MessageCategory,
    nullable: true,
  })
  category: MessageCategory;

  toAPI = (): Partial<Message> => {
    return {
      id: this.id,
      message: this.message,
      category: this.category,
    }
  }
}
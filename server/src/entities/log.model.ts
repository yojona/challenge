import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MessageCategory } from '../types';
@Entity()
export default class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ type: 'timestamp with time zone', default: new Date() })
  createdAt: Date;

  @Column({ type: 'enum', enum: MessageCategory, default: MessageCategory.SPORTS })
  category: MessageCategory;

  toAPI = (): Partial<Log> => {
    return {
      id: this.id,
      message: this.message,
      createdAt: this.createdAt,
      category: this.category,
    }
  }
}

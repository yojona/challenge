import moment from 'moment';
import { NotificationChannel } from './channel.model';
import { generateId } from '../util/misc';
import { ChannelType, MessageCategory } from '../types';

export class PushChannel extends NotificationChannel {
  constructor () {
    super();
    this.channelType = ChannelType.PUSH;
  }

  async sendMessage(userId: number, message: string, category: MessageCategory): Promise<void> {
    /*
     * custom logic for email channel
     */
    const timestamp = moment.now();
    const messageId = generateId();
    console.log(this.channelType, messageId, userId, timestamp, message, category);

    // Post notification: Store log
    try {
      const content = `[${this.channelType}]: ${message}`;
      await this.logMessage(content, category);
    } catch (e) {
      console.log(e);
    }
  }
};

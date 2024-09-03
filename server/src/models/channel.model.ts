import { getRepository } from 'typeorm';
import Log from '../entities/log.model';
import { ChannelType, MessageCategory } from '../types';

export class NotificationChannel {
  protected channelType: ChannelType;

  constructor() {};

  getChannelType () {
    return this.channelType;
  }

  sendMessage (userId: number, message: string, category: MessageCategory) {
    // different logic for each channel
  }

  async logMessage (content: string, category: MessageCategory) {
    try {
      const logRepository = getRepository(Log);
      const log = new Log();
      log.category = category;
      log.message = content;

      await logRepository.save(log);
    } catch (e) {
      console.error(e);
    }
  }
};

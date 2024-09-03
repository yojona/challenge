import { getRepository, Like } from 'typeorm';
import User from '../entities/user.model';
import { EmailChannel } from '../models/email.channel.model';
import { PushChannel } from '../models/push.channel.model';
import { SMSChannel } from '../models/sms.channel.model';
import { ChannelType, MessageCategory } from '../types';

export class NotificationManager {
  static createChannel (channelType: ChannelType) {
    switch (channelType) {
      case ChannelType.EMAIL:
        return new EmailChannel();

      case ChannelType.PUSH:
        return new PushChannel();

      case ChannelType.SMS:
        return new SMSChannel();
    }
  }
  static async notify (category: MessageCategory, message: string) {
    try {
      const userRepository = getRepository(User);
      const userList = await userRepository.find({
        where: {
          subscribed: Like(`%${category}%`)
        },
      })
      
      userList.forEach((user) => {
        const channels = (user.channels?.split(',') || []) as ChannelType[];
        this.createNotification(user.id, channels, message, category);
      })

    } catch (e) {
      console.error('Error sending notification: ', e);
    }
  }

  static async createNotification (
    userId: number,
    channels: ChannelType[],
    message: string,
    category: MessageCategory,
  ) {
    try {
      channels.forEach((channelType) => {
        const channel = this.createChannel(channelType);
        channel.sendMessage(userId, message, category);
      })
    } catch (e) {
      console.error('Error sending notification: ', e);
    }
  }
};

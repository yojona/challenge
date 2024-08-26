import { MessageCategory, NotificationChannel } from '../entities/user.model';

export const MessageTemplates = {
  categories: {
    USER_SUBSCRIBED: 'User %user_id% has successfully subscribed to "%resource%".',
    USER_ALREADY_SUBSCRIBED: 'User %user_id% is already subscribed to "%resource%".',
    USER_SUBSCRIBE_ERROR: 'Error subscribing to category "%category%".',
    USER_NOT_SUSCRIBED: 'User %user_id% is not subscribed to %category%.',
    USER_UNSUSCRIBED: 'User %user_id% has successfully unsubscribed from %category%.',
  },
  channels: {
    USER_JOINED: 'User %user_id% has successfully joined the channel "%resource%".',
    USER_ALREADY_JOINED: 'User %user_id% is already joined to channel "%resource%".',
    USER_JOIN_ERROR: 'Error joining to channel %resource%.',
    USER_NOT_JOINED: 'User %user_id% is not joined to %resource%.',
    USER_LEFT: 'User %user_id% has left the channel "%resource%".',
  }
}

export const buildMessage = (
  message: string,
  userId: number,
  resourceType: MessageCategory | NotificationChannel,
) => {
  const messageWithUserId = message.replace('%user_id%', `${userId}`);
  const messageWithResoureType = messageWithUserId.replace('%resource%', resourceType);
  console.info(messageWithResoureType);
  return messageWithResoureType;
};

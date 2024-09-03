
export enum ResourceType {
  CATEGORY='Category',
  CHANNEL='Channel',
}

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

export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  subscribed: MessageCategory[];
  channels: NotificationChannel[];
};

export type UserAPI = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  subscribed: string;
  channels: string;
};

export type APIResponse = {
  message: string;
};

export type Log = {
  id: number;
  message: string;
  createdAt: string;
  category: string
};

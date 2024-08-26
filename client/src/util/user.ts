import { User } from '../components/Form/types';
import { normalizeText } from './string';


export const filterUsersBySearch = (users: User[], search: string = '') => {
  if (!search) return users;
  const query = normalizeText(search);
  return users.filter((user) => {
    return (
      normalizeText(user.name).includes(query) ||
      normalizeText(user.email).includes(query) ||
      normalizeText(user.phoneNumber).includes(query) ||
      normalizeText(user.subscribed?.join(',')).includes(query) ||
      normalizeText(user.channels?.join(',')).includes(query)
    );
  });
};

export const sortUsers = (users: User[], sortBy: string, sortDirection: string) => {
  if (!sortBy) return users;
  const sortedUsers = [...users];
  sortedUsers.sort((a, b) => {
    const aValue = a[sortBy as keyof User];
    const bValue = b[sortBy as keyof User];
    return `${aValue}`.localeCompare(`${bValue}`);
  });
  if (sortDirection === 'desc') sortedUsers.reverse();
  return sortedUsers;
};

export const formatUserName = (user: User | null) => {
  if (!user) return 'Unknown user';
  return user.name;
};

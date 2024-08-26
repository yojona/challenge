import moment from 'moment';

export const normalizeText = (text: string): string => {
  if (!text) return '';
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

export const formatDate = (date?: string): string => {
  if (!date) return 'Invalid date';
  return moment(date).format('LL');
};

export const formatDatetime = (date?: string): string => {
  if (!date) return 'Invalid date';
  return moment(date).format('L - h:mm A');
};

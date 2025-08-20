import dayjs from 'dayjs';

export function getHistoryTitle(date: string) {
  return dayjs().isSame(date, 'day') ? 'common.today' : date;
}

import { MONTH_NAMES } from './constants';

export const getPastThreeMonths = () => {
  const date = new Date();
  const months = [];
  for (let i = 0; i < 3; i++) {
    const month = date.getMonth() - i;
    const year = date.getFullYear();
    if (month >= 0) {
      months.push({ month: MONTH_NAMES[month], year });
    } else {
      months.push({ month: MONTH_NAMES[12 + month], year: year - 1 });
    }
  }
  return months;
};

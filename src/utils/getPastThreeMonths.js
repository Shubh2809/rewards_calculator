import { MONTH_NAMES } from './constants';

export const getPastThreeMonths = (transactions) => {
  if (!transactions.length){
    return [];
  } 
  
  // sorting of transactions by date in descending order
  const sortedTransactions = transactions.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
  
  const latestTransactionDate = new Date(sortedTransactions[0].transactionDate);
  
  const months = [];
  for (let i = 0; i < 3; i++) {
    const month = latestTransactionDate.getMonth() - i;
    const year = latestTransactionDate.getFullYear();
    if (month >= 0) {
      months.push({ month: MONTH_NAMES[month], year });
    } else {
      months.push({ month: MONTH_NAMES[12 + month], year: year - 1 });
    }
  }
  
  return months;
};

import logger from '../logger';
import { MONTHLY_REWARD, TOTAL_POINTS, ASSIGNMENT, MONTH_NAMES } from './constants';

export const calculateRewardPointsForAmount = (amount) => {
  if (amount > 100) {
    return (amount - 100) * 2 + 50; // 2 points for every dollar over $100, plus 1 point for every dollar between $50 and $100
  } else if (amount > 50) {
    return amount - 50; // 1 point for every dollar between $50 and $100
  }
  return 0; // No points for amounts $50 or less
};


export const calculateRewardPoints = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const points = calculateRewardPointsForAmount(transaction.amount);
    const date = new Date(transaction.transactionDate);
    const month = date.getMonth(); // getMonth is 0-indexed
    const year = date.getFullYear();
    const customerId = transaction.customerId;
    const customerName = transaction.customerName;

    if (!acc[customerId]) {
      acc[customerId] = { name: customerName, monthlyPoints: {} };
    }

    if (!acc[customerId].monthlyPoints[year]) {
      acc[customerId].monthlyPoints[year] = {};
    }

    if (!acc[customerId].monthlyPoints[year][MONTH_NAMES[month]]) {
      acc[customerId].monthlyPoints[year][MONTH_NAMES[month]] = 0;
    }

    acc[customerId].monthlyPoints[year][MONTH_NAMES[month]] += points;
    logger.log(MONTHLY_REWARD, acc[customerId].name + ASSIGNMENT + points);
    return acc;
  }, {});
};


export const calculateTotalPoints = (monthlyPoints) => {
  return Object.keys(monthlyPoints).reduce((acc, customerId) => {
    const customer = monthlyPoints[customerId];
    acc[customerId] = {
      name: customer.name,
      totalPoints: Object.values(customer.monthlyPoints).reduce((sum, yearPoints) => {
        return sum + Object.values(yearPoints).reduce((yearSum, points) => yearSum + points, 0);
      }, 0)
    };
    logger.log(TOTAL_POINTS, acc[customerId].name + ASSIGNMENT + acc[customerId].totalPoints);
    return acc;
  }, {});
};
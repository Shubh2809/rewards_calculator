import logger from '../logger';
import { MONTHLY_REWARD, TOTAL_POINTS, ASSIGNMENT, MONTH_NAMES, ERROR_INVALID_AMOUNT, ERROR_INVALID_PURCHASE_DATE, ERROR_INVALID_TRANSACTION_DATE } from './constants';

// Calculate reward points according to the given amount
export const calculateRewardPointsForAmount = (amount) => {

  if (amount > 100) {
    return (amount - 100) * 2 + 50; // 2 points for every dollar over $100, plus 1 point for every dollar between $50 and $100
  } else if (amount > 50) {
    return amount - 50; // 1 point for every dollar between $50 and $100
  }
  return 0; // No points for amounts $50 or less
};

// Calculate reward points for the months
export const calculateRewardPoints = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const { amount, transactionDate, purchaseDate, customerId, customerName } = transaction;
    
    if (typeof amount !== 'number' || isNaN(amount)) {
      throw new Error(ERROR_INVALID_AMOUNT.replace('%amount%', amount));
    }

    const points = calculateRewardPointsForAmount(amount);

    const pDate = new Date(purchaseDate);
    if (isNaN(pDate)) {
      throw new Error(ERROR_INVALID_PURCHASE_DATE.replace('%purchaseDate%', purchaseDate));
    }

    const date = new Date(transactionDate);
    if (isNaN(date)) {
      throw new Error(ERROR_INVALID_TRANSACTION_DATE.replace('%transactionDate%', transactionDate));
    }
    const month = date.getMonth(); // getMonth is 0-indexed
    const year = date.getFullYear();

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
    logger.log(MONTHLY_REWARD, `${acc[customerId].name}${ASSIGNMENT}${points}`);
    return acc;
  }, {});
};

// Calculate total reward points
export const calculateTotalPoints = (monthlyPoints) => {
  return Object.keys(monthlyPoints).reduce((acc, customerId) => {
    const customer = monthlyPoints[customerId];
    acc[customerId] = {
      name: customer.name,
      totalPoints: Object.values(customer.monthlyPoints).reduce((sum, yearPoints) => {
        return sum + Object.values(yearPoints).reduce((yearSum, points) => yearSum + points, 0);
      }, 0)
    };
    logger.log(TOTAL_POINTS, `${acc[customerId].name}${ASSIGNMENT}${acc[customerId].totalPoints}`);
    return acc;
  }, {});
};

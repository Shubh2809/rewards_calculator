
export const calculateRewardPoints = (transactions) => {
    return transactions.reduce((acc, transaction) => {

      let points = 0;

      if (transaction.amount > 100) {
        points += (transaction.amount - 100) * 2;
        points += 50; 
      } else if (transaction.amount > 50) {
        points += (transaction.amount - 50);
      }

      const month = new Date(transaction.transactionDate).getMonth() + 1; 
      if (!acc[transaction.customerId]) {
        acc[transaction.customerId] = {};
      }
      if (!acc[transaction.customerId][month]) {
        acc[transaction.customerId][month] = 0;
      }
      acc[transaction.customerId][month] += points;
      return acc;
    }, {});

  };
  
  export const calculateTotalPoints = (monthlyPoints) => {
    return Object.keys(monthlyPoints).reduce((acc, customerId) => {
      acc[customerId] = Object.values(monthlyPoints[customerId]).reduce((sum, points) => sum + points, 0);
      return acc;
    }, {});

  };
  
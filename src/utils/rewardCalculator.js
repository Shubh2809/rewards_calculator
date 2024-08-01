
export const calculateRewardPoints = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    let points = 0;
    if (transaction.amount > 100) { // amount greater than $100
      points += (transaction.amount - 100) * 2;
      points += 50; // 1 point for each dollar between $50 and $100
    } else if (transaction.amount > 50) { // amount between $50 and $100
      points += (transaction.amount - 50);
    }
    const date = new Date(transaction.transactionDate);
    const month = date.getMonth() + 1; // getMonth is 0-indexed
    const year = date.getFullYear();
    const customerId = transaction.customerId;
    const customerName = transaction.customerName;

    if (!acc[customerId]) {
      acc[customerId] = { name: customerName, monthlyPoints: {} };
    }

    if (!acc[customerId].monthlyPoints[year]) {
      acc[customerId].monthlyPoints[year] = {};
    }

    if (!acc[customerId].monthlyPoints[year][month]) {
      acc[customerId].monthlyPoints[year][month] = 0;
    }

    acc[customerId].monthlyPoints[year][month] += points;
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
    return acc;
  }, {});
};
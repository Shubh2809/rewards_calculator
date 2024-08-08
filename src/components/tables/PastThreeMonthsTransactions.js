import React from 'react';
import Transactions from './Transactions';
import { getPastThreeMonths } from '../../utils/getPastThreeMonths';
import { MONTH_NAMES } from '../../utils/constants';
  
const PastThreeMonthsTransactions = ({ transactions }) => {
  const pastThreeMonths = getPastThreeMonths();
  const getTransactionsByMonth = (transactions, month, year) => {
    return transactions.filter(transaction => {
      const date = new Date(transaction.transactionDate);
      return date.getMonth() === MONTH_NAMES.indexOf(month) && date.getFullYear() === year;
    });
  };

  const noTransaction = {
    fontSize : "1.5em",
    fontWeight : "700",
    backgroundColor: "aliceblue",
    color: "#072459f4"
  };

  return (
    <div className="past-three-months-transactions">
      {pastThreeMonths.map(({ month, year }) => {
        const monthTransactions = getTransactionsByMonth(transactions, month, year);
        return (
          <div key={`${month}-${year}`} className="month-transactions">
            <h2>{month} {year}</h2>
            {monthTransactions.length > 0 ? (
              <Transactions transactions={monthTransactions} />
            ) : (
              <p style={noTransaction}>No transactions for {month} {year}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PastThreeMonthsTransactions;

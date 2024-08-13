import React from 'react';
import {TRANSACTIONS_HEADING, TRANSACTIONS_ID, CUSTOMER_ID, PRODUCT, REWARD_POINTS_HEADING ,PRICE,  NAME, PURCHASE_DATE } from '../../utils/constants';
import { calculateRewardPointsForAmount } from '../../utils/rewardCalculator';

const Transactions = ({ transactions }) => {
  // Sort transactions by date
  const sortedTransactions = transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
       <h2>{TRANSACTIONS_HEADING}</h2>
       <table>
         <thead>
           <tr>
             <th>{TRANSACTIONS_ID}</th>
             <th>{CUSTOMER_ID}</th>
             <th>{NAME}</th>
             <th>{PRODUCT}</th>
             <th>{PURCHASE_DATE}</th>
             <th>{PRICE}</th>
             <th>{REWARD_POINTS_HEADING}</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(transaction => {
            const points = calculateRewardPointsForAmount(transaction.amount);
            return (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.customerId}</td>
                <td>{transaction.customerName}</td>
                <td>{transaction.product}</td>
                <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                <td>{transaction.amount.toFixed(2)}</td>
                <td>{Math.round(points.toFixed(2))}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

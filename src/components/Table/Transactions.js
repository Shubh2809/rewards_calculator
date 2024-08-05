import React from 'react';
import {TRANSACTIONS_HEADING, TRANSACTIONS_ID, PRODUCT, REWARD_POINTS_HEADING ,PRICE,  NAME, PURCHASE_DATE } from '../../utils/constants';

const Transactions = ({ transactions }) => {
  return (
    <div>
      <h2>{TRANSACTIONS_HEADING}</h2>
      <table>
        <thead>
          <tr>
            <th>{TRANSACTIONS_ID}</th>
            <th>{NAME}</th>
            <th>{PRODUCT}</th>
            <th>{PURCHASE_DATE}</th>
            <th>{PRICE}</th>
            <th>{REWARD_POINTS_HEADING}</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => {
            let points = 0;
            if (transaction.amount > 100) {
              points += (transaction.amount - 100) * 2; // 2 point for each dollar above $100
              points += 50; // 1 point for each dollar between $50 and $100
            } else if (transaction.amount > 50) {
              points += (transaction.amount - 50);
            }
            return (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionId}</td>
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

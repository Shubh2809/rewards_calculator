import React from 'react';

const Transactions = ({ transactions }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Purchase Date</th>
            <th>Product</th>
            <th>Price</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => {
            let points = 0;
            if (transaction.amount > 100) {
              points += (transaction.amount - 100) * 2;
              points += 50;  // 1 point for each dollar between $50 and $100
            } else if (transaction.amount > 50) {
              points += (transaction.amount - 50);
            }
            return (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.customerName}</td>
                <td>{new Date(transaction.purchaseDate).toLocaleDateString()}</td>
                <td>{transaction.product}</td>
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
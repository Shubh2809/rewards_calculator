import React from 'react';

const MonthlyRewards = ({ monthlyPoints }) => {
  return (
    <div>
      <h2>Monthly Rewards</h2>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(monthlyPoints).map(customerId => {
            const customer = monthlyPoints[customerId];
            return Object.keys(customer.monthlyPoints).map(year => {
              return Object.keys(customer.monthlyPoints[year]).map(month => (
                <tr key={`${customerId}-${year}-${month}`}>
                  <td>{customerId}</td>
                  <td>{customer.name}</td>
                  <td>{month}</td>
                  <td>{year}</td>
                  <td>{Math.round(customer.monthlyPoints[year][month].toFixed(2))}</td>
                </tr>
              ));
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyRewards;
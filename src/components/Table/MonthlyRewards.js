import React from 'react';
import { REWARD_POINTS_HEADING ,MONTHLY_REWARDS_HEADING, CUSTOMER_ID, NAME,MONTH, YEAR } from '../../utils/constants';

const MonthlyRewards = ({ monthlyPoints }) => {
  return (
    <div>
      <h2>{MONTHLY_REWARDS_HEADING}</h2>
      <table>
        <thead>
          <tr>
            <th>{CUSTOMER_ID}</th>
            <th>{NAME}</th>
            <th>{MONTH}</th>
            <th>{YEAR}</th>
            <th>{REWARD_POINTS_HEADING}</th>
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

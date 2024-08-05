import React from 'react';
import { REWARD_POINTS_HEADING ,MONTHLY_REWARDS_HEADING, CUSTOMER_ID, NAME,MONTH, YEAR, MONTH_NUMBERS } from '../../utils/constants';

const MonthlyRewards = ({ monthlyPoints }) => {

  //Get Sorted Data
  const getSortedData = () => {
    const sortedData = [];

    Object.keys(monthlyPoints).forEach(customerId => {
      const customer = monthlyPoints[customerId];
      Object.keys(customer.monthlyPoints).forEach(year => {
        Object.keys(customer.monthlyPoints[year]).forEach(month => {
          sortedData.push({
            customerId,
            name: customer.name,
            year: parseInt(year, 10),
            month,
            monthNumber: MONTH_NUMBERS[month],
            points: customer.monthlyPoints[year][month]
          });
        });
      });
    });

    return sortedData.sort((a, b) => {
      if (a.year === b.year) {
        return a.monthNumber - b.monthNumber;
      }
      return a.year - b.year;
    });
  };

  const sortedData = getSortedData();

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
          {sortedData.map((data, index) => (
            <tr key={index}>
              <td>{data.customerId}</td>
              <td>{data.name}</td>
              <td>{data.month}</td>
              <td>{data.year}</td>
              <td>{Math.round(data.points.toFixed(2))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyRewards;


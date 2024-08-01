import React from 'react';

const TotalRewards = ({ totalPoints }) => {
  return (
    <div>
      <h2>Total Rewards</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(totalPoints).map(customerId => (
            <tr key={customerId}>
              <td>{totalPoints[customerId].name}</td>
              <td>{Math.round(totalPoints[customerId].totalPoints.toFixed(2))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalRewards;
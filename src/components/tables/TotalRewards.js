import React from 'react';
import { REWARD_POINTS_HEADING , NAME, TOTAL_REWARDS_HEADING } from '../../utils/constants';

const TotalRewards = ({ totalPoints }) => {
  return (
    <div>
      <h2>{TOTAL_REWARDS_HEADING}</h2>
      <table>
        <thead>
          <tr>
            <th>{NAME}</th>
            <th>{REWARD_POINTS_HEADING}</th>
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
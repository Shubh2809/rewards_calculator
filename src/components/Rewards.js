import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/rewardApiService';
import { calculateRewardPoints, calculateTotalPoints } from '../utils/rewardCalculator';
import './Rewards.css';

const Rewards = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyPoints, setMonthlyPoints] = useState({});
  const [totalPoints, setTotalPoints] = useState({});

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        console.log(data)
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const monthly = calculateRewardPoints(transactions);
      setMonthlyPoints(monthly);
      setTotalPoints(calculateTotalPoints(monthly));
    }
  }, [transactions]);

  return (
    <div className="rewards">
      <h1>Rewards Points</h1>
      {Object.keys(monthlyPoints).map(customerId => (
        <div key={customerId} className="customer-rewards">
          <h2>Customer {customerId}</h2>
          {Object.keys(monthlyPoints[customerId]).map(month => (
            <p key={month}>Month {month}: {monthlyPoints[customerId][month]} points</p>
          ))}
          <p className="total">Total: {totalPoints[customerId]} points</p>
        </div>
      ))}
    </div>
  );
};

export default Rewards;
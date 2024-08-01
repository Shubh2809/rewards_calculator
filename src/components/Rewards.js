import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/rewardApiService';
import { calculateRewardPoints, calculateTotalPoints } from '../utils/rewardCalculator';
import MonthlyRewards from './Table/MonthlyRewards';
import TotalRewards from './Table/TotalRewards';
import Transactions from './Table/Transactions';
import './Rewards.css';

const Rewards = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyPoints, setMonthlyPoints] = useState({});
  const [totalPoints, setTotalPoints] = useState({});

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
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
      <MonthlyRewards monthlyPoints={monthlyPoints} />
      <Transactions transactions={transactions} />
      <TotalRewards totalPoints={totalPoints} />
    </div>
  );
};

export default Rewards;
import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/rewardApiService';
import { calculateRewardPoints, calculateTotalPoints } from '../utils/rewardCalculator';
import MonthlyRewards from './Table/MonthlyRewards';
import TotalRewards from './Table/TotalRewards';
import Transactions from './Table/Transactions';
import './Rewards.css';
import logger from '../logger';
import { TRANSACTIONS_FETCHED, ERROR_MESSAGE,REWARD_POINTS_HEADING, REWARD_POINTS } from '../utils/constants';

const Rewards = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyPoints, setMonthlyPoints] = useState({});
  const [totalPoints, setTotalPoints] = useState({});

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        logger.debug(TRANSACTIONS_FETCHED, data);
        setTransactions(data);
      } catch (error) {
        logger.error(ERROR_MESSAGE, error);
      }
    };

    getTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const monthly = calculateRewardPoints(transactions);
      setMonthlyPoints(monthly);
      setTotalPoints(calculateTotalPoints(monthly));
      logger.debug(REWARD_POINTS, { monthly });
    }
  }, [transactions]);

  return (
    <div className="rewards">
      <h1>{REWARD_POINTS_HEADING}</h1>
      <Transactions transactions={transactions} />
      <MonthlyRewards monthlyPoints={monthlyPoints} />
      <TotalRewards totalPoints={totalPoints} />
    </div>
  );
};

export default Rewards;
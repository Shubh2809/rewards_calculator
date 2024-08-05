import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/rewardApiService';
import { calculateRewardPoints, calculateTotalPoints } from '../utils/rewardCalculator';
import MonthlyRewards from './Table/MonthlyRewards';
import TotalRewards from './Table/TotalRewards';
import Transactions from './Table/Transactions';
import './Rewards.css';
import logger from '../logger';
import { TRANSACTIONS_FETCHED, LOAD_TIMEOUT, FETCHING_TRANSACTIONS, CALCULATE_REWARD, ERROR_MESSAGE, LOADING, REWARD_POINTS_HEADING, REWARD_POINTS } from '../utils/constants';

const Rewards = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyPoints, setMonthlyPoints] = useState({});
  const [totalPoints, setTotalPoints] = useState({});
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getTransactions = async () => {
      try {
        logger.debug(FETCHING_TRANSACTIONS);
        const data = await fetchTransactions();
        logger.debug(TRANSACTIONS_FETCHED, data);
        setTransactions(data);
        setTimeout(() => {
          setLoading(false);
        },LOAD_TIMEOUT );

        logger.debug(CALCULATE_REWARD);
        const monthly = calculateRewardPoints(data);
        setMonthlyPoints(monthly);
        setTotalPoints(calculateTotalPoints(monthly));
        logger.debug(REWARD_POINTS, { monthly });
      } catch (error) {
        logger.error( ERROR_MESSAGE, error);
        setError(error);
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

    // This useEffect only needs to depend on transactions
    useEffect(() => {
      if (transactions.length > 0) {
        logger.debug(CALCULATE_REWARD);
        const monthly = calculateRewardPoints(transactions);
        setMonthlyPoints(monthly);
        setTotalPoints(calculateTotalPoints(monthly));
        logger.debug(REWARD_POINTS, { monthly });
      }
    }, [transactions]); // only depends on transactions

    
  if (loading) {
    return <div className='loading'>{LOADING}</div>;
  }

  if (error) {
    return <div className="error">{ERROR_MESSAGE}</div>
}

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


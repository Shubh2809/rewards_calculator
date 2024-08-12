import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/rewardApiService';
import { calculateRewardPoints, calculateTotalPoints } from '../utils/rewardCalculator';
import MonthlyRewards from '../components/tables/monthlyRewards'
import TotalRewards from '../components/tables/totalRewards';
import Transactions from '../components/tables/transactions';
import PastThreeMonthsTransactions from '../components/tables/pastThreeMonthsTransactions';
import './rewards.css';
import logger from '../logger';
import { TRANSACTIONS_FETCHED, FETCHING_TRANSACTIONS, CALCULATE_REWARD, ERROR_MESSAGE, LOADING, REWARD_POINTS_HEADING, REWARD_POINTS } from '../utils/constants';

const Rewards = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyPoints, setMonthlyPoints] = useState({});
  const [totalPoints, setTotalPoints] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);      // Loading... is enabled
    const getTransactions = async () => {
      try {
        logger.debug(FETCHING_TRANSACTIONS);
        const data = await fetchTransactions();
        logger.debug(TRANSACTIONS_FETCHED, data);
        setTransactions(data);
        setLoading(false);

        logger.debug(CALCULATE_REWARD);
        const monthly = calculateRewardPoints(data);
        setMonthlyPoints(monthly);
        setTotalPoints(calculateTotalPoints(monthly));
        logger.debug(REWARD_POINTS, { monthly });
      } catch (error) {
        logger.error(ERROR_MESSAGE, error);
        setError(error.message);
      } finally {
        setLoading(false);  //Loading... is disabled
      }
    };

    getTransactions();
  }, []);

  // This useEffect only needs to depend on transactions
  useEffect(() => {
    if (transactions.length > 0) {
      try {
        logger.debug(CALCULATE_REWARD);
        const monthly = calculateRewardPoints(transactions);
        setMonthlyPoints(monthly);
        setTotalPoints(calculateTotalPoints(monthly));
        logger.debug(REWARD_POINTS, { monthly });
      } catch (error) {
        logger.error(ERROR_MESSAGE, error);
        setError(error.message);
      }
    }
  }, [transactions]); // only depends on transactions


  //Handling loading state
  if (loading) {
    return <div className='loading'>{LOADING}</div>;
  }

  //Error handling
  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="rewards">
      <h1>{REWARD_POINTS_HEADING}</h1>
      <Transactions transactions={transactions} />
      <PastThreeMonthsTransactions transactions={transactions} />
      <MonthlyRewards monthlyPoints={monthlyPoints} />
      <TotalRewards totalPoints={totalPoints} />
    </div>
  );
};

export default Rewards;


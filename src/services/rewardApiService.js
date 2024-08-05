import { API_URL, ERROR_MESSAGE } from '../utils/constants';
import logger from '../logger'

export const fetchTransactions = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(ERROR_MESSAGE);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        logger.error(ERROR_MESSAGE)
    }
  };
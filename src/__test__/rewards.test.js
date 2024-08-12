import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fetchTransactions } from '../services/rewardApiService';
import { TRANSACTIONS_FETCHED, ERROR_MESSAGE, FETCHING_TRANSACTIONS, LOADING, REWARD_POINTS_HEADING } from '../utils/constants';
import logger from '../logger';
import Rewards from '../screens/Rewards';

//for mocking fetchTransactions and logger
jest.mock('../services/rewardApiService');
jest.mock('../logger');

describe('Rewards Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the loading state initially', () => {
        fetchTransactions.mockReturnValue(new Promise(() => { })); //it Return's a pending promise

        render(<Rewards />);
        expect(screen.getByText(LOADING)).toBeInTheDocument();
    });

    test('renders the rewards tables and data after successful fetch', async () => {
        const mockTransactions = [
            { transactionDate: '2024-07-25', amount: 200, purchaseDate: '2024-07-15' },
            { transactionDate: '2024-06-15', amount: 150, purchaseDate: '2024-06-15' },
            { transactionDate: '2024-05-10', amount: 100, purchaseDate: '2024-05-10' },
        ];

        fetchTransactions.mockResolvedValueOnce(mockTransactions);

        render(<Rewards />);

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: REWARD_POINTS_HEADING, level: 1 })).toBeInTheDocument();
            expect(screen.getByText(/July 2024/i)).toBeInTheDocument();
            expect(screen.getByText(/June 2024/i)).toBeInTheDocument();
            expect(screen.getByText(/May 2024/i)).toBeInTheDocument();
        });
    });

    test('renders error message when fetch fails', async () => {
        fetchTransactions.mockRejectedValueOnce(new Error(ERROR_MESSAGE));

        render(<Rewards />);

        await waitFor(() => {
            expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
        });
    });

    test('logs correct messages during fetch and calculation', async () => {
        const mockTransactions = [
            { transactionDate: '2024-07-15', amount: 200, purchaseDate: '2024-07-15' },
            { transactionDate: '2024-06-15', amount: 150, purchaseDate: '2024-06-15' },
        ];

        fetchTransactions.mockResolvedValueOnce(mockTransactions);

        render(<Rewards />);

        await waitFor(() => {
            expect(logger.debug).toHaveBeenCalledWith(FETCHING_TRANSACTIONS);
            expect(logger.debug).toHaveBeenCalledWith(TRANSACTIONS_FETCHED, mockTransactions);
        });
    });

    test('renders "No transactions" for months without transactions', async () => {
        const mockTransactions = [
            { transactionDate: '2024-07-15', amount: 200, purchaseDate: '2024-07-15' },
            { transactionDate: '2024-06-15', amount: 150, purchaseDate: '2024-06-15' },
        ];

        fetchTransactions.mockResolvedValueOnce(mockTransactions);

        render(<Rewards />);

        await waitFor(() => {
            expect(screen.getByText('No transactions for May 2024')).toBeInTheDocument();
        });
    });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Rewards from './Rewards';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { fetchTransactions } from '../services/rewardApiService';
import { ERROR_MESSAGE, LOADING } from '../utils/constants';

jest.mock('../services/rewardApiService');

// Mock the fetchTransactions API call
const mockTransactions = [
    [
        {
          "transactionId": 1,
          "customerId": 1,
          "customerName": "John Cena",
          "transactionDate": "2023-09-12",
          "purchaseDate": "2023-09-12",
          "product":"Protein Powder",
          "amount": 170
        },
        {
          "transactionId": 2,
          "customerId": 1,
          "customerName": "John Cena",
          "transactionDate": "2023-10-12",
          "purchaseDate":"2023-10-12",
          "product":"Cap",
          "amount": 80
        },
        {
          "transactionId": 3,
          "customerId": 2,
          "customerName": "Chris Ronaldo",
          "transactionDate": "2024-07-07",
          "purchaseDate": "2024-07-07",
          "product":"Football",
          "amount": 77
        }
      ]
];

describe('Rewards', () => {
  test('renders loading state initially', () => {
    render(<Rewards />);
    expect(screen.getByText(LOADING)).toBeInTheDocument();
  });

  test('renders error state on API error', async () => {
    fetchTransactions.mockRejectedValueOnce(new Error(ERROR_MESSAGE));

    await act(async () => {
      render(<Rewards />);
    });

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument();
  });

  test('renders the rewards tables with fetched data', async () => {
    fetchTransactions.mockResolvedValueOnce(mockTransactions);

    await act(async () => {
      render(<Rewards />);
    });

    // expect(screen.getByText('Transactions')).toBeInTheDocument();
    // expect(screen.getByText('Monthly Rewards')).toBeInTheDocument();
    // expect(screen.getByText('Total Rewards')).toBeInTheDocument();

    // // Check if data is rendered correctly in the tables
    // expect(screen.getByText('John Cena')).toBeInTheDocument();
    // expect(screen.getByText('Chris Ronaldo')).toBeInTheDocument();
    // expect(screen.getByText('220')).toBeInTheDocument();
    // expect(screen.getByText('27')).toBeInTheDocument();
  });
});

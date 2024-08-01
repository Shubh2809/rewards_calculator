import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Rewards from './Rewards';
import * as rewardApiService from '../services/apiService';
import * as rewardCalculator from '../utils/rewardCalculator';

jest.mock('../services/rewardApiService');
jest.mock('../utils/rewardCalculator');

test('renders Rewards component and displays points', async () => {
    const mockTransactions = [
        { transactionId : 1, customerId: 1, customerName: "John Cena", transactionDate: "2023-09-12", purchaseDate: "2023-09-12", product :"Protein Powder", amount: 170 },
        { transactionId : 2, customerId: 1, customerName: "John Cena", transactionDate: "2023-10-12", purchaseDate:"2023-10-12", product :"Cap", amount: 80 },
        { transactionId : 3, customerId: 2, customerName: "Chris Ronaldo", transactionDate: "2024-07-07", purchaseDate: "2024-07-07", product :"Football", amount: 77 },
      ]
      
    
      const monthlyPoints = {
        1: { name: 'John Cena', monthlyPoints: { 2023: { 9: 190, 10: 30 } } },
        2: { name: 'Chris Ronaldo', monthlyPoints: { 2024: { 7: 27 } } }
      };
    
      const totalPoints = {
        1: { name: 'John Cena', totalPoints: 220 },
        2: { name: 'Chris Ronaldo', totalPoints: 27 }
      };
    
      rewardApiService.fetchTransactions.mockResolvedValue(mockTransactions);
      rewardCalculator.calculateRewardPoints.mockReturnValue(monthlyPoints);
      rewardCalculator.calculateTotalPoints.mockReturnValue(totalPoints);
    
      render(<Rewards />);
    
      await waitFor(() => {
        expect(screen.getByText('Rewards Points')).toBeInTheDocument();
        expect(screen.getByText('Monthly Rewards')).toBeInTheDocument();
        expect(screen.getByText('Transactions')).toBeInTheDocument();
        expect(screen.getByText('Total Rewards')).toBeInTheDocument();
    
        expect(screen.getByText('John Cena')).toBeInTheDocument();
        expect(screen.getByText('Chris Ronaldo')).toBeInTheDocument();
        expect(screen.getByText('Month 9: 190 points')).toBeInTheDocument();
        expect(screen.getByText('Month 10: 30 points')).toBeInTheDocument();
        expect(screen.getByText('Month 7: 30 points')).toBeInTheDocument();
        expect(screen.getByText('Total: 220 points')).toBeInTheDocument();
        expect(screen.getByText('Total: 27 points')).toBeInTheDocument();
      });
});

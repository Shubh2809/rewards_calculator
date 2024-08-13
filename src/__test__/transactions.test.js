import React from 'react';
import { render, screen } from '@testing-library/react';
import { TRANSACTIONS_ID, PRODUCT, REWARD_POINTS_HEADING, PRICE, NAME, PURCHASE_DATE, CUSTOMER_ID } from '../utils/constants';
import { calculateRewardPointsForAmount } from '../utils/rewardCalculator';
import Transactions from '../components/tables/transactions';

// Mock transactions data
const mockTransactions = [
  { transactionId: 1, customerId: 1, customerName: "John Cena", transactionDate: "2023-09-12", purchaseDate: "2023-09-12", product: "Protein Powder", amount: 170 },
  { transactionId: 2, customerId: 1, customerName: "John Cena", transactionDate: "2023-10-12", purchaseDate: "2023-10-12", product: "Cap", amount: 80 },
  { transactionId: 3, customerId: 2, customerName: "Chris Ronaldo", transactionDate: "2024-07-07", purchaseDate: "2024-07-07", product: "Football", amount: 77 }
];

describe('Transactions', () => {
  test('should render sorted transactions table with correct data', () => {
    render(<Transactions transactions={mockTransactions} />);

    // to check the headers
    const headers = screen.getAllByRole('columnheader');
    expect(headers[0]).toHaveTextContent(TRANSACTIONS_ID);
    expect(headers[1]).toHaveTextContent(CUSTOMER_ID);
    expect(headers[2]).toHaveTextContent(NAME);
    expect(headers[3]).toHaveTextContent(PRODUCT);
    expect(headers[4]).toHaveTextContent(PURCHASE_DATE);
    expect(headers[5]).toHaveTextContent(PRICE);
    expect(headers[6]).toHaveTextContent(REWARD_POINTS_HEADING);

    // to check the rows
    const rows = screen.getAllByRole('row');

    // Expected order after sorting by date (earliest date first)
    const expectedOrder = [
      { transactionId: 1, customerId: 1, customerName: "John Cena", transactionDate: "2023-09-12", purchaseDate: "2023-09-12", product: "Protein Powder", amount: 170 },
      { transactionId: 2, customerId: 1, customerName: "John Cena", transactionDate: "2023-10-12", purchaseDate: "2023-10-12", product: "Cap", amount: 80 },
      { transactionId: 3, customerId: 2, customerName: "Chris Ronaldo", transactionDate: "2024-07-07", purchaseDate: "2024-07-07", product: "Football", amount: 77 }
    ];

    expectedOrder.forEach((data, index) => {
      const expectedPoints = calculateRewardPointsForAmount(data.amount);
      const cells = rows[index + 1].querySelectorAll('td'); // Skip header row
      expect(cells[0].textContent).toBe(data.transactionId.toString());
      expect(cells[1].textContent).toBe(data.customerId.toString());
      expect(cells[2].textContent).toBe(data.customerName);
      expect(cells[3].textContent).toBe(data.product);
      expect(cells[4].textContent).toBe(new Date(data.purchaseDate).toLocaleDateString());
      expect(cells[5].textContent).toBe(data.amount.toFixed(2));
      expect(cells[6].textContent).toBe(Math.round(expectedPoints).toString());
    });
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import PastThreeMonthsTransactions from '../components/tables/pastThreeMonthsTransactions';

// Mock transactions data
const mockTransactions = [
  { transactionDate: '2024-07-15', amount: 200 },
  { transactionDate: '2024-06-15', amount: 150 },
  { transactionDate: '2024-05-15', amount: 100 },
];

describe('PastThreeMonthsTransactions Component', () => {
  test('renders three months with transactions', () => {
    render(<PastThreeMonthsTransactions transactions={mockTransactions} />);

    // to check if the correct month and year headers are rendered
    expect(screen.getByText('July 2024')).toBeInTheDocument();
    expect(screen.getByText('June 2024')).toBeInTheDocument();
    expect(screen.getByText('May 2024')).toBeInTheDocument();

    // to check if transactions are displayed for each month
    expect(screen.getByText(/200.00/i)).toBeInTheDocument(); // July transaction
    expect(screen.getByText(/150.00/i)).toBeInTheDocument(); // June transaction
    expect(screen.getByText(/100.00/i)).toBeInTheDocument();  // May transaction
  });

  test('renders "No transactions" when a month has no transactions', () => {
    // provide transactions only for July and June
    const partialTransactions = [
      { transactionDate: '2024-07-15', amount: 200 },
      { transactionDate: '2024-06-15', amount: 150 },
    ];

    render(<PastThreeMonthsTransactions transactions={partialTransactions} />);

    // to check if "No transactions" is displayed for May
    expect(screen.getByText('No transactions for May 2024')).toBeInTheDocument();
  });

  test('renders nothing when there are no transactions', () => {
    render(<PastThreeMonthsTransactions transactions={[]} />);

    // Ensure no transactions or headers are rendered
    expect(screen.queryByText(/2024/)).not.toBeInTheDocument();
    expect(screen.queryByText(/No transactions for May 2024/)).not.toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import App from './App';
import RewardPoints from './RewardPoints';

test('calculates reward points correctly for given transactions', () => {
  const mockTransactions = [
    { customerId: 1, amount: 120, date: "2023-01-15" },
    { customerId: 2, amount: 75, date: "2023-02-20" },
    { customerId: 1, amount: 200, date: "2023-03-05" },
    { customerId: 2, amount: 50, date: "2023-01-10" },
    { customerId: 1, amount: 77, date: "2023-04-15" },
  ];

  render(<RewardPoints transactions={mockTransactions} />);

  expect(screen.getByText(/Customer ID: 1/)).toBeInTheDocument();
  expect(screen.getByText(/Month 1: 90 points/)).toBeInTheDocument();
  expect(screen.getByText(/Month 3: 250 points/)).toBeInTheDocument();
  expect(screen.getByText(/Month 4: 27 points/)).toBeInTheDocument();

  expect(screen.getByText(/Customer ID: 2/)).toBeInTheDocument();
  expect(screen.getByText(/Month 1: 0 points/)).toBeInTheDocument();
  expect(screen.getByText(/Month 2: 25 points/)).toBeInTheDocument();
});

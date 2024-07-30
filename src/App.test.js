import { render, screen } from '@testing-library/react';
import RewardPoints from './RewardPoints';

test('calculates reward points correctly for given transactions', () => {

  const mockTransactions = [
    { customerId: 1, customerName: "John Cena", transactionDate: "2023-09-12", amount: 170 },
    { customerId: 1, customerName: "John Cena", transactionDate: "2023-10-12", amount: 80 },
    { customerId: 2, customerName: "Chris Ronaldo", transactionDate: "2024-07-07", amount: 77 },
    { customerId: 3, customerName: "Virat Kohli", transactionDate: "2023-05-11", amount: 180 },
    { customerId: 3, customerName: "Virat Kohli", transactionDate: "2023-09-28", amount: 280 },
    { customerId: 4, customerName: "The Rock", transactionDate: "2024-06-04", amount: 110  },
    { customerId: 5, customerName: "M Hayden", transactionDate: "2024-04-03", amount: 25  }
  ]

  render(<Reward />);

  expect(screen.getByText(/Customer ID: 1/)).toBeInTheDocument();
  expect(screen.getByText(/Month 9: 190 points/)).toBeInTheDocument();
  expect(screen.getByText(/Month 10: 30 points/)).toBeInTheDocument();

  expect(screen.getByText(/Customer ID: 2/)).toBeInTheDocument();
  expect(screen.getByText(/Month 7: 27 points/)).toBeInTheDocument();

  expect(screen.getByText(/Customer ID: 3/)).toBeInTheDocument();
  expect(screen.getByText(/Month 5: 210 points/)).toBeInTheDocument();
  expect(screen.getByText(/Month 9: 410 points/)).toBeInTheDocument();

  expect(screen.getByText(/Customer ID: 4/)).toBeInTheDocument();
  expect(screen.getByText(/Month 6: 70 points/)).toBeInTheDocument();

  expect(screen.getByText(/Customer ID: 5/)).toBeInTheDocument();
  expect(screen.getByText(/Month 4: 0 points/)).toBeInTheDocument();
});

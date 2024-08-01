import { calculateRewardPoints, calculateTotalPoints } from './rewardCalculator';

const mockTransactions = [
        { transactionId : 1, customerId: 1, customerName: "John Cena", transactionDate: "2023-09-12", purchaseDate: "2023-09-12", product :"Protein Powder", amount: 170 },
        { transactionId : 2, customerId: 1, customerName: "John Cena", transactionDate: "2023-10-12", purchaseDate:"2023-10-12", product :"Cap", amount: 80 },
        { transactionId : 3, customerId: 2, customerName: "Chris Ronaldo", transactionDate: "2024-07-07", purchaseDate: "2024-07-07", product :"Football", amount: 77 }
];

test('calculateRewardPoints should calculate points correctly', () => {
  const result = calculateRewardPoints(mockTransactions);
  expect(result).toEqual({
    1: { name: 'John Cena', monthlyPoints: { 2023: { 9: 190, 10: 30 } } },
    2: { name: 'Chris Ronaldo', monthlyPoints: { 2024: { 7: 27 } } }
  });
});

test('calculateTotalPoints should calculate total points correctly', () => {
  const monthlyPoints = {
    1: { name: 'John Cena', monthlyPoints: { 2023: { 9: 190, 10: 30 } } },
    2: { name: 'Chris Ronaldo', monthlyPoints: { 2024: { 7: 27 } } }
  };
  const result = calculateTotalPoints(monthlyPoints);
  expect(result).toEqual({
    1: { name: 'John Cena', totalPoints: 220 },
    2: { name: 'Chris Ronaldo', totalPoints: 27 }
  });
});

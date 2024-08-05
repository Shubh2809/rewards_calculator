import { calculateRewardPoints, calculateTotalPoints, calculateRewardPointsForAmount } from './rewardCalculator';

const mockTransactions = [
        { transactionId : 1, customerId: 1, customerName: "John Cena", transactionDate: "2023-09-12", purchaseDate: "2023-09-12", product :"Protein Powder", amount: 170 },
        { transactionId : 2, customerId: 1, customerName: "John Cena", transactionDate: "2023-10-12", purchaseDate:"2023-10-12", product :"Cap", amount: 80 },
        { transactionId : 3, customerId: 2, customerName: "Chris Ronaldo", transactionDate: "2024-07-07", purchaseDate: "2024-07-07", product :"Football", amount: 77 }
];

describe('calculateRewardPointsForAmount', () => {
  test('should return 0 points for amounts $50 or less', () => {
    expect(calculateRewardPointsForAmount(50)).toBe(0);
    expect(calculateRewardPointsForAmount(0)).toBe(0);
  });

  test('should return correct points for amounts between $50 and $100', () => {
    expect(calculateRewardPointsForAmount(51)).toBe(1);
    expect(calculateRewardPointsForAmount(99)).toBe(49);
  });

  test('should return correct points for amounts over $100', () => {
    expect(calculateRewardPointsForAmount(101)).toBe(52);
    expect(calculateRewardPointsForAmount(150)).toBe(150);
  });

  test('should return 0 points for amounts less than $50', () => {
    expect(calculateRewardPointsForAmount(0)).toBe(0);
    expect(calculateRewardPointsForAmount(25)).toBe(0);
    expect(calculateRewardPointsForAmount(49)).toBe(0);
  });
});

test('calculateRewardPoints should calculate points correctly', () => {
  const result = calculateRewardPoints(mockTransactions);
  expect(result).toEqual({
    1: { name: 'John Cena', monthlyPoints: { 2023: { "September": 190, "October": 30 } } },
    2: { name: 'Chris Ronaldo', monthlyPoints: { 2024: { "July": 27 } } }
  });
});

test('calculateTotalPoints should calculate total points correctly', () => {
  const monthlyPoints = {
    1: { name: 'John Cena', monthlyPoints: { 2023: { "September": 190, "October": 30 } } },
    2: { name: 'Chris Ronaldo', monthlyPoints: { 2024: {"July": 27 } } }
  };
  const result = calculateTotalPoints(monthlyPoints);
  expect(result).toEqual({
    1: { name: 'John Cena', totalPoints: 220 },
    2: { name: 'Chris Ronaldo', totalPoints: 27 }
  });
});

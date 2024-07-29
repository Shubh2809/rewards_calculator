import './App.css';
import React, { useState, useEffect } from 'react';

const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100;
  }
  if (amount > 50) {
    points += (amount - 50) * 1;
  }
  return points;
};

const totalPoints = (transactions) => {
  const pointsByCustomer = {};

  transactions.forEach(transaction => {
    const { customerId, amount, date } = transaction;
    const points = calculatePoints(amount);
    const month = new Date(date).getMonth() + 1;

    if (!pointsByCustomer[customerId]) {
      pointsByCustomer[customerId] = {};
    }

    if (!pointsByCustomer[customerId][month]) {
      pointsByCustomer[customerId][month] = 0;
    }

    pointsByCustomer[customerId][month] += points;
  });

  return pointsByCustomer;
};

const RewardPoints = ({ transactions }) => {
  const [points, setPoints] = useState({});

  useEffect(() => {
    const aggregatedPoints = totalPoints(transactions);
    setPoints(aggregatedPoints);
  }, [transactions]);

  return (
    <div>
      {Object.keys(points).map(customerId => (
        <div key={customerId}>
          <h3>Customer ID: {customerId}</h3>
          {Object.keys(points[customerId]).map(month => (
            <p key={month}>
              Month {month}: {points[customerId][month]} points
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

const transactions = [
  { customerId: 1, amount: 120, date: "2023-01-15" },
  { customerId: 2, amount: 75, date: "2023-02-20" },
  { customerId: 1, amount: 200, date: "2023-04-05" },
  { customerId: 2, amount: 50, date: "2023-01-10" },
  { customerId: 1, amount: 77, date: "2023-04-15" },
];

function App() {
  return (
    <RewardPoints transactions={transactions} />
  );
}

export default App;

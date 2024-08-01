Customer Rewards Program (Frontend)
A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

Project Description
A customer receives : 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction. (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).   Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.

Tech Stack
Frontend: React JS
Testing: Jest & React Testing Library
Getting Started
Prerequisites
Node.js and npm installed
Setup
Clone the repository:
https://github.com/sushmita30jan/reward-calculator/

Install dependencies: npm install

Start the React application: npm start

Test Case Run npm run test

Usage
The frontend application will be available at http://localhost:3000.

Mock Data
The application uses mock data to simulate the rewards calculation. The mock data is defined in public/transactionsData.json.

Features
Calculate Reward points earned for each customer per month and total
Show data based on latest consecutive N month period of time
Transaction data can be with in the same year or spans different years
Data is grouped based on years if it spans different years
Multiple transactions within the month are sumed up together
Rounded up rewards
Test cases for all of the above scenarios are added


Running Appilcation Screenshots

File Structure
rewards-calculator/ ├── public/ ├── transactionsData.json ├── src/  │ ├── components/ │ │ ├── Table │ │ ├ ├── MonthlyRewards.js │ │ ├ ├── TotalRewards.js │ │ ├── Transactions.js │ │ ├ ├── Rewards.js │ │ ├ ├── Reward.css │ │  ├ ├── Rewards.test.js └── ... │ │ └── ... │ ├── services/ │ │ ├── fetchTransactionData.js │ │ └── ... │ ├── utils/ │ │ ├── calculateRewardPoints.js │ │ └── calculateTotalPoints.js  │ ├── App.css │ ├── App.js │ ├── App.test.js │ ├── index.js │ ├── setupTests.js │ └── ... ├── package.json └── ...

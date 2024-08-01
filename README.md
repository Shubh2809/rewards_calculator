# Customer Rewards Program (Frontend)

A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.  

## Project Description

A customer receives : 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction. 
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points). 
  
Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total. 


## Tech Stack

- **Frontend:** React JS
- **Testing:** Jest & React Testing Library

## Getting Started

### Prerequisites

- Node.js and npm installed

### Setup

1. **Clone the repository:**    
https://github.com/Shubh2809/rewards_calculator/

2. **Install dependencies:**
   npm install

3. **Start the React application:**
   npm start

4. **Test Case Run**
    npm run test

### Usage

The frontend application will be available at `http://localhost:3000`.

### Mock Data

The application uses mock data to simulate the rewards calculation. The mock data is defined in `public/transactionsData.json`.

## Features

- Calculate Reward points earned for each customer per month and total
- Show data based on latest consecutive N month period of time
  - Transaction data can be with in the same year or spans different years

* Data is grouped based on years if it spans different years
* Multiple transactions within the month are sumed up together
* Rounded up rewards
* Test cases for all of the above scenarios are added


### Running Appilcation Screenshots

#### Snapshot-1
![UI_Snapshot_1](https://github.com/user-attachments/assets/a0880ead-85bd-4440-b2be-0ea3594269bc)
#### Snapshot-2
![UI_Snapshot_2](https://github.com/user-attachments/assets/41f058cf-d5e5-43e3-a2f7-b5eab15fa459)

#### Snapshot of UI with Logger -1
![UI_Snapshot_logger-1](https://github.com/user-attachments/assets/bfd2c7e0-3357-4371-bbdb-828d8ce8c018)
#### Snapshot of UI with Logger -2
![UI_Snapshot_logger-2](https://github.com/user-attachments/assets/210edc36-eb34-445f-84f2-ec3989d30069)

### File Structure

reward-calculator/
├── public/
    ├── index.html
    ├── transactionsData.json
├── src/
│   ├── components/
│   │   ├── Table
│   │   ├    ├── MonthlyRewards.js
│   │   ├    ├── TotalRewards.js
│   │   ├    ├── Transactions.js
    │   │   ├── Rewards.test.js
    │   │   ├── Rewards.css
    │   │   ├── Rewards.js
│   │   └── ...
│   ├── services/
│   │   ├── fetchTransactionData.js
│   │   └── ...
│   ├── utils/
│   │   ├── rewardCalculator.js
│   │   └── rewardCalculator.test.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── setupTests.js
│   └── ...
├── package.json
└── ...
```
}


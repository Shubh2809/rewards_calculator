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
![UI_Snapshot_1](https://github.com/user-attachments/assets/9a8c5c2e-66e7-4858-b775-5e1abdcb0de9)
#### Snapshot-2
![UI_Snapshot_2](https://github.com/user-attachments/assets/055353ee-435a-424e-a014-ff5db42bd787)
#### Snapshot-3
![UI_Snapshot_3](https://github.com/user-attachments/assets/db9adbee-da50-4bef-94e9-871a26a5cf69)


#### Snapshot of UI with Logger -1
![UI_Snapshot_logger-1](https://github.com/user-attachments/assets/63b0834a-82a0-471e-9f64-041df192b47a)
#### Snapshot of UI with Logger -2
![UI_Snapshot_logger-2](https://github.com/user-attachments/assets/8a169f83-d90e-4e27-a294-c0e2f1868df8)

#### Snapshot of UI with Loading...
![UI_Snapshot_Loading](https://github.com/user-attachments/assets/30f927aa-dee0-44de-ab8e-43aab006f556)
#### Snapshot of UI with Error...
![UI_Snapshot_Error](https://github.com/user-attachments/assets/4980e355-19d1-45af-aa0a-76af3ef5679c)
#### Snapshot of UI with invalid amount
![UI_Snapshot-invalid_amount](https://github.com/user-attachments/assets/cf1223ad-6104-4ed9-a629-2e865b1098f9)
#### Snapshot of UI with invalid transaction date
![UI_Snapshot_invalid_transaction_date](https://github.com/user-attachments/assets/8f8ce6fc-9a46-43d3-acfd-a1b6d35aaaab)
#### Snapshot of UI with invalid purchase date.
![UI_Snapshot_invalid-purchase-date](https://github.com/user-attachments/assets/f327b048-7683-433c-ac8c-d11defacbe5c)


### File Structure

reward-calculator/
├── public/
    ├── index.html
    ├── transactionsData.json
├── src/
│   ├── /__test__/
│   │   ├── monthlyRewards.test.js
│   │   ├── transactions.test.js
│   │   ├── rewardCalculator.test.js
│   │   ├── pastThreeMonthsTransactions.test.js
│   │   ├── rewards.test.js
│   ├── components/
│   │   ├── tables
│   │   ├    ├── pastThreeMonthsTransactions.js
│   │   ├    ├── monthlyRewards.js
│   │   ├    ├── totalRewards.js
│   │   ├    ├── transactions.js
│   ├── screens
│   │   ├── rewards.css
│   │   ├── rewards.js
│   │   └── ...
│   ├── services/
│   │   ├── rewardApiService.js
│   │   └── ...
│   ├── utils/
│   │   ├── constants.js
│   │   ├── rewardCalculator.js
│   │   └── getPastThreeMonths.js
│   ├── App.css
│   ├── App.js
│   ├── index.js
│   ├── setupTests.js
│   └── ...
├── package.json
└── ...
```
}


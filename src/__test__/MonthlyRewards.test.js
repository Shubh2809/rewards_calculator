import React from 'react';
import { render, screen } from '@testing-library/react';
import MonthlyRewards from '../components/tables/MonthlyRewards';
import { CUSTOMER_ID, NAME, MONTH, YEAR, REWARD_POINTS_HEADING } from '../utils/constants';

const mockMonthlyPoints = {
  1: {
    name: 'John Cena',
    monthlyPoints: {
      2023: {
        October: 30,
        September: 190
      },
    }
  },
  2: {
    name: 'Chris Ronaldo',
    monthlyPoints: {
      2024: {
        July: 27
      }
    }
  }
};

describe('MonthlyRewards', () => {
  test('should render sorted monthly rewards table by year and month', async () => {

    render(<MonthlyRewards monthlyPoints={mockMonthlyPoints} />);

    const headers = screen.getAllByRole('columnheader');
    expect(headers[0]).toHaveTextContent(CUSTOMER_ID);
    expect(headers[1]).toHaveTextContent(NAME);
    expect(headers[2]).toHaveTextContent(MONTH);
    expect(headers[3]).toHaveTextContent(YEAR);
    expect(headers[4]).toHaveTextContent(REWARD_POINTS_HEADING);

    const rows = screen.getAllByRole('row');

    // Skip the header row
    const dataRows = rows.slice(1);

    const expectedOrder = [
      { customerId: '1', name: 'John Cena', month: 'September', year: 2023, points: 190 },
      { customerId: '1', name: 'John Cena', month: 'October', year: 2023, points: 30 },
      { customerId: '2', name: 'Chris Ronaldo', month: 'July', year: 2024, points: 27 }
    ];

    expectedOrder.forEach((data, index) => {
      const cells = dataRows[index].querySelectorAll('td');
      expect(cells[0].textContent).toBe(data.customerId);
      expect(cells[1].textContent).toBe(data.name);
      expect(cells[2].textContent).toBe(data.month);
      expect(cells[3].textContent).toBe(data.year.toString());
      expect(cells[4].textContent).toBe(data.points.toString());
    });
  });
});

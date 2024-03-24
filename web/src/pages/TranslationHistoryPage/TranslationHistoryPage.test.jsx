import { render, screen } from '@redwoodjs/testing/web';
import { MockedProvider } from '@apollo/client/testing';
import { QUERY as TranslationHistoriesQuery } from 'src/components/TranslationHistoriesCell';

import TranslationHistoryPage from './TranslationHistoryPage';

const mocks = [
  {
    request: {
      query: TranslationHistoriesQuery,
    },
    result: {
      data: {
        translationHistories: [
          { id: 1, originalCode: 'print("Hello, world!")', translatedCode: 'console.log("Hello, world!")', originalLanguage: 'Python', translationLanguage: 'JavaScript', createdAt: '2021-01-01T12:00:00.000Z', updatedAt: '2021-01-01T12:00:00.000Z', status: 'COMPLETED' },
          // Add more mock records as needed
        ],
      },
    },
  },
];

describe('TranslationHistoryPage', () => {
  it('renders successfully', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TranslationHistoryPage />
      </MockedProvider>
    );

    expect(() => {
      render(<TranslationHistoryPage />)
    }).not.toThrow();
  });

  it('displays history records correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TranslationHistoryPage />
      </MockedProvider>
    );

    // Check if the mock data is displayed
    expect(await screen.findByText('print("Hello, world!")')).toBeInTheDocument();
    expect(screen.getByText('console.log("Hello, world!")')).toBeInTheDocument();
    // Add more assertions as needed
  });

  // Add more tests here for pagination or scrolling
});

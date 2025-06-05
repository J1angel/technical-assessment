import { render, screen, waitFor } from '@testing-library/react';
import MetricsChart from '@/components/MetricsChart';
import { fetchMetrics } from '@/api/mock-data';

// Mock the fetchMetrics function
jest.mock('@/api/mock-data', () => ({
  fetchMetrics: jest.fn(),
}));

// Mock Chart.js
jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="metrics-chart">Chart Component</div>,
}));

describe('MetricsChart', () => {
  const mockMetricsData = {
    data: [
      {
        timestamp: '2024-02-25T10:00:00Z',
        value: 85,
        category: 'CPU',
      },
      {
        timestamp: '2024-02-25T09:45:00Z',
        value: 75,
        category: 'CPU',
      },
      {
        timestamp: '2024-02-25T09:30:00Z',
        value: 90,
        category: 'CPU',
      },
    ],
  };

  beforeEach(() => {
    (fetchMetrics as jest.Mock).mockReset();
  });

  it('renders chart when data is loaded', async () => {
    (fetchMetrics as jest.Mock).mockResolvedValue(mockMetricsData);

    render(<MetricsChart />);

    await waitFor(() => {
      expect(screen.getByTestId('metrics-chart')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    (fetchMetrics as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(<MetricsChart />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load metrics')).toBeInTheDocument();
    });
  });
}); 
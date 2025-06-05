import { render, screen, waitFor } from '@testing-library/react';
import DataGrid from '@/components/DataGrid';
import { fetchMetrics } from '@/api/mock-data';
import { format } from 'date-fns';

// Mock the API
jest.mock('@/api/mock-data', () => ({
  fetchMetrics: jest.fn(),
}));

describe('DataGrid', () => {
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
        category: 'Memory',
      },
      {
        timestamp: '2024-02-25T09:30:00Z',
        value: 90,
        category: 'Network',
      },
    ],
  };

  beforeEach(() => {
    (fetchMetrics as jest.Mock).mockReset();
  });

  it('renders loading state initially', () => {
    (fetchMetrics as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<DataGrid />);
    expect(screen.queryByText('CPU')).not.toBeInTheDocument();
  });

  it('renders table with correct headers', async () => {
    (fetchMetrics as jest.Mock).mockResolvedValue(mockMetricsData);

    render(<DataGrid />);

    await waitFor(() => {
      expect(screen.getByText('Timestamp')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Value')).toBeInTheDocument();
    });
  });

  it('renders metrics data in table rows', async () => {
    (fetchMetrics as jest.Mock).mockResolvedValue(mockMetricsData);

    render(<DataGrid />);

    await waitFor(() => {
      expect(screen.getByText('CPU')).toBeInTheDocument();
      expect(screen.getByText('Memory')).toBeInTheDocument();
      expect(screen.getByText('Network')).toBeInTheDocument();
      expect(screen.getByText('85')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
      expect(screen.getByText('90')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    (fetchMetrics as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(<DataGrid />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load metrics')).toBeInTheDocument();
    });
  });

  it('formats timestamps correctly', async () => {
    (fetchMetrics as jest.Mock).mockResolvedValue(mockMetricsData);
    render(<DataGrid />);

    await waitFor(() => {
      const formattedDate = format(new Date('2024-02-25T10:00:00Z'), 'PPpp');
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });
  });

  it('renders in a styled container', async () => {
    (fetchMetrics as jest.Mock).mockResolvedValue(mockMetricsData);
    render(<DataGrid />);

    await waitFor(() => {
      const table = screen.getByRole('table');
      const container = table.closest('div')?.parentElement;
      expect(container).not.toBeNull();
      expect(container).toHaveClass('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-sm', 'overflow-hidden');
    });
  });
}); 
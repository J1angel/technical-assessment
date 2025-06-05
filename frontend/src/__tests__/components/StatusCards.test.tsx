import { render, screen, waitFor } from '@testing-library/react';
import StatusCards from '@/components/StatusCards';
import { fetchStatus } from '@/api/mock-data';

// Mock the fetchStatus function
jest.mock('@/api/mock-data', () => ({
  fetchStatus: jest.fn(),
}));

describe('StatusCards', () => {
  const mockStatusUpdates = {
    updates: [
      {
        id: '1',
        status: 'success',
        message: 'System running normally',
        timestamp: '2024-02-25T10:00:00Z',
      },
      {
        id: '2',
        status: 'warning',
        message: 'High CPU usage detected',
        timestamp: '2024-02-25T09:45:00Z',
      },
      {
        id: '3',
        status: 'error',
        message: 'Database connection failed',
        timestamp: '2024-02-25T09:30:00Z',
      },
    ],
  };

  beforeEach(() => {
    (fetchStatus as jest.Mock).mockReset();
  });

  it('renders status cards with correct icons and messages', async () => {
    (fetchStatus as jest.Mock).mockResolvedValue(mockStatusUpdates);

    render(<StatusCards />);

    await waitFor(() => {
      expect(screen.getByText('System running normally')).toBeInTheDocument();
      expect(screen.getByText('High CPU usage detected')).toBeInTheDocument();
      expect(screen.getByText('Database connection failed')).toBeInTheDocument();
    });

    // Check for correct icons
    const successIcon = document.querySelector('[class*="text-green-500"]');
    const warningIcon = document.querySelector('[class*="text-yellow-500"]');
    const errorIcon = document.querySelector('[class*="text-red-500"]');

    expect(successIcon).toBeInTheDocument();
    expect(warningIcon).toBeInTheDocument();
    expect(errorIcon).toBeInTheDocument();
  });

  it('handles error state', async () => {
    (fetchStatus as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(<StatusCards />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load status updates')).toBeInTheDocument();
    });
  });
}); 
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Providers, useTheme } from '@/app/providers';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Test component that uses the theme context
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('Providers', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockReset();
    mockLocalStorage.setItem.mockReset();
  });

  it('provides light theme by default', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });

  it('loads theme from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');

    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });

  it('toggles theme when triggered', () => {
    mockLocalStorage.getItem.mockReturnValue('light');

    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    const button = screen.getByText('Toggle Theme');
    
    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');

    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('applies dark mode class to document', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');

    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark mode class when switching to light mode', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');

    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    const button = screen.getByText('Toggle Theme');
    
    act(() => {
      fireEvent.click(button);
    });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
}); 
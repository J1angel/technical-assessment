import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '@/components/ThemeToggle';
import { Providers } from '@/app/providers';

describe('ThemeToggle', () => {
  it('renders moon icon by default (light theme)', () => {
    render(
      <Providers>
        <ThemeToggle />
      </Providers>
    );
    
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('toggles between sun and moon icons', () => {
    render(
      <Providers>
        <ThemeToggle />
      </Providers>
    );
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    // Initial state - light theme (moon icon)
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    
    // Click to toggle to dark theme
    fireEvent.click(button);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    
    // Click to toggle back to light theme
    fireEvent.click(button);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });
}); 
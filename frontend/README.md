# Metrics Dashboard

A modern, responsive dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📊 Real-time metrics visualization
- 🌓 Dark/light mode support
- 📱 Responsive design
- ⚡ Server and Client Components
- 🔍 Type-safe development
- 🎨 Modern UI with Tailwind CSS
- 📈 Interactive charts with Chart.js
- ⚠️ Comprehensive error handling
- 🔄 Loading state management

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js & react-chartjs-2
- **Icons**: Heroicons
- **Date Formatting**: date-fns
- **Testing**: Jest & React Testing Library
- **Linting**: ESLint & Prettier

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── app/                # Next.js 14 app directory
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx      # Dashboard page
│   │   ├── providers.tsx # Theme provider
│   │   └── globals.css   # Global styles
│   ├── components/        # React components
│   │   ├── MetricsChart.tsx
│   │   ├── StatusCards.tsx
│   │   ├── DataGrid.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Loading.tsx
│   └── api/              # Mock API
│       └── mock-data.ts
├── public/              # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## Components

### MetricsChart
- Displays time-series data using Chart.js
- Supports real-time updates
- Responsive design

### StatusCards
- Shows system status updates
- Visual indicators for different states
- Real-time status changes

### DataGrid
- Tabular view of metrics data
- Sortable columns
- Pagination support

### ThemeToggle
- Switches between dark and light modes
- Persists theme preference
- Smooth transition effects

## API Integration

The dashboard uses a mock API (`src/api/mock-data.ts`) that simulates:
- Metrics data fetching
- Status updates
- Error scenarios

### API Endpoints

```typescript
fetchMetrics(page?: number, limit?: number): Promise<MetricsResponse>
fetchStatus(page?: number, limit?: number): Promise<StatusResponse>
```

## Styling

### Theme Configuration

The project uses a custom theme configuration with CSS variables for:
- Colors
- Typography
- Spacing
- Dark mode variants

### Tailwind CSS

Custom configuration includes:
- Extended color palette
- Custom components
- Responsive breakpoints
- Dark mode utilities

## Testing

Run the test suite:

```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Test Structure
- Component tests
- Integration tests
- Mock API tests
- Theme tests

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Run Prettier
npm run test     # Run tests
```

## Performance Optimization

- Server Components for reduced client-side JavaScript
- Optimized images and assets
- Code splitting
- Cached API responses
- Minimized re-renders

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Chart.js for the charting library
- All other open-source contributors

## Contact

For any questions or feedback, please open an issue in the repository.

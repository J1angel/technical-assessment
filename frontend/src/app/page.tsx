import { Suspense } from 'react';
import MetricsChart from '@/components/MetricsChart';
import StatusCards from '@/components/StatusCards';
import DataGrid from '@/components/DataGrid';
import Loading from '@/components/Loading';
import ThemeToggle from '@/components/ThemeToggle';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Metrics Dashboard
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          <Suspense fallback={<Loading />}>
            <StatusCards />
          </Suspense>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Suspense fallback={<Loading />}>
              <MetricsChart />
            </Suspense>

            <Suspense fallback={<Loading />}>
              <DataGrid />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
} 
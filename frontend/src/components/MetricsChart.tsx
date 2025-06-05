'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { fetchMetrics } from '@/api/mock-data';
import type { MetricDataPoint } from '@/api/mock-data';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'System Metrics Over Time',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function MetricsChart() {
  const [metrics, setMetrics] = useState<MetricDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const response = await fetchMetrics();
        setMetrics(response.data);
      } catch (err) {
        setError('Failed to load metrics');
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  if (loading) return null; // Using Suspense fallback
  if (error) return <div className="text-red-500">{error}</div>;

  const chartData: ChartData<'line'> = {
    labels: metrics.map((metric) =>
      format(new Date(metric.timestamp), 'p')
    ),
    datasets: [
      {
        label: 'System Metrics',
        data: metrics.map((metric) => metric.value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <Line options={options} data={chartData} />
    </div>
  );
} 
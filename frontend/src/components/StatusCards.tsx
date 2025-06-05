'use client';

import { useEffect, useState } from 'react';
import { fetchStatus } from '@/api/mock-data';
import type { StatusUpdate } from '@/api/mock-data';
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export default function StatusCards() {
  const [statuses, setStatuses] = useState<StatusUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStatuses = async () => {
      try {
        const response = await fetchStatus();
        setStatuses(response.updates);
      } catch (err) {
        setError('Failed to load status updates');
      } finally {
        setLoading(false);
      }
    };

    loadStatuses();
  }, []);

  if (loading) return null; // Using Suspense fallback
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statuses.map((status) => (
        <div
          key={status.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {status.status === 'success' && (
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              )}
              {status.status === 'warning' && (
                <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />
              )}
              {status.status === 'error' && (
                <XCircleIcon className="h-6 w-6 text-red-500" />
              )}
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {status.message}
              </h3>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {format(new Date(status.timestamp), 'PPpp')}
          </p>
        </div>
      ))}
    </div>
  );
} 
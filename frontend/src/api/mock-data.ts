export interface MetricDataPoint {
  timestamp: string;
  value: number;
  category: string;
}

export interface StatusUpdate {
  id: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

export interface MetricsResponse {
  data: MetricDataPoint[];
  totalCount: number;
}

export interface StatusResponse {
  updates: StatusUpdate[];
  totalCount: number;
}

// Mock data generation helpers
const generateRandomMetrics = (count: number): MetricDataPoint[] => {
  return Array.from({ length: count }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    value: Math.floor(Math.random() * 100),
    category: ['CPU', 'Memory', 'Network', 'Disk'][Math.floor(Math.random() * 4)]
  }));
};

const generateRandomStatuses = (count: number): StatusUpdate[] => {
  const messages = [
    'System running normally',
    'High CPU usage detected',
    'Memory usage above threshold',
    'Network latency increased',
    'Disk space running low'
  ];
  const statuses: ('success' | 'warning' | 'error')[] = ['success', 'warning', 'error'];

  return Array.from({ length: count }, (_, i) => ({
    id: `status-${i}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    timestamp: new Date(Date.now() - i * 1800000).toISOString()
  }));
};

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoints
export async function fetchMetrics(
  page: number = 1,
  limit: number = 10
): Promise<MetricsResponse> {
  await delay(500); // Simulate network latency
  const start = (page - 1) * limit;
  const data = generateRandomMetrics(100);
  
  return {
    data: data.slice(start, start + limit),
    totalCount: data.length
  };
}

export async function fetchStatus(
  page: number = 1,
  limit: number = 5
): Promise<StatusResponse> {
  await delay(300); // Simulate network latency
  const start = (page - 1) * limit;
  const updates = generateRandomStatuses(20);
  
  return {
    updates: updates.slice(start, start + limit),
    totalCount: updates.length
  };
} 
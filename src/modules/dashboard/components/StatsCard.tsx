import type { StatsCardData } from '../model/types';

interface StatsCardProps {
  data: StatsCardData;
}

export function StatsCard({ data }: StatsCardProps) {
  const { title, value, change } = data;
  const isPositive = change && change > 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {change !== undefined && (
        <p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}%
        </p>
      )}
    </div>
  );
}

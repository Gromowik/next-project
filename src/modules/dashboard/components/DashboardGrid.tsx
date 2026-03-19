import { StatsCard } from './StatsCard';
import type { StatsCardData } from '../model/types';

interface DashboardGridProps {
  stats: StatsCardData[];
}

export function DashboardGrid({ stats }: DashboardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} data={stat} />
      ))}
    </div>
  );
}

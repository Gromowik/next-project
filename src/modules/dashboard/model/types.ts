export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

export interface StatsCardData {
  title: string;
  value: string | number;
  change?: number;
  icon?: string;
}

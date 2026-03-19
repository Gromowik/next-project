/**
 * Конфигурация приложения
 * @module core/config
 */

export const appConfig = {
  name: 'Next Learning App',
  version: '1.0.0',
  description: 'Масштабируемое приложение на Next.js',
  
  // API endpoints
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 30000,
  },
  
  // Feature flags
  features: {
    auth: true,
    dashboard: true,
    userManagement: true,
  },
  
  // Pagination defaults
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
} as const;

export type AppConfig = typeof appConfig;

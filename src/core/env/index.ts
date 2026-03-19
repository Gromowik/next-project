/**
 * Валидация переменных окружения
 */

interface EnvVars {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_API_URL?: string;
  DATABASE_URL?: string;
  JWT_SECRET?: string;
}

function validateEnv(): EnvVars {
  return {
    NODE_ENV: (process.env.NODE_ENV as EnvVars['NODE_ENV']) || 'development',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  };
}

export const env = validateEnv();

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

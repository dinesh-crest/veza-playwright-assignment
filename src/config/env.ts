import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const required = (name: string): string => {
  const value: string | undefined = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}.`);
  }
  return value;
};

export interface AppEnv {
  readonly baseURL: string;
  readonly standardUser: {
    readonly username: string;
    readonly password: string;
  };
}

export const env: AppEnv = {
  baseURL: required('BASE_URL'),
  standardUser: {
    username: required('STANDARD_USERNAME'),
    password: required('STANDARD_PASSWORD'),
  },
};

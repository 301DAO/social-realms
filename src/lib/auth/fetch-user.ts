import type { User } from '@prisma/client';
import axios from 'axios';

type AuthResponse = {
  authenticated: boolean;
  message: string;
  user: User | null;
};

export const fetchUser = async (): Promise<AuthResponse> => {
  try {
    const { data, status, statusText } = await axios.post('/api/auth');
    return data;
  } catch (error) {
    console.log(
      `encountered error while fetching user info: `,
      error instanceof Error ? error.message : error
    );

    if (axios.isAxiosError(error)) {
      // TODO: add custom logging
      return (
        error.response?.data ?? {
          authenticated: false,
          message: '',
          user: null,
        }
      );
    }
  }
  return { authenticated: false, message: '', user: null };
};

import axios from 'axios';

export const favorite = async ({ address, hash }: { address: string; hash: string }) => {
  try {
    const response = await axios.post(`/api/favorite`, { address, hash });
    return response.data;
  } catch (error) {
    console.error(
      `error in lib/mutations/favorite-transaction.ts: `,
      error instanceof Error ? error.message : error
    );
  }
  return {
    success: false,
    message: 'could not favorite transaction',
  };
};

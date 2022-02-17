import axios from 'axios';

export const unfollow = async ({
  address,
  addressToUnfollow,
}: {
  address: string;
  addressToUnfollow: string;
}) => {
  try {
    const response = await axios.post(`/api/unfollow`, { address, addressToUnfollow });
    return response.data;
  } catch (error: unknown) {
    console.error(
      `error in lib/mutations/unfollow-address.ts: `,
      error instanceof Error ? error.message : error
    );
  }
  return {
    success: false,
    message: 'could not unfollow address',
  };
};

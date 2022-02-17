import axios from 'axios';

export const follow = async ({
  address,
  addressToFollow,
}: {
  address: string;
  addressToFollow: string;
}) => {
  try {
    const response = await axios.post(`/api/follow`, { address, addressToFollow });
    return response.data;
  } catch (error: unknown) {
    console.error(
      `error in lib/mutations/follow-address.ts: `,
      error instanceof Error ? error.message : error
    );
  }
  return {
    success: false,
    message: 'could not follow address',
  };
};

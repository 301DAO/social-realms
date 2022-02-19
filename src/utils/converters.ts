import { utils } from 'ethers';
import type { BigNumber } from 'ethers';

export function gweify(gweiHex: BigNumber): string {
  const gweified = utils.formatUnits(gweiHex, 'gwei');
  return Number(gweified).toFixed(2);
}

export function parseBigNumberToString({
  decimal,
  bigNumber,
}: {
  decimal: number;
  bigNumber: string;
}) {
  return utils.formatUnits(bigNumber, decimal);
}

export function parseUnitByDecimal({ decimal, bigNumber }: { decimal: number; bigNumber: number }) {
  switch (decimal) {
    case 6:
      return utils.parseUnits(bigNumber.toFixed(decimal).toString(), 'mwei');
    case 8:
      // no native eth unit handles 8 decimal
      return utils.parseUnits((bigNumber * 10).toFixed(decimal).toString(), 'gwei');
    case 18:
      return utils.parseEther(bigNumber.toFixed(18).toString());
  }
}

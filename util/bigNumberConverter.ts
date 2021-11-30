import { parseUnits, formatUnits } from '@ethersproject/units';


export function parseBigNumberToString(decimal: any, bigNumber: any) {
  return formatUnits(bigNumber, decimal);
}

export function parseUnitByDecimal(decimal: any, number: any) {
  switch(decimal) {
      case 6:
          return parseUnits(number.toFixed(decimal).toString(), 'mwei');
      case 8:
          // no native eth unit handles 8 decimal
          return parseUnits((number * 10).toFixed(decimal).toString(), 'gwei');
      case 18:
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'parseEther'.
          return parseEther(number.toFixed(18).toString());
  }
}
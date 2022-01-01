import { formatUnits, parseEther, parseUnits } from '@ethersproject/units'

export function parseBigNumberToString(decimal: number, bigNumber: string) {
  return formatUnits(bigNumber, decimal)
}

export function parseUnitByDecimal(decimal: number, number: number) {
  switch (decimal) {
    case 6:
      return parseUnits(number.toFixed(decimal).toString(), 'mwei')
    case 8:
      // no native eth unit handles 8 decimal
      return parseUnits((number * 10).toFixed(decimal).toString(), 'gwei')
    case 18:
      return parseEther(number.toFixed(18).toString())
  }
}

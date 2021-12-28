import { parseBigNumberToString } from 'src/utils/bigNumberConverter'
import * as React from 'react'

type useBalanceProps = {
  account: string | null | undefined
  library: any
  chainId: number | undefined
}

export const useBalance = ({ account, library, chainId }: useBalanceProps) => {
  const [ balance, setBalance ] = React.useState<string | null | undefined>(null)
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false
      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [ account, library, chainId ])
  return balance === null
    ? 'Error'
    : balance
    ? parseBigNumberToString(18, balance).substr(0, 4)
    : ''
}

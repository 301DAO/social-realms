// export const grabLogEvents = (txs: any) => txs.map((tx: any) => tx.log_events)
// export const filterLogEvents = (logEvents: any) =>
//   logEvents.filter((log: any) => log?.decoded?.name === 'Swap')

// export const parseTxs = (txs: any) => {
//   const logEvents = grabLogEvents(txs)
//   const filteredLogEvents = filterLogEvents(logEvents)

//   return logEvents.map((log: any) => {
//     const timestamp = log.block_signed_at
//     const tx_hash = log.tx_hash
//     const ticket_symbol = log.sender_contract_ticker_symbol
//     const coin_name = log.decoded.name
//     const from = log.decoded.params[0].value
//     const to = log.decoded.params.find(
//       (p: any) => p.name === 'to' || p.name === 'recipient'
//     ).value
//     const amount_in = Number(
//       log.decoded.params[1].value + log.decoded.params[2].value
//     )
//     const amount_out = Number(
//       log.decoded.params[3].value + log.decoded.params[4].value
//     )
//     return {
//       timestamp,
//       tx_hash,
//       ticket_symbol,
//       coin_name,
//       from,
//       to,
//       amount_in,
//       amount_out,
//     }
//   })
// }

// export const filterer = (tx: any) => {
//   return {
//     hash: tx.tx_hash,
//     from: tx.from_address,
//     to: tx.to_address,
//     value: tx.value_quoted,
//     gas: tx.gas_quoted,
//   }
// }
import dayjs from 'dayjs'

function containsRawLogTopics(transaction: any) {
  if (
    typeof transaction['log_events'].slice(-1)[0] !== 'undefined' &&
    transaction['log_events'].slice(-1)[0].hasOwnProperty('decoded') &&
    transaction['log_events'].slice(-1)[0]['decoded'] !== null
  ) {
    return {
      hash: transaction['tx_hash'],
      successful: transaction['successful'],
      token: transaction['log_events'].slice(-1)[0]['sender_name'],
      type: transaction['log_events'].slice(-1)[0]['decoded']['name'],
      decoded: transaction['log_events'].slice(-1)[0]['decoded']['params'],
      timestamp: dayjs(transaction['block_signed_at']).format(
        'YYYY-MM-DD HH:mm:ss'
      ),
    }
  }
}

export function filterTransactions(transactions: any[]) {
  return transactions
    .filter(tx => containsRawLogTopics(tx) != undefined)
    .map(tx => containsRawLogTopics(tx))
}

import dayjs from 'dayjs'

// A transaction returns multiple log events, but we're only interested in the last one
// and whether transaction was successful
const getLastEvent = (transactions: any[]) => {
  return transactions.map(transaction => {
    const log_event = transaction.log_events[transaction.log_events.length - 1]
    log_event['successful'] = transaction.successful
    return log_event
  })
}

export interface feedTransaction {
  timestamp: string
  block: number
  hash: string
  successful: boolean
  project: string
  token: string
  type: string
  params: any
}

const buildTransactionInfo = (transaction: any): feedTransaction => {
  const {
    successful,
    block_signed_at,
    block_height,
    tx_hash,
    sender_name,
    sender_contract_ticker_symbol,
    decoded: { name, params },
  } = transaction
  return {
    timestamp: dayjs(block_signed_at).format('YYYY-MM-DD HH:mm:ss'),
    block: block_height,
    hash: tx_hash,
    successful,
    project: sender_name,
    token: sender_contract_ticker_symbol,
    type: name,
    params,
  }
}

export function filterTransactions(transactions: any): feedTransaction[] {
  return getLastEvent(transactions).map(transaction => {
    return buildTransactionInfo(transaction)
  })
}
import type { CeramicClient } from '@ceramicnetwork/http-client'
declare const window: any
declare global {
  interface Window {
    ceramic: CeramicClient
    ethereum: any
    test: 123
  }
}

export {}

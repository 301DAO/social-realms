import { Client } from '@textile/hub'
import * as React from 'react'
import { setup } from 'src/textile/textileStore'
interface ITextileContext {
  client: Client
  setClient: (client: Client) => void
}

export const TextileContext = React.createContext<ITextileContext | null>(null)
// export const TextileContext = React.createContext<ITextileContext>({
//   client: {} as Client,
//   setClient: () => {},
// })

export const useTextileContext = (): ITextileContext => {
  const context = React.useContext(TextileContext)
  if (context === null) {
    throw new Error('useTextileContext must be used within a TextileProvider')
  }
  return context
}

export const TextileProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [client, setClient] = React.useState<Client>({} as Client)
  const storedIdentity = localStorage.getItem('identity')

  const memoizedSetupClient = React.useCallback(async () => {
    return setup().then(setClient)
  }, [storedIdentity])

  React.useEffect(() => {
    memoizedSetupClient()
  }, [])

  const value = React.useMemo(
    () => ({ client, setClient }),
    [client, setClient]
  )
  return (
    <TextileContext.Provider value={value}>{children}</TextileContext.Provider>
  )
}

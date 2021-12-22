import { Client } from '@textile/hub'
import { useWeb3React } from '@web3-react/core'
import * as React from 'react'
import { setup } from 'src/textile/textileStore'
interface ITextileContext {
  client: Client
  setClient: (client: Client) => void
}


type TextileProvider = [Client, React.Dispatch<React.SetStateAction<Client>>]

export const TextileContext = React.createContext<ITextileContext>(undefined!)
// export const TextileContext = React.createContext<ITextileContext>({
//   client: {} as Client,
//   setClient: () => {},
// })

export const useTextileContext = () => React.useContext(TextileContext)

interface Props {
  children: React.ReactNode
}

export const TextileProvider = ({ children }: Props) => {
  const [ client, setClient ] = React.useState<Client>({} as Client)
  const storedIdentity = localStorage.getItem('identity')

  const { active } = useWeb3React()

  const setupClient = async () => setClient(await setup())
  const memoizedSetupClient = React.useCallback(
    () => setupClient(),
    [ storedIdentity, setClient ]
  )

  React.useEffect(() => {
    memoizedSetupClient()
  }, [])

  return (
    <TextileContext.Provider value={{ client, setClient }}>
      {children}
    </TextileContext.Provider>
  )
}

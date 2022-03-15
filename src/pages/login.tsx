import * as React from 'react';
import { useRouter } from 'next/router';
import { useConnect, useAccount } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useUser } from '@/hooks';
import { timeFromNow } from '@/utils';
import { WalletIcon } from '@/components/icons';
import { SignInWithEthereum, ConnectWalletModal } from '@/components';
import type { NextPage } from 'next';
import type { User } from '@prisma/client';
import axios from 'axios';
import type { Connector } from 'wagmi';

type AuthFetcher = { success: boolean; message: string; user?: User };

type AuthState = {
  status: string;
  errorMessage?: string;
};

enum status {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR',
}

type AuthStatus =
  | { type: 'ERROR'; errorMessage: string }
  | { type: 'DISCONNECTED' }
  | { type: 'CONNECTING' }
  | { type: 'CONNECTED' };

const authReducer = (state: AuthState, status: AuthStatus) => {
  switch (status.type) {
    case 'CONNECTING':
      return { status: status.type };
    case 'CONNECTED':
      return { status: status.type };
    case 'ERROR':
      return { status: status.type, errorMessage: status.errorMessage };
    default:
      return state;
  }
};

const initialAuthState: AuthState = { status: 'DISCONNECTED', errorMessage: '' };

const Signin: NextPage = () => {
  const router = useRouter();

  const {
    authenticated,
    refetch,
    status: authFetchStatus,
    isLoading,
  } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const [state, dispatch] = React.useReducer(authReducer, initialAuthState);
  const [modalOpen, setModalOpen] = React.useState(false);
  const toggleModal = () => setModalOpen(_ => !_);

  const [, disconnect] = useAccount();
  const [
    {
      data: { connectors, connected },
    },
    connect,
  ] = useConnect();

  async function handleWeb3Auth(connector: Connector) {
    toggleModal();
    dispatch({ type: status.CONNECTING });

    try {
      if (connected) disconnect();
      const connection = await connect(connector);

      if (!connection) throw new Error('Connection failed');
      if (connection?.error) throw new Error(connection.error.message);

      const address = await connector.getAccount();
      const chainId = await connector.getChainId();
      const signer = await connector.getSigner();

      if (!address || !chainId || !signer) {
        throw new Error('Please connect to a wallet and make sure you are on Ethereum mainnet.');
      }

      const { data: signIn } = await axios.post<AuthFetcher>('/api/auth/login', { address });
      if (!signIn.success) throw new Error(signIn.message);
      const { user } = signIn;

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: user?.nonce as string,
        issuedAt: new Date().toISOString(),
        expirationTime: timeFromNow({ unit: 'MINUTES', value: 5 }),
      });
      const signature = await signer.signMessage(message.prepareMessage());

      const { data: auth } = await axios.post<AuthFetcher>('/api/auth/verify', {
        address,
        signature,
        message,
      });
      if (auth.success) {
        dispatch({ type: status.CONNECTED });
        refetch();
        return router.push('/');
      } else {
        throw new Error(auth.message);
      }
    } catch (error: any) {
      console.error(
        'An unexpected error occurred ',
        error instanceof Error ? error.message : error
      );
      dispatch({
        type: status.ERROR,
        errorMessage:
          error instanceof Error || error['code'] // error["code"] is for metamask
            ? error.message
            : 'Encountered an error while signing in with Ethereum. Refresh the page to try again. Make sure you are on the Ethereum mainnet.',
      });
      return false;
    }
  }

  const text =
    state.status === status.ERROR ? `${state.errorMessage}` : 'Login to access all features';

  return (
    <main className="mx-auto mt-16 flex w-full max-w-2xl flex-col items-center justify-center gap-x-8 space-y-10 md:mt-32">
      <div>
        <p className="mx-10 text-[1.65rem] font-bold">{text}</p>
      </div>
      <section className="w-full max-w-sm rounded-lg bg-transparent p-4 sm:p-6 lg:p-4">
        <SignInWithEthereum
          onButtonClick={toggleModal}
          disabled={authenticated}
          status={state.status}
        />

        <ConnectWalletModal open={modalOpen} onModalClose={toggleModal}>
          {connectors.map(connector => (
            <Web3ConnectButton
              key={connector.name}
              connector={connector}
              onButtonClick={async () => await handleWeb3Auth(connector)}
            />
          ))}
        </ConnectWalletModal>
      </section>
    </main>
  );
};

const Web3ConnectButton = ({
  connector,
  onButtonClick,
}: {
  connector: Connector;
  onButtonClick: (connector: Connector) => Promise<boolean>;
}) => {
  if (typeof window === 'undefined' || connector.name.toLowerCase() === 'injected') return null;
  return (
    <button
      disabled={!connector.ready}
      key={connector.name}
      className="flex w-full flex-col items-center justify-end gap-y-2 pt-3 pb-4 font-normal tracking-wide antialiased hover:cursor-pointer hover:bg-[rgb(31,32,53)] hover:text-white focus:outline-none md:text-xl"
      onClick={async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        return await onButtonClick(connector);
      }}
    >
      <WalletIcon name={connector.name} />
      {['metamask', 'injected'].includes(connector.name) ? 'MetaMask' : connector.name}
    </button>
  );
};
export default Signin;

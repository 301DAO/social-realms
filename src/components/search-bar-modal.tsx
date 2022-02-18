import { isValidEthAddress } from '@/utils/string-validators';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';

// TODO: add ENS support
const verifyAddress = (address: string) => {
  if (isValidEthAddress(address) || address.endsWith('.eth')) return true;
  import('react-hot-toast').then(({ toast }) => {
    toast('Invalid Ethereum address', {
      position: 'bottom-right',
      style: {
        background: '#f44336',
        color: '#fff',
      },
    });
  });
};

const SearchBarModal = () => {
  const [open, setIsOpen] = React.useState(false);

  const showModal = () => setIsOpen(true);
  const hideModal = () => setIsOpen(false);

  const router = useRouter();
  const searchText = React.useRef<HTMLInputElement>(null);

  const onSearchClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      hideModal();

      const search = searchText?.current?.value;
      if (!search || !verifyAddress(search)) return;
      router.push(`/user/${search}`);
    },
    [searchText]
  );

  const onEnter = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      hideModal();

      const search = searchText?.current?.value;
      if (!search || !verifyAddress(search)) return;
      router.push(`/user/${search}`);
    },
    [searchText]
  );

  // const showOnCmdK = async () => {
  //   const keysPressed: { [key: string]: boolean } = {};
  //   document.onkeydown = async (event: KeyboardEvent) => {
  //     keysPressed[event.key] = true;
  //     if (keysPressed['Meta'] && event.key === 'k') {
  //       setTimeout(async () => {
  //         await showModal();
  //         searchText?.current?.focus();
  //       }, 0);
  //     }
  //   };
  // };

  React.useEffect(() => {
    const keysPressed: { [key: string]: boolean } = {};
    document.onkeydown = async (event: KeyboardEvent) => {
      keysPressed[event.key] = true;
      if (!(keysPressed['Meta'] && event.key === 'k')) return;
      console.log(`${event.key} pressed`);
      await showModal();
      setTimeout(async () => {
        searchText?.current?.focus();
      }, 100);
    };
    document.onkeyup = (event: KeyboardEvent) => delete keysPressed[event.key];
  }, []);

  return (
    <>
      <button
        onClick={showModal}
        type="button"
        className={clsx(
          `flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-600`,
          `dark:text-gray-300`
        )}
      >
        <span className="sr-only">Navigation</span>
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m19 19-3.5-3.5"></path>
          <circle cx="11" cy="11" r="6"></circle>
        </svg>
      </button>
      <Transition appear={open} show={open} as={React.Fragment}>
        <Dialog
          onClose={hideModal}
          onKeyPress={onEnter}
          className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-[1px]"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
            </Transition.Child>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed w-full max-w-[30rem] text-base font-semibold text-gray-900 bg-white rounded-lg shadow-lg top-[40%]">
                <Dialog.Title
                  as="div"
                  className="flex p-1 justify-evenly px-3 ml-auto space-x-3 text-left text-gray-400 bg-white rounded-lg shadow-sm h-12 md:flex ring-[1px] ring-gray-900/10 hover:ring-gray-300 ring-gray-400"
                >
                  <button onClick={onSearchClick} className="outline-none">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-none text-gray-300"
                      aria-hidden="true"
                    >
                      <path d="m19 19-3.5-3.5"></path>
                      <circle cx="11" cy="11" r="6"></circle>
                    </svg>
                  </button>
                  <input
                    ref={searchText}
                    onKeyPress={onEnter}
                    className="flex-auto w-full text-gray-500 outline-none h-11/12"
                    placeholder="Quick ENS / Address Search"
                  />
                </Dialog.Title>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default SearchBarModal;

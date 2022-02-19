import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import * as React from 'react';
import dynamic from 'next/dynamic';
const WalletNav = dynamic(() => import('@/components/wallet-nav'));

export default function WalletModal() {
  const [open, setIsOpen] = React.useState(false);

  const showModal = () => setIsOpen(true);
  const hideModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={showModal}
        type="button"
        className={clsx(
          `flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-600`,
          `dark:text-gray-200`
        )}>
        <span className="sr-only">Navigation</span>
        <svg width="24" height="24" fill="none" aria-hidden="true">
          <path
            d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
        </svg>
      </button>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog
          onClose={hideModal}
          className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-[1px]">
          <div className="flex min-h-screen items-center justify-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />
            </Transition.Child>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="fixed top-14 right-6 w-full max-w-[14.8rem] rounded-lg bg-white text-base font-semibold text-gray-900 shadow-lg">
                <Dialog.Title as="div" className="flex justify-evenly p-6">
                  <WalletNav />
                </Dialog.Title>
                {/* Dialog footer */}
                <div className="flex justify-evenly rounded-lg bg-gray-100 p-2.5">
                  {/* {socialLinks.map(item => (
                    <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.icon}
                    </a>
                  ))} */}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

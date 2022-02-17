import { socialLinks } from '@/components/social-items';
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
          `flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-600`,
          `dark:text-gray-200`
        )}
      >
        <span className="sr-only">Navigation</span>
        <svg width="24" height="24" fill="none" aria-hidden="true">
          <path
            d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog
          onClose={hideModal}
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
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />
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
              <div className="fixed w-full max-w-[14.8rem] text-base font-semibold text-gray-900 bg-white rounded-lg shadow-lg top-14 right-6">
                <Dialog.Title as="div" className="flex p-6 justify-evenly">
                  <WalletNav />
                </Dialog.Title>
                {/* Dialog footer */}
                <div className="flex p-2.5 bg-gray-100 rounded-lg justify-evenly">
                  {socialLinks.map(item => (
                    <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

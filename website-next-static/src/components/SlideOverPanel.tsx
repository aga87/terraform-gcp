'use client';

import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils';
import { Logo } from './Logo/Logo';

type SlideOverPanelProps = {
  profile: 'aga' | 'dom';
  variant?: 'primary' | 'secondary';
  direction: 'left' | 'up' | 'down';
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  isMobileOnly?: boolean;
  handleClose: () => void;
};

export const SlideOverPanel = ({
  profile,
  variant = 'primary',
  direction,
  children,
  title,
  isOpen,
  isMobileOnly = false,
  handleClose
}: SlideOverPanelProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={classNames(
              'fixed inset-0 bg-gray-500/75 transition-opacity',
              isMobileOnly ? 'lg:hidden' : ''
            )}
          />
        </TransitionChild>

        <div
          className={classNames(
            'fixed inset-0 overflow-hidden',
            isMobileOnly ? 'lg:hidden' : ''
          )}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={classNames(
                'pointer-events-none fixed inset-y-0 right-0 flex max-w-full',
                direction === 'left' ? 'pl-0' : '',
                direction === 'up' ? 'pt-16' : ''
              )}
            >
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom={classNames(
                  direction === 'left' ? 'translate-x-full' : '',
                  direction === 'up' ? 'translate-y-full' : '',
                  direction === 'down' ? '-translate-y-full' : ''
                )}
                enterTo={classNames(
                  direction === 'left' ? 'translate-x-0' : '',
                  direction === 'up' ? 'translate-y-0' : '',
                  direction === 'down' ? 'translate-y-0' : ''
                )}
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom={classNames(
                  direction === 'left' ? 'translate-x-0' : '',
                  direction === 'up' ? 'translate-y-0' : '',
                  direction === 'down' ? 'translate-y-0' : ''
                )}
                leaveTo={classNames(
                  direction === 'left' ? 'translate-x-full' : '',
                  direction === 'up' ? 'translate-y-full' : '',
                  direction === 'down' ? '-translate-y-full' : ''
                )}
              >
                <DialogPanel
                  className={classNames(
                    'pointer-events-auto w-screen',
                    direction === 'left' ? 'max-w-xl' : ''
                  )}
                >
                  <div
                    className={classNames(
                      'flex h-full flex-col overflow-y-scroll bg-white pt-6 shadow-xl'
                    )}
                  >
                    <div className="px-4 sm:px-6">
                      <div
                        className={classNames(
                          'flex items-start justify-between pb-4 ',
                          variant === 'primary' ? 'border-b-[1px]' : '0'
                        )}
                      >
                        <DialogTitle
                          className={classNames(
                            'font-semibold leading-6',
                            variant === 'primary' ? 'text-base' : 'text-2xl'
                          )}
                        >
                          {title ? title : <Logo profile={profile} />}
                        </DialogTitle>

                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white focus:outline-hidden"
                            onClick={handleClose}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6 md:px-16">
                      {children}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

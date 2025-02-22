'use client';

import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils';
import { useBackToTop } from './useBackToTop';
import './animation.css';

export const BackToTopButton = () => {
  const { isVisible, handleScrollToTop } = useBackToTop();

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className={classNames(
        'bg-gray-800 cursor-pointer hover:bg-white hover:border-2 hover:border-gray-800 p-2 rounded-full',
        isVisible ? 'fade-in' : 'fade-out'
      )}
    >
      <ChevronUpIcon className="w-10 h-10 text-white hover:text-gray-800" />
    </button>
  );
};

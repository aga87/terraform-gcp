import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

type NavButtonProps = {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

export const NavButton = ({
  isOpen,
  handleOpen,
  handleClose
}: NavButtonProps) => {
  return (
    <button
      className="p-2 focus:outline-hidden"
      onClick={() => {
        if (isOpen) {
          handleClose();
        } else {
          handleOpen();
        }
      }}
    >
      <span className="sr-only">Open main menu</span>
      {isOpen ? (
        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};

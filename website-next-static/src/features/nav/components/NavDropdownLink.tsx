import Link from 'next/link';
import { ExternalLink } from '@/components';

type NavDropdownLinkProps = {
  url: string;
  text: string;
  isUrlExternal: boolean;
  handleClose: () => void;
};

export const NavDropdownLink = ({
  url,
  text,
  isUrlExternal,
  handleClose
}: NavDropdownLinkProps) => {
  const className =
    'block border-l-4 border-transparent py-4 pr-4 font-semibold';

  return (
    <>
      {isUrlExternal ? (
        <ExternalLink url={url} text={text} className={className} />
      ) : (
        <Link href={url} className={className} onClick={handleClose}>
          {text}
        </Link>
      )}
    </>
  );
};

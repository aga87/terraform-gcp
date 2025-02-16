'use client';

import Link from 'next/link';

type NavLinkProps = {
  text: string;
  url: string;
};

export const NavLink = ({ text, url }: NavLinkProps) => {
  return (
    <Link
      href={url}
      className="block cursor-pointer p-3 hover:bg-gray-50 hover:border-[1px] hover:border-gray-150"
    >
      {text}
    </Link>
  );
};

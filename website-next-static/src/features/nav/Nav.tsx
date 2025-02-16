'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo, SlideOverPanel } from '@/components';
import { NavButton, NavDropdownLink, NavLink } from './components';
import { navLinksAga, navLinksDom } from '@/data/navLinks';

type NavProps = {
  profile: 'aga' | 'dom';
};

export const Nav = ({ profile }: NavProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let links: { url: string; text: string }[] = [];

  if (profile === 'aga') {
    links = navLinksAga;
  } else {
    links = navLinksDom;
  }
  return (
    <nav className="bg-white font-semibold">
      <div className="mx-auto bg-white">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center lg:mr-10">
              <Link href="/">
                <Logo profile={profile} />
              </Link>
            </div>
            <div className="hidden lg:ml-6 lg:flex lg:gap-x-4 text-center">
              {links.map((link) => (
                <div key={link.url} className="inline-flex items-center">
                  <NavLink text={link.text} url={link.url} />
                </div>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex items-center lg:hidden">
            <NavButton
              isOpen={isDropdownOpen}
              handleOpen={() => {
                setIsDropdownOpen(true);
              }}
              handleClose={() => {
                setIsDropdownOpen(false);
              }}
            />
          </div>
        </div>
      </div>

      <SlideOverPanel
        profile={profile}
        variant="secondary"
        title=""
        direction="down"
        isOpen={isDropdownOpen}
        isMobileOnly={true}
        handleClose={() => {
          setIsDropdownOpen(false);
        }}
      >
        <div className="pb-6">
          {links.map((link) => (
            <div key={link.url} className="border-b-[1px]">
              <NavDropdownLink
                url={link.url}
                text={link.text}
                isUrlExternal={false}
                handleClose={() => {
                  setIsDropdownOpen(false);
                }}
              />
            </div>
          ))}
        </div>
      </SlideOverPanel>
    </nav>
  );
};

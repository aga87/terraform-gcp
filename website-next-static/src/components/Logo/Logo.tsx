'use client';

import Image from 'next/image';
import logoDom from './lemon-moon-media-logo.png';
import logoAga from './aga-logo.png';

type LogoProps = {
  profile: 'aga' | 'dom';
};

export const Logo = ({ profile }: LogoProps) => {
  return (
    <Image
      src={profile === 'aga' ? logoAga : logoDom}
      alt={profile === 'aga' ? 'Logo' : 'LemonMoon Media Logo'}
      width={profile === 'aga' ? 50 : 50}
      className="inline-block"
    />
  );
};

import * as React from 'react';
import clsx from 'clsx';
import { Twitter, Discord, Github, LinkIcon } from '@/components/icons';

type SocialLink = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

const socialLinks: SocialLink[] = [
  {
    name: 'twitter',
    url: 'https://twitter.com/404DAO',
    icon: <Twitter />,
  },
  {
    name: 'discord',
    url: 'https://discord.gg/FTWBuS7E',
    icon: <Discord />,
  },
  {
    name: 'github',
    url: 'https://github.com/404DAO',
    icon: <Github />,
  },
  {
    name: 'website',
    url: 'https://404dao.com',
    icon: <LinkIcon />,
  },
];

export function Footer() {
  return (
    <footer
      className={clsx(
        `static bottom-0 left-0 m-0 box-border flex h-14 w-full items-center justify-center border-t border-solid border-gray-700 p-4 text-gray-700 md:fixed`,
        `border-gray-600 dark:bg-[#14141b] dark:text-gray-300`
      )}>
      <div className={clsx(`flex gap-x-10 rounded-lg bg-gray-100 p-2.5`, `dark:bg-transparent`)}>
        {socialLinks.map(item => (
          <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer">
            {item.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}

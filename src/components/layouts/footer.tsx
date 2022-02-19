import * as React from 'react';
import clsx from 'clsx';
import { Twitter, Discord, Github, LinkIcon } from '@/components/icons';

const socialLinks = [
  {
    name: 'twitter',
    link: 'https://twitter.com/404DAO',
    icon: <Twitter />,
  },
  {
    name: 'discord',
    link: 'https://discord.gg/FTWBuS7E',
    icon: <Discord />,
  },
  {
    name: 'github',
    link: 'https://github.com/404DAO',
    icon: <Github />,
  },
  {
    name: 'website',
    link: 'https://404dao.com',
    icon: <LinkIcon />,
  },
];

export function Footer() {
  return (
    <footer
      className={clsx(
        `fixed bottom-0 left-0 m-0 box-border flex h-16 w-full items-center justify-center border-t border-solid border-gray-700 p-4 text-gray-700`,
        `border-gray-600 dark:bg-[#14141b] dark:text-gray-300`
      )}>
      <div className={clsx(`flex gap-x-10 rounded-lg bg-gray-100 p-2.5`, `dark:bg-transparent`)}>
        {socialLinks.map(item => (
          <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer">
            {item.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}

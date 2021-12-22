import { socialLinks } from '@/components/social-items'
import * as React from 'react'
import { tw } from 'twind'
export function Footer() {
  return (
    <footer
      className={tw(
        `text-gray-700 p-4 border-gray-700 border-solid border-t box-border flex items-center justify-center h-16 m-0 fixed bottom-0 left-0  w-full`,
        `dark:text-gray-300 border-gray-600 dark:bg-[#262833]`
      )}
    >
      <div
        className={tw(
          `flex p-2.5 gap-x-10 bg-gray-100 rounded-lg`,
          `dark:bg-transparent`
        )}
      >
        {socialLinks.map(item => (
          <a
            key={item.name}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </footer>
  )
}

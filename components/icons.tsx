const socialIcons = {
  YouTube: <>
    <path fillRule="evenodd" d="M21.6 7.1a2.5 2.5 0 0 0-1.8-1.8C18.2 4.9 12 4.9 12 4.9s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.9 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.9ZM10 15.1V8.9l5.2 3.1-5.2 3.1Z"/>
  </>,
  LinkedIn: <>
    <path d="M4 8.7h3.3V20H4V8.7Zm1.7-5.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM9.7 8.7H13v1.5a3.9 3.9 0 0 1 3.4-1.8c3.5 0 4.1 2.2 4.1 5.1V20h-3.3v-5.7c0-1.4 0-3.1-2-3.1s-2.2 1.5-2.2 3V20H9.7V8.7Z"/>
  </>,
  Facebook: <>
    <path d="M14.3 22v-8.8h3l.4-3.4h-3.4V7.7c0-1 .3-1.7 1.7-1.7h1.9V2.9c-.3 0-1.5-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8v2.3H7.3v3.4h3.1V22h3.9Z"/>
  </>,
  Instagram: <>
    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.4" cy="6.7" r="1.1"/>
  </>,
} as const;

export type SocialName = keyof typeof socialIcons;

export function SocialIcon({ name }: { name: SocialName }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      {socialIcons[name]}
    </svg>
  );
}

const lines = {
  scales: <path d="M12 3v17M5 20h14M5 7h14M6 7 3 13h6L6 7Zm12 0-3 6h6l-3-6ZM4 14a2 2 0 0 0 4 0m8 0a2 2 0 0 0 4 0" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.6 8.4-2 5.2-5.2 2 2-5.2 5.2-2Z" /></>,
  conversation: <><path d="M20.5 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-3.7-.8L4 20.5l1.3-4.2a8.5 8.5 0 1 1 15.2-4.8Z" /><path d="M8.5 11.5h7" /></>,
  person: <><circle cx="12" cy="7.5" r="3" /><path d="M5 20v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V20" /></>,
  video: <><rect x="3" y="6" width="12" height="12" rx="2" /><path d="m15 10 6-3v10l-6-3" /></>,
  phone: <path d="m5.2 3.5 3-.5 2.1 4.9-1.8 1.6a13.5 13.5 0 0 0 6 6l1.6-1.8 4.9 2.1-.5 3c-.2 1.1-1.1 1.8-2.2 1.8A16.7 16.7 0 0 1 3.4 5.7c0-1.1.7-2 1.8-2.2Z" />,
  whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-3.6-.8L4 20.7l1.2-4.4a8.5 8.5 0 1 1 15.3-4.6Z" /><path d="M9 8.5c.4 2.9 2.7 5.2 5.6 5.8l.8-1.2-1.9-1.1-.7.7a4.7 4.7 0 0 1-2.3-2.3l.7-.7-1.1-1.9L9 8.5Z" /></>,
} as const;

export type LineName = keyof typeof lines;

export function LineIcon({ name }: { name: LineName }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {lines[name]}
    </svg>
  );
}

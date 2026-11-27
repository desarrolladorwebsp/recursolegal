const socialIcons = {
  YouTube: <>
    <path fillRule="evenodd" d="M21.6 7.1a2.5 2.5 0 0 0-1.8-1.8C18.2 4.9 12 4.9 12 4.9s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.9 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.9ZM10 15.1V8.9l5.2 3.1-5.2 3.1Z"/>
  </>,
  LinkedIn: <>
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="9" width="3.5" height="11" rx="0.4" /><circle cx="5.25" cy="5.25" r="1.75" />
      <path d="M11 20V9h3.4v1.8a3.8 3.8 0 0 1 3.2-2.1c2.4 0 3 1.9 3 4.6V20M14.4 20v-6.5" />
    </g>
  </>,
  Facebook: <>
    <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
      d="M14.5 21.2v-8h3l.4-3.4h-3.4V7.9c0-1.2.4-1.8 1.8-1.8h1.7V3.1a18 18 0 0 0-2.5-.2c-3 0-4.8 1.7-4.8 4.8v2.1H7.5v3.4h3.2v8h3.8Z" />
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
  check: <path d="m5 12 4.5 4.5L19 7" />,
  person: <><circle cx="12" cy="7.5" r="3" /><path d="M5 20v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V20" /></>,
  video: <><rect x="3" y="6" width="12" height="12" rx="2" /><path d="m15 10 6-3v10l-6-3" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
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

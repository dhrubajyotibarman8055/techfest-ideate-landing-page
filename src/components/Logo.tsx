export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <circle cx="24" cy="24" r="22" stroke="#d9b25f" strokeWidth="1.2" />
      <rect x="9.5" y="9.5" width="29" height="29" transform="rotate(45 24 24)" stroke="#d9b25f" strokeOpacity=".6" />
      <path d="M14 17h20M24 17v16" stroke="#efe6d0" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2.2" fill="#d9b25f" />
    </svg>
  );
}

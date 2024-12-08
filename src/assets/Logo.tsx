// src/components/Logo.tsx
interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <svg className={className} viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="url(#gradientBg)" />
      <path d="M60 100 Q100 40 140 100 Q100 160 60 100" stroke="#fff" fill="none" strokeWidth="6" />
      <path d="M100 60 Q160 100 100 140 Q40 100 100 60" stroke="#fff" fill="none" strokeWidth="6" />
      <circle cx="100" cy="100" r="15" fill="#ffffff" />
      <circle cx="60" cy="100" r="8" fill="#ffffff" />
      <circle cx="140" cy="100" r="8" fill="#ffffff" />
      <circle cx="100" cy="60" r="8" fill="#ffffff" />
      <circle cx="100" cy="140" r="8" fill="#ffffff" />
      <defs>
        <linearGradient id="gradientBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
};
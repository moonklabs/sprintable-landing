import type { SVGProps } from 'react';

export function SprintableMarkSvg({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="9.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      role="img"
      aria-label="Sprintable"
      className={className}
      {...props}
    >
      <path d="M20 64 L50 34 L80 64" />
      <path d="M31 64 L50 47 L69 64" opacity="0.68" />
      <path d="M42 64 L50 57 L58 64" opacity="0.42" />
    </svg>
  );
}

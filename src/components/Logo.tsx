export default function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">
      <defs>
        <linearGradient id="grassGradientLight" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#16a34a"/>
          <stop offset="100%" stopColor="#22c55e"/>
        </linearGradient>
        <linearGradient id="textGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#15803d"/>
          <stop offset="100%" stopColor="#166534"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15"/>
        </filter>
      </defs>
      
      <rect x="5" y="12" width="76" height="76" rx="14" fill="url(#grassGradientLight)" filter="url(#shadow)"/>
      
      <g transform="translate(43, 62)">
        <path d="M-20 0 Q-22 -15 -15 -25 Q-12 -15 -10 0" fill="#f0fdf4" opacity="0.95">
          <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M-20 0 Q-22 -15 -15 -25 Q-12 -15 -10 0;M-20 0 Q-24 -18 -14 -28 Q-11 -15 -10 0;M-20 0 Q-22 -15 -15 -25 Q-12 -15 -10 0"/>
        </path>
        <path d="M0 0 Q2 -25 0 -40 Q-2 -25 0 0" fill="#ffffff" opacity="1">
          <animate attributeName="d" dur="3.5s" repeatCount="indefinite" values="M0 0 Q2 -25 0 -40 Q-2 -25 0 0;M0 0 Q4 -30 0 -45 Q-3 -25 0 0;M0 0 Q2 -25 0 -40 Q-2 -25 0 0"/>
        </path>
        <path d="M20 0 Q22 -18 15 -30 Q12 -15 10 0" fill="#f0fdf4" opacity="0.95">
          <animate attributeName="d" dur="2.8s" repeatCount="indefinite" values="M20 0 Q22 -18 15 -30 Q12 -15 10 0;M20 0 Q24 -22 14 -34 Q11 -15 10 0;M20 0 Q22 -18 15 -30 Q12 -15 10 0"/>
        </path>
        <path d="M-10 0 Q-12 -10 -8 -18 Q-6 -10 -5 0" fill="#dcfce7" opacity="0.95">
          <animate attributeName="d" dur="2.5s" repeatCount="indefinite" values="M-10 0 Q-12 -10 -8 -18 Q-6 -10 -5 0;M-10 0 Q-14 -13 -7 -21 Q-5 -10 -5 0;M-10 0 Q-12 -10 -8 -18 Q-6 -10 -5 0"/>
        </path>
        <path d="M10 0 Q12 -12 8 -20 Q6 -10 5 0" fill="#dcfce7" opacity="0.95">
          <animate attributeName="d" dur="3.2s" repeatCount="indefinite" values="M10 0 Q12 -12 8 -20 Q6 -10 5 0;M10 0 Q14 -15 7 -23 Q5 -10 5 0;M10 0 Q12 -12 8 -20 Q6 -10 5 0"/>
        </path>
        <ellipse cx="0" cy="2" rx="25" ry="4" fill="#166534" opacity="0.3"/>
      </g>
      
      <g transform="translate(95, 0)">
        <text x="0" y="42" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="24" fontWeight="800" fill="url(#textGradientLight)" letterSpacing="-0.5">
          On The Land
        </text>
        <line x1="0" y1="50" x2="8" y2="50" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
        <text x="14" y="55" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="13" fontWeight="600" fill="#4ade80" letterSpacing="3">
          LAWN SERVICE
        </text>
      </g>
    </svg>
  );
}

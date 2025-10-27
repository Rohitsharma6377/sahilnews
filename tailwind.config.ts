import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          bg: '#E6F0FF',
          fg: '#F97316',
          accent: '#F97316',
        },
        brand: {
          orange: '#F97316',
          red: '#EF4444',
          blue: '#1E3A8A',
          lightBlue: '#60A5FA',
        },
      },
      fontFamily: {
        heading: ['ui-serif', 'Georgia'],
        body: ['ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 10px 25px -10px rgba(2,6,23,0.15)',
      },
    },
  },
  plugins: [typography],
} satisfies Config

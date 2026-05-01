import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',
        cream: '#F8F5EC',
        sand: '#E6DDC6',
        clay: '#C49A6C',
        gold: '#C49A6C', // Using clay color for gold consistency
        bark: '#6E4B3A',
        charcoal: '#23201B'
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Source Serif 4', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: Function }) {
      addUtilities({
        '.shadow-elevation-1': {
          boxShadow: '0 1px 2px rgba(35, 32, 27, 0.04), 0 2px 4px rgba(35, 32, 27, 0.02)'
        },
        '.shadow-elevation-2': {
          boxShadow: '0 4px 6px -1px rgba(35, 32, 27, 0.05), 0 2px 4px -2px rgba(35, 32, 27, 0.03), 0 8px 16px -4px rgba(196, 154, 108, 0.06)'
        },
        '.shadow-elevation-3': {
          boxShadow: '0 12px 24px -4px rgba(35, 32, 27, 0.08), 0 8px 16px -6px rgba(35, 32, 27, 0.04), 0 20px 40px -8px rgba(196, 154, 108, 0.1)'
        },
        '.glass': {
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)'
        },
        '.glass-dark': {
          background: 'rgba(110, 75, 58, 0.65)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)'
        }
      })
    }
  ],
}
export default config
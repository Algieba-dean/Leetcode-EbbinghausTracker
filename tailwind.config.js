/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
        },
        surface: {
          base: '#0f172a',
          card: '#1e293b',
          hover: '#334155',
          border: '#334155',
        },
        lc: {
          easy: '#10b981',
          medium: '#f59e0b',
          hard: '#ef4444',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        glow: '0 0 15px -3px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,css}', './styles/**/*.{css}'],
  safelist: [
    {
      pattern:
        /^(bg|text|border|ring|hover:bg|hover:text|hover:border|hover:ring)-(primary|secondary)-(100|200|300|400|500|600|700|800|900)$/,
      variants: ['dark'],
    },
  ],
  theme: {
    extend: {
      colors: {
        light: {
          100: '#ffffff',
          200: '#f8f9fa',
          300: '#f6fbff',
        },
        dark: {
          100: '#272b30',
          200: '#141617',
          300: '#101213',
        },
        surface: {
          light100: '#ffffff',
          light200: '#f3f4f6',
          light300: '#e5e7eb',
          dark100: '#374151',
          dark200: '#4b5563',
          dark300: '#6b7280',
        },
        text: {
          light100: '#111827',
          light200: '#374151',
          light300: '#6b7280',
          dark100: '#f9fafb',
          dark200: '#d1d5db',
          dark300: '#9ca3af',
        },
        primary: {
          100: '#cce4ff',
          200: '#99c9ff',
          300: '#66adff',
          400: '#3392ff',
          500: '#007fff',
          600: '#0066cc',
          700: '#004d99',
          800: '#003366',
          900: '#001a33',
        },
        secondary: {
          100: '#d0f0f7',
          200: '#a1e1ef',
          300: '#72d2e7',
          400: '#43c3df',
          500: '#14b4d7',
          600: '#1090ad',
          700: '#0c6c83',
          800: '#08485a',
          900: '#04242f',
        },
      },
    },
  },
  plugins: [],
};

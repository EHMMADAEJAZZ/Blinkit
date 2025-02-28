/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-200': '#ffbf00',
        'primary-100': '#ffc929',
        'secondary-200': '#00b050',
        'secondary-100': '#0b1a78',
      },
      fontFamily: {
        heading: 'Poppins, sans-serif',
        body: 'Poppins, sans-serif',
      },
    },
    screens: {
      xs:'300px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    }
  },
  plugins: [],
};

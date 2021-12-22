/** @type {import('twind').Configuration} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [ "'Inter', sans-serif" ],
        Inter: [ "'Inter', sans-serif" ],
      },
      colors: {
        gray: {
          custom: '#242331',
        },
        yellow: {
          custom: '#edf060',
        },
        red: {
          custom: '#ef233c',
        },
      },
      screens: {
        standalone: { raw: '(display-mode:standalone)' },
      },
    },
  },
  preflight: {
    '@import': `url('https://fonts.googleapis.com/css2?family=Inter:wght@200;600;800;900&display=swap')`,
    '@font-face': [
      {
        fontFamily: 'Inter',
        fontWeight: '200',
        src: 'url(https://fonts.googleapis.com/css2?family=Inter:wght@200&display=swap)',
      },
      {
        fontFamily: 'Inter',
        fontWeight: '600',
        src: 'url(https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap)',
      },
      {
        fontFamily: 'Inter',
        fontWeight: '800',
        src: 'url(https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap)',
      },
      {
        fontFamily: 'Inter',
        fontWeight: '900',
        src: 'url(https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap)',
      },
    ],
  },
}

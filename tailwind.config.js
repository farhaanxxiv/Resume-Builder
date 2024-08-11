/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.minimal-resume-css *': {
            color: '#000',
            'font-family': "Times New Roman, Times, serif",
          },
          '.minimal-resume-css .section_heading': {
            'font-weight': '600',
            'font-size': '1.05rem',
            'text-transform':'uppercase'
          }
        },
      );
    },
  ],
}

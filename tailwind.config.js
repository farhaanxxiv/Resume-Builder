
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.minimal-resume-css *': {
            color: '#000',
            'font-family': "Times New Roman, Times, serif",
            'line-height': 1.2
          },
          '.minimal-resume-css .section_heading': {
            'font-weight': '600',
            'font-size': '1.08rem',
            'text-transform': 'uppercase'
          },
          '.minimal-resume-css ol, .minimal-resume-css ul': {
            'padding-left': '1rem'
          },
          '.minimal-resume-css .summary_text *': {
            'text-align': 'justify',
            'background-color': 'transparent !important'
          },
          '.minimal-resume-css p': {
            'font-size': '14px'
          }
        },
      );
    },
  ],
}

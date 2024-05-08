const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-orange': 'linear-gradient(90deg, #ff6600, #7a2a05)', // Custom gradient definition
      },
      colors: {
        offwhite: '#f8f8f8',
        // You can adjust the hex code as needed
      },
    },
  },
  plugins: [],
});

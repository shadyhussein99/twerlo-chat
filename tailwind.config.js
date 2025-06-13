module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // adjust based on your app
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Blue-800
        secondary: "#F59E0B", // Amber-500
        accent: "#10B981", // Emerald-500
        muted: "#9CA3AF", // Gray-400
        danger: "#EF4444", // Red-500
        success: "#22C55E", // Green-500
      },
    },
    fontFamily: {
      display: ["Gilroy", "sans-serif"],
      body: ["Graphik", "sans-serif"],
    },
    variants: {
      opacity: ["responsive", "hover"],
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
};

module.exports = {
  content: ["./src/**/*.{html,tsx}","./src/components/**/*.{html,tsx}","./public/index.html"],
  darkMode: 'class',
  mode: 'jit',
  theme: { extend: {
        backgroundImage: {
          'hero': "url('https://thenerdstash.com/wp-content/uploads/2022/06/Minecraft-Fight-Warden.jpg')",
        },
      colors: {
          'primary': '#00d8d2',
          'secondary': '#f8f9fa',
          'tertiary': '#ffffff',
          'greenish': '#f25d38',
          'quartish': '#ffffff',
          'white': 'white',
          'hoverish': '#f1f2f4',
          'evenish': '#f1f2f4',
          'dark-primary': '#0e1421',
          'dark-secondary': '#232f3f',
          'dark-tertiary': '#17212b',
          'dark-greenish': '#96260a',
          'dark-quartish': '#17212b',
          'dark-white': 'lightgray',
          'dark-hoverish': '#1c2a37',
          'dark-evenish': '#121c26'
      },
      fontFamily: {
        Sora: ["Work Sans", "regular"],
        Orbitron: ["Work Sans", "regular"]
       },
  } },
  plugins: [],
};
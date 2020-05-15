module.exports = {
  purge: [],
  theme: {
    colors:{
      white: "#FFFFFF",
      black: "#000000",
      purple:{
        1: "#675D78",
        2:"#B1B4C9",
      },
      blue:{
        1:"#DCE0F6",
        2:"#CED2E8",
        3:"#9FA9DC",
        4:"#505571",
        5:"#292A33"
      },
      gray:{
        1:"#747474",
      },
      red:{
        1:"#D76767",
        2:"#DA7A7A",
        3:"#8F3636"
      }
      
    },
    extend: {
      fontSize:{
        '9xl': '7rem'
      },
      inset:{
        '1/2':'50%'
      },
      transitionProperty:{
        'spacing': 'margin, padding',
      },
      height:{
        '1/2-screen':'38vh'
      }
    },
  },
  variants: {},
  plugins: [],
}

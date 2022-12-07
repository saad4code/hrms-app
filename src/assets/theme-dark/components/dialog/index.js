/**
Created By Muhammad Saad
*/

// Material Dashboard 2 PRO React base styles
import borders from 'assets/theme-dark/base/borders'
import boxShadows from 'assets/theme-dark/base/boxShadows'

const { borderRadius } = borders
const { xxl } = boxShadows

export default {
  styleOverrides: {
    paper: {
      borderRadius: borderRadius.lg,
      boxShadow: xxl,
    },

    paperFullScreen: {
      borderRadius: 0,
    },
  },
}

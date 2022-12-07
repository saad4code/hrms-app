/**
Created By Muhammad Saad
*/

// Material Dashboard 2 PRO React base styles
import borders from 'assets/theme/base/borders'

const { borderRadius } = borders

export default {
  styleOverrides: {
    root: {
      transition: 'all 200ms ease-in-out',
    },

    rounded: {
      borderRadius: borderRadius.lg,
    },

    img: {
      height: 'auto',
    },
  },
}

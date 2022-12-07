/**
Created By Muhammad Saad
*/

// Material Dashboard 2 PRO React base styles
import typography from 'assets/theme-dark/base/typography'
import colors from 'assets/theme-dark/base/colors'

// Material Dashboard 2 PRO React helper functions
import rgba from 'assets/theme-dark/functions/rgba'

const { size } = typography
const { white } = colors

export default {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: rgba(white.main, 0.8),
    },
  },
}

/**
Created By Muhammad Saad
*/

// Material Dashboard 2 PRO React base styles
import colors from 'assets/theme/base/colors'

// Material Dashboard 2 PRO React helper functions
import pxToRem from 'assets/theme/functions/pxToRem'

const { transparent } = colors

export default {
  styleOverrides: {
    select: {
      display: 'grid',
      alignItems: 'center',
      padding: `0 ${pxToRem(12)} !important`,

      '& .Mui-selected': {
        backgroundColor: transparent.main,
      },
    },

    selectMenu: {
      background: 'none',
      height: 'none',
      minHeight: 'none',
      overflow: 'unset',
    },

    icon: {
      display: 'none',
    },
  },
}

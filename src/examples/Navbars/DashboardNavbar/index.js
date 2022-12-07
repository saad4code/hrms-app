/* eslint-disable react/react-in-jsx-scope */
/**
Created By Muhammad Saad
*/

import { useState, useEffect } from 'react'

// react-router components
import { Link, useNavigate } from 'react-router-dom'

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types'

// @material-ui core components
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Icon from '@mui/material/Icon'
import LogoutIcon from '@mui/icons-material/Logout'
// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
// import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
// import Breadcrumbs from "examples/Breadcrumbs";
// import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from 'examples/Navbars/DashboardNavbar/styles'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import Swal from 'sweetalert2'
import { REACT_APP_BACKEND_LOGOUT_API } from "config/backendApi"

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from 'context'
import { Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState()
  const [controller, dispatch] = useMaterialUIController()
  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    darkMode,
  } = controller
  const [openMenu, setOpenMenu] = useState(false)
  let navigate = useNavigate()
  const [btnLoading, setBtnLoading] = useState({ loading: false, error: false })
  // const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky')
    } else {
      setNavbarType('static')
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar,
      )
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener('scroll', handleTransparentNavbar)

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar()

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar)
  }, [dispatch, fixedNavbar])

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav)
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator)
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget)
  const handleCloseMenu = () => setOpenMenu(false)

  function handleLogout() {
    let mytoken = localStorage.getItem('token')
    setBtnLoading({ loading: true, error: false })
    try {
      fetch(`${REACT_APP_BACKEND_LOGOUT_API}`, {
        // mode: `no-cors`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: `POST`,
        body: JSON.stringify({
          mytoken,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.flag === 'ok') {
            setBtnLoading({ loading: false, error: false })
            localStorage.removeItem('token')
            navigate('/sign-in')
          } else {
            setBtnLoading({ loading: false, error: true })
          }
        })
        .catch(() => {
          setBtnLoading({ loading: false, error: true })
        })
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: `Something went wrong!`,
      })
    }
  }

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 1, marginLeft: -4 }}
    >
      {btnLoading?.error ? (
        <Button title="Logout" onClick={() => handleLogout()}>
          <LogoutIcon>Logout</LogoutIcon>
          <h4 style={{ marginTop: '2px' }}>&nbsp;&nbsp;Logout</h4>
        </Button>
      ) : btnLoading?.loading ? (
        <LoadingButton loading>Submit</LoadingButton>
      ) : (
        <Button title="Logout" onClick={() => handleLogout()}>
          <LogoutIcon>Logout</LogoutIcon>
          <h4 style={{ marginTop: '2px' }}>&nbsp;&nbsp;Logout</h4>
        </Button>
      )}
      {/* <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" /> */}
      {/* <Button icon={<Icon>podcasts</Icon>}>Logout</Button> */}
    </Menu>
  )

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main
      }

      return colorValue
    },
  })

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          {/* <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} /> */}
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox> */}
            <MDBox color={light ? 'white' : 'inherit'}>
              <Link to="/authentication/sign-in/basic">
                {/* <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton> */}
              </Link>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? <MenuOpenIcon /> : <MenuIcon />}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <SettingsIcon sx={iconsStyle} />
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                {/* <Icon sx={iconsStyle}>notifications</Icon> */}
                <AccountCircleIcon sx={iconsStyle} />
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  )
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
}

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
}

export default DashboardNavbar

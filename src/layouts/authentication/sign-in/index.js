/* eslint-disable react/react-in-jsx-scope */
// Import React
import React, { useEffect, useState } from 'react'
// Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom'
// @mui material components
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'
// Import Toast From React-toastify and css Module
// Import MDBox,MDTypography,MDInput,MDButton from Components folder
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
// import MDInput from 'components/MDInput'
import MDButton from 'components/MDButton'
// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout'
// Images
import {
  imageFive,
  imageFour,
  imageOne,
  imageSix,
  imageThree,
  imageTwo,
} from 'assets/images'
import { REACT_APP_BACKEND_LOGIN_API } from "config/backendApi"
import { TextField } from '@mui/material'
import { regEx } from 'emailRegex'

function Login() {
  let navigate = useNavigate()
  const [randomImage, setRandomImage] = useState()

  const [userLogin, setuserLogin] = useState({
    email: ``,
    password: ``,
  })

  const [error, setError] = useState({
    formSubmit: false,
    emailError: ``,
    passwordError: ``,
  })

  const imageGenerator = () => {
    const images = [
      imageOne,
      imageTwo,
      imageThree,
      imageFour,
      imageFive,
      imageSix,
    ]
    setRandomImage(images[Math.floor(Math.random() * Math.floor(6))])
  }

  const [btnLoading, setBtnLoading] = useState({
    loading: false,
    error: false,
    network: false,
  })

  // handleUserChange Value Feild
  const handleUserChange = (email, value) => {
    setuserLogin((preState) => ({
      ...preState,
      [email]: value,
    }))
  }

  const handleError = (name, value) => {
    setError((preState) => ({
      ...preState,
      [name]: value,
    }))
  }

  // Call The imageGenerator Function In UseEffect
  useEffect(() => {
    imageGenerator()
  }, [])

  const validateForm = () => {
    if (!userLogin?.email.length > 0) {
      handleError(`emailError`, `Enter Email`)
    } else if (!regEx.test(userLogin.email.toLowerCase())) {
      handleError(`emailError`, `Enter Valid Email`)
    } else {
      handleError(`emailError`, ``)
    }
    if (!userLogin?.password.length > 0) {
      handleError(`passwordError`, `Enter Password`)
    } else {
      handleError(`passwordError`, ``)
    }
    handleError(`formSubmit`, true)
  }

  // handleSignIn Button
  const handleSignIn = (payload) => {
    try {
      fetch(` ${REACT_APP_BACKEND_LOGIN_API}`, {
        // mode: `no-cors`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: `POST`,
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.hasError === true) {
            setBtnLoading({ loading: false, error: true, network: false })
          } else {
            setBtnLoading({ loading: false, error: false, network: false })
            localStorage.setItem('token', res.data?.employee?.token)
            localStorage.setItem('name', res?.data?.employee?.name)
            navigate('/dashboard')
          }
        })
        .catch(() => {
          setBtnLoading({ loading: false, error: false, network: true })
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `Something went wrong!`,
      })
    }
  }

  useEffect(() => {
    if (
      error?.formSubmit &&
      !error?.emailError.length &&
      !error?.passwordError.length
    ) {
      handleSignIn(preparePayload())
      handleError(`formSubmit`, false)
      setBtnLoading({ loading: true, error: false, network: false })
    }
  }, [error])

  const preparePayload = () => {
    let data = {
      email: userLogin.email,
      password: userLogin.password,
    }
    return data
  }

  const something = (event) => {
    if (event.code === 'Enter') {
      validateForm()
    }
  }
  return (
    <BasicLayout image={randomImage}>
      <Card>
        <MDBox
          borderRadius="lg"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
          style={{
            backgroundColor: '#6854A1',
            boxShadow: '0px 4px 7px #6854A1',
          }}
        >
          <MDTypography
            variant="h4"
            fontWeight="medium"
            color="white"
            mt={1}
            mb={1}
          >
            Sign in
          </MDTypography>
        </MDBox>
        {btnLoading?.error ? (
          <Grid
            item
            xs={12}
            md={12}
            xl={12}
            sx={{ textAlign: 'center', paddingTop: '30px' }}
          >
            <span
              style={{
                minWith: '250px',
                margin: 'auto',
                color: 'red',
                padding: '0px 50px 0px 50px',
              }}
            >
              Invalid Credentials
            </span>
          </Grid>
        ) : null}
        {btnLoading?.network ? (
          <Grid
            item
            xs={12}
            md={12}
            xl={12}
            sx={{ textAlign: 'center', paddingTop: '30px' }}
          >
            <span
              style={{
                minWith: '250px',
                margin: 'auto',
                color: 'red',
                padding: '0px 50px 0px 50px',
              }}
            >
              Connect to the internet
            </span>
          </Grid>
        ) : null}
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onKeyPress={(e) => something(e)}>
            <MDBox mb={2}>
              <TextField
                label={error?.emailError?.length ? error?.emailError : 'Email'}
                id="email"
                name="email"
                type="text"
                variant="outlined"
                value={userLogin?.email}
                fullWidth
                onChange={(e) => {
                  handleUserChange('email', e.target.value)
                }}
                size="medium"
                error={error?.emailError?.length}
              />
            </MDBox>
            <MDBox mb={2}>
              <TextField
                id="password"
                name="password"
                type="password"
                label={
                  error?.passwordError?.length
                    ? error?.passwordError
                    : 'Password'
                }
                variant="outlined"
                value={userLogin?.password}
                fullWidth
                onChange={(e) => {
                  handleUserChange('password', e.target.value)
                }}
                size="medium"
                error={error?.passwordError?.length}
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              {btnLoading?.loading ? (
                <Grid
                  item
                  xs={12}
                  md={12}
                  xl={12}
                  sx={{ textAlign: 'center', paddingTop: '30px' }}
                >
                  <LoadingButton
                    loading
                    variant="outlined"
                    style={{
                      minWith: '250px',
                      margin: 'auto',
                      color: 'white',
                      background: '#2FAEB5',
                      padding: '0px 60px 0px 60px',
                    }}
                  />
                </Grid>
              ) : (
                <Grid sx={{ textAlign: 'center', paddingTop: '10px' }}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    onClick={() => validateForm()}
                    style={{
                      minWith: '250px',
                      margin: 'auto',
                      textAlign: 'center',
                      background: '#2FAEB5',
                    }}
                  >
                    sign in
                  </MDButton>
                </Grid>
              )}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  )
}

export default Login

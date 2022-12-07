import React, { useEffect, useState } from 'react'
import MDBox from 'components/MDBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { useNavigate } from 'react-router-dom'
import backgroundImage from 'assets/images/imageFour.jpg'
import { Grid, Card, TextField, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import Swal from 'sweetalert2'

import {
  nameregEx,
} from 'emailRegex'

import { REACT_APP_BACKEND_ACCOUNT_API } from "config/backendApi"

function Accountmanagement() {
  const [btnLoading, setBtnLoading] = useState({
    loading: false,
    error: false,
    network: false,
  })
  const [Errors, setErrors] = useState(``)
  let navigate = useNavigate()

  const [addEmployee, setaddEmployee] = useState({
    accountname: ``,
    accountdescription: ``,
  })

  const [error, setError] = useState({
    formSubmit: false,
    accountnameError: ``,
    accountdescriptionError: ``,
  })

  // handleUserChange Value Feild
  const handleAddUser = (data, value) => {
    setaddEmployee((preState) => ({
      ...preState,
      [data]: value,
    }))
  }

  const handleError = (dataname, value) => {
    setError((preState) => ({
      ...preState,
      [dataname]: value,
    }))
  }

  const ValidForm = () => {

    if (!addEmployee?.accountname.length) {
      handleError(`accountnameError`, `Enter AccountName`)
    }
    else if (!nameregEx.test(addEmployee?.accountname)) {
      handleError(`accountnameError`, `Enter Valid AccountName`)
    } else {
      handleError(`accountnameError`, ``)
    }

    if (!addEmployee?.accountdescription.length) {
      handleError(`accountdescriptionError`, `Enter Discription`)
    } else if (!nameregEx.test(addEmployee?.accountdescription)) {
      handleError(`accountdescriptionError`, `Enter Valid Discription`)
    }
    else {
      handleError(`accountdescriptionError`, ``)
    }
    handleError(`formSubmit`, true)
  }

  const addAccount = async (payload) => {
    setBtnLoading({ loading: true, error: false, network: false })
    try {
      fetch(`${REACT_APP_BACKEND_ACCOUNT_API}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.hasError === true) {
            setBtnLoading({ loading: false, error: false, network: false })
            setErrors(`${res.error.error}`)
          } else {
            Swal.fire({
              icon: 'success',
              title: `Success`,
              html: `<div class="badge-text">ACCOUNT CREATED.</div>`,
            }).then(() => {
              navigate('/accounts')
            })
            setBtnLoading({ loading: false, error: false, network: false })
          }
        })
        .catch(() => {
          setBtnLoading({ loading: false, error: true, network: false })
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
      !error?.accountnameError.length &&
      !error?.accountdescriptionError.length
    ) {
      addAccount(preparePayload())
      handleError(`formSubmit`, false)
      setBtnLoading({ loading: true, error: false, network: false })
    }
  }, [error])

  const preparePayload = () => {
    let data = {
      accountName: addEmployee.accountname,
      accountDescription: addEmployee.accountdescription,
      totalBalance: 0
    }
    return data
  }


  const something = (event) => {
    if (event.code === 'Enter') {
      ValidForm()
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox position="relative" mb={5}>
        <MDBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="18.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({
              functions: { rgba, linearGradient },
              palette: { gradients },
            }) =>
              `${linearGradient(
                rgba(gradients.info.main, 0.6),
                rgba(gradients.info.state, 0.6),
              )}, url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            overflow: 'hidden',
          }}
        />
        <Card
          sx={{
            position: 'relative',
            mt: -8,
            mx: 3,
            py: 6,
            px: 4,
          }}
        >
          <Grid container spacing={3} alignItems="center" sx={{ gap: '30px' }}>
            {btnLoading?.error ? (
              <div>
                <div>
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                    &nbsp;&nbsp;&nbsp;&nbsp; {Errors}
                  </span>
                </div>
              </div>
            ) : null}
            {btnLoading.network ? (
              <div>
                <div>
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                    &nbsp;&nbsp;&nbsp;&nbsp; Connect to the internet
                  </span>
                </div>
              </div>
            ) : null}
          </Grid>
          <MDBox mt={6} mb={3} m={1} onKeyPress={(e) => something(e)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  label={
                    error?.accountnameError?.length
                      ? error?.accountnameError
                      : 'ACCOUNT NAME'
                  }
                  id="accountname"
                  name="accountname"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={addEmployee?.accountname}
                  onChange={(e) => {
                    handleAddUser('accountname', e.target.value)
                  }}
                  size="medium"
                  error={error?.accountnameError?.length}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  label={
                    error?.accountdescriptionError?.length
                      ? error?.accountdescriptionError
                      : 'ACCOUNT DESCRIPTION'
                  }
                  id="accountdescription"
                  name="accountdescription"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={addEmployee?.accountdescription}
                  onChange={(e) => {
                    handleAddUser('accountdescription', e.target.value)
                  }}
                  size="medium"
                  error={error?.accountdescriptionError?.length}
                />
              </Grid>
            </Grid>
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
              <Grid
                item
                xs={12}
                md={12}
                xl={12}
                sx={{ textAlign: 'center', paddingTop: '30px' }}
              >
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => ValidForm()}
                  style={{
                    minWith: '250px',
                    margin: 'auto',
                    color: 'white',
                    background: '#2FAEB5',
                  }}
                >
                  ADD
                </Button>
              </Grid>
            )}
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  )
}

export default Accountmanagement

import React, { useEffect, useState } from 'react'
import MDBox from 'components/MDBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { useNavigate } from 'react-router-dom'
import backgroundImage from 'assets/images/imageFour.jpg'
import { Grid, Card, TextField, Button, MenuItem } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import Swal from 'sweetalert2'
import { LocalizationProvider, MobileDatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import CircularProgress from '@mui/material/CircularProgress'
import { REACT_APP_BACKEND_EXPENSE_API, REACT_APP_BACKEND_ACCOUNTSNAMES_GET_API } from "config/backendApi"

import { nameregEx } from 'emailRegex'

function Expensetracker() {
  const [btnLoading, setBtnLoading] = useState({
    loading: false,
    error: false,
    network: false,
  })
  const [Errors, setErrors] = useState(``)
  const [file, setFile] = useState(``)
  let navigate = useNavigate()
  const [datevalue, setDate] = useState(new Date())
  const [dropdownOptions, setdropdownOptions] = useState([])
  const [dropdownLoading, setdropdownLoading] = useState({ loading: false })

  const [addEmployee, setaddEmployee] = useState({
    expensedetail: ``,
    amount: ``,
    datevalue: ``,
    accountname: ``,
  })

  const [error, setError] = useState({
    formSubmit: false,
    expensedetailError: ``,
    amountError: ``,
    dateError: ``,
    accountnameError: ``,
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
    if (!addEmployee?.expensedetail.length) {
      handleError(`expensedetailError`, `Enter Detail`)
    } else if (!nameregEx.test(addEmployee?.expensediscription)) {
      handleError(`expensedetailError`, `Enter Valid Detail`)
    } else {
      handleError(`expensedetailError`, ``)
    }

    if (!addEmployee?.amount.length) {
      handleError(`amountError`, `Enter Amount`)
    } else {
      handleError(`amountError`, ``)
    }

    if (datevalue > new Date()) {
      handleError(`dateError`, `Enter Valid Date`)
    } else {
      handleError(`dateError`, ``)
    }

    if (!addEmployee?.accountname?.length) {
      handleError(`accountnameError`, `Enter Account Name`)
    } else if (!nameregEx.test(addEmployee?.accountname)) {
      handleError(`accountnameError`, `Enter Valid Account Name`)
    }

    handleError(`formSubmit`, true)
  }

  const addAccount = async (payload) => {
    setBtnLoading({ loading: true, error: false, network: false })
    try {
      fetch(`${REACT_APP_BACKEND_EXPENSE_API}`, {
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
              html: `<div class="badge-text">EXPENCE ADDED.</div>`,
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

  const DropdownApi = async () => {
    setdropdownLoading({ loading: true })
    try {
      fetch(` ${REACT_APP_BACKEND_ACCOUNTSNAMES_GET_API}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          return res.json()
        })
        // .then((res) => res.json())
        .then((dropdowndata) => {
          setdropdownOptions(dropdowndata?.data?.accounts)
          setdropdownLoading({ loading: false })
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: `Account Name Not Found!`,
          })
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `Something went wrong!`,
      })
    }
  }

  useEffect(() => {
    DropdownApi()
  }, [])

  useEffect(() => {
    if (
      error?.formSubmit &&
      !error?.expensedetailError.length &&
      !error?.amountError.length &&
      !error?.dateError.length &&
      !error?.accountnameError.length
    ) {
      addAccount(preparePayload())
      handleError(`formSubmit`, false)
      setBtnLoading({ loading: true, error: false, network: false })
    }
  }, [error])

  const preparePayload = () => {
    let data = {
      expenseDetail: addEmployee.expensedetail,
      amount: Number(addEmployee.amount),
      date: datevalue,
      month: addEmployee.month,
      accountName: addEmployee.accountname,
    }
    if (file.length) {
      data.recipt = file
    }
    return data
  }

  const something = (event) => {
    if (event.code === 'Enter') {
      ValidForm()
    }
  }

  const handleChange = (newValue) => {
    setDate(newValue)
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      // if (file) {
      //   reader.readAsDataURL(file)
      // }
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleImage = async (file) => {
    const fileTobase64 = await toBase64(file)
    setFile(fileTobase64)
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
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  label={
                    error?.expensedetailError?.length
                      ? error?.expensedetailError
                      : 'EXPENSE DETAIL'
                  }
                  id="expensedetail"
                  name="expensedetail"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={addEmployee?.expensedetail}
                  onChange={(e) => {
                    handleAddUser('expensedetail', e.target.value)
                  }}
                  size="medium"
                  error={error?.expensedetailError?.length}
                />
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  label={
                    error?.amountError?.length ? error?.amountError : 'AMOUNT'
                  }
                  id="amount"
                  name="amount"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={addEmployee?.amount}
                  onChange={(e) => {
                    handleAddUser('amount', e.target.value)
                  }}
                  size="medium"
                  error={error?.amountError?.length}
                />
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="EXPENSE DATE"
                    inputFormat="MM/dd/yyyy"
                    variant="outlined"
                    onChange={handleChange}
                    value={datevalue}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        label={
                          error?.dateError?.length
                            ? error?.dateError
                            : 'EXPENSE DATE'
                        }
                        error={error?.dateError?.length}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={4} xl={4}></Grid>
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  select
                  id="accountname"
                  name="accountname"
                  type="text"
                  variant="outlined"
                  value={addEmployee?.accountname}
                  label={
                    error?.accountnameError?.length
                      ? error?.accountnameError
                      : 'ACCOUNT NAME'
                  }
                  fullWidth
                  onChange={(e) => {
                    handleAddUser('accountname', e.target.value)
                  }}
                  size="medium"
                  error={error?.accountnameError?.length}
                  InputProps={{
                    style: {
                      padding: 10,
                    },
                  }}
                >
                  {dropdownLoading.loading ? (
                    <MenuItem>
                      <CircularProgress
                        style={{ color: '#2FAEB5', marginLeft: '40%' }}
                      />
                    </MenuItem>
                  ) : (
                    dropdownOptions.map((option, ind) => (
                      <MenuItem key={ind} value={option.accountName}>
                        {option.accountName}
                      </MenuItem>
                    ))
                  )}
                </TextField>
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
              <>
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
                  <label htmlFor="upload-photo">
                    <input
                      accept="image/png, image/jpeg"
                      style={{ display: 'none' }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      onChange={(e) => handleImage(e.target.files[0])}
                    />
                    <Button
                      component="span"
                      variant="contained"
                      style={{
                        // margin: 'auto',
                        // color: 'white',
                        // background: '#2FAEB5',
                        // marginLeft: '140px',
                        minWith: '250px',
                        margin: 'auto',
                        color: 'white',
                        background: '#2FAEB5',
                        marginLeft: '20px',
                      }}
                    >
                      Upload Receipt
                    </Button>
                  </label>
                </Grid>
              </>
            )}
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  )
}

export default Expensetracker

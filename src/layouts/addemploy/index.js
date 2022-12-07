import React, { useEffect, useState } from 'react'
import MDBox from 'components/MDBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { useNavigate } from 'react-router-dom'
import backgroundImage from 'assets/images/imageFour.jpg'
import bgImage from 'assets/images/bg-profile.png'
import { Grid, Card, TextField, Button, MenuItem } from '@mui/material'
import Resizer from 'react-image-file-resizer'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LoadingButton from '@mui/lab/LoadingButton'
import InputMask from 'react-input-mask'
import Swal from 'sweetalert2'
import { REACT_APP_BACKEND_API } from "config/backendApi"

import {
  regEx,
  designationregEx,
  cnicregEx,
  phoneregEx,
  attendance,
} from 'emailRegex'

function Addemploy() {
  const [image, setImage] = useState(``)
  const [birthdayDate, setBirthdayDate] = useState(new Date())
  const [joiningDate, setJoiningDate] = useState(new Date())
  const [imageError, setImageError] = useState(``)
  const [btnLoading, setBtnLoading] = useState({
    loading: false,
    error: false,
    network: false,
  })
  const [errors, setErrors] = useState(``)
  let navigate = useNavigate()

  const [addEmployee, setAddEmployee] = useState({
    fullName: ``,
    callName: ``,
    designation: ``,
    paidLeaves: ``,
    salary: ``,
    cnic: ``,
    birthdayDate: ``,
    gender: ``,
    email: ``,
    phone: ``,
    whatsapp: ``,
    address: ``,
    bloodGroup: ``,
    emergency: ``,
    relation: ``,
    attendance: ``,
    status: `EMPLOYED`,
    joiningDate: ``,
    healthAllowence: ``,
    travelAllowence: ``,
    residenceAllowence: ``,
  })

  const [error, setError] = useState({
    formSubmit: false,
    fullNameError: ``,
    callNameError: ``,
    designationError: ``,
    cnicError: ``,
    dateError: ``,
    genderError: ``,
    emailError: ``,
    phoneError: ``,
    whatsappError: ``,
    addressError: ``,
    bloodGroupError: ``,
    emergencyError: ``,
    relationError: ``,
    attendanceError: ``,
    joiningDateError: ``,
  })

  // handleUserChange Value Feild
  const handleAddUser = (data, value) => {
    setAddEmployee((preState) => ({
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
    if (!image?.length) {
      setImageError(`Insert Image`)
    } else {
      setImageError(``)
    }

    if (!addEmployee?.fullName.length) {
      handleError(`fullNameError`, `Enter FullName`)
    } else {
      handleError(`fullNameError`, ``)
    }

    if (!addEmployee?.callName.length) {
      handleError(`callNameError`, `Enter CallName`)
    } else {
      handleError(`callNameError`, ``)
    }

    if (!addEmployee?.designation.length) {
      handleError(`designationError`, `Enter Designation`)
    } else if (!designationregEx.test(addEmployee?.designation)) {
      handleError(`designationError`, `Enter Valid Designation`)
    } else {
      handleError(`designationError`, ``)
    }

    if (!addEmployee?.cnic.length) {
      handleError(`cnicError`, `Enter Cnic`)
    } else if (!cnicregEx.test(addEmployee?.cnic)) {
      handleError(`cnicError`, `Enter Valid Cnic`)
    } else {
      handleError(`cnicError`, ``)
    }

    if (birthdayDate > new Date()) {
      handleError(`dateError`, `Enter Valid Date`)
    } else {
      handleError(`dateError`, ``)
    }

    if (!addEmployee?.gender.length) {
      handleError(`genderError`, `Enter Gender`)
    } else {
      handleError(`genderError`, ``)
    }

    if (!addEmployee?.email.length) {
      handleError(`emailError`, `Enter Email`)
    } else if (!regEx.test(addEmployee?.email)) {
      handleError(`emailError`, `Enter Valid Email`)
    } else {
      handleError(`emailError`, ``)
    }

    if (!addEmployee?.phone.length) {
      handleError(`phoneError`, `Enter Phone`)
    } else if (!phoneregEx.test(addEmployee?.phone)) {
      handleError(`phoneError`, `Enter Valid Phone`)
    } else {
      handleError(`phoneError`, ``)
    }

    if (!addEmployee?.whatsapp.length) {
      handleError(`whatsappError`, `Enter Whatsapp`)
    } else if (!phoneregEx.test(addEmployee?.whatsapp)) {
      handleError(`whatsappError`, `Enter Valid Whatsapp`)
    } else {
      handleError(`whatsappError`, ``)
    }

    if (!addEmployee?.address.length) {
      handleError(`addressError`, `Enter Address`)
    } else if (addEmployee?.address.length < 10) {
      handleError(
        `addressError`,
        `Address length must be at least 10 characters long`,
      )
    } else {
      handleError(`addressError`, ``)
    }

    if (!addEmployee?.bloodGroup.length) {
      handleError(`bloodGroupError`, `Enter Bloodgroup`)
    } else {
      handleError(`bloodGroupError`, ``)
    }

    if (!addEmployee?.emergency.length) {
      handleError(`emergencyError`, `Enter Emergency`)
    } else if (!phoneregEx.test(addEmployee?.emergency)) {
      handleError(`emergencyError`, `Enter Valid Emergency`)
    } else {
      handleError(`emergencyError`, ``)
    }

    if (!addEmployee?.relation.length) {
      handleError(`relationError`, `Enter Relation`)
    } else {
      handleError(`relationError`, ``)
    }

    if (!addEmployee?.attendance.length) {
      handleError(`attendanceError`, `Enter Attendance`)
    } else if (!attendance.test(addEmployee?.attendance)) {
      handleError(`attendanceError`, `Enter Number`)
    } else {
      handleError(`attendanceError`, ``)
    }

    if (joiningDate > new Date()) {
      handleError(`joiningDateError`, `Enter Valid Date`)
    } else {
      handleError(`joiningDateError`, ``)
    }
    handleError(`formSubmit`, true)
  }

  const addEmployeeData = async (payload) => {
    setBtnLoading({ loading: true, error: false, network: false })
    try {
      fetch(`${REACT_APP_BACKEND_API}`, {
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
            if (
              res.error.error ===
              'Employee creation failed due to duplicate cnic.'
            ) {
              handleError(`cnicError`, `Duplicate Cnic`)
            }
            if (
              res.error.error ===
              'Employee creation failed due to duplicate email.'
            ) {
              handleError(`emailError`, `Duplicate Email`)
            }
            if (
              res.error.error ===
              'Employee creation failed due to duplicate _attendanceId.'
            ) {
              handleError(`attendanceError`, `Duplicate Attendance ID`)
            }
            setBtnLoading({ loading: false, error: false, network: false })
            setErrors(`${res.error.error}`)
          } else {
            Swal.fire({
              icon: 'success',
              title: `Success`,
              html: `<div class="badge-text">RECORD CREATED.</div>`,
            }).then(() => {
              navigate('/employees')
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
      image?.length &&
      !error?.fullNameError.length &&
      !error?.callNameError.length &&
      !error?.designationError.length &&
      !error?.cnicError.length &&
      !error?.dateError.length &&
      !error?.genderError.length &&
      !error?.emailError.length &&
      !error?.phoneError.length &&
      !error?.whatsappError.length &&
      !error?.addressError.length &&
      !error?.bloodGroupError.length &&
      !error?.emergencyError.length &&
      !error?.relationError.length &&
      !error?.attendanceError.length &&
      !error?.joiningDateError.length
    ) {
      addEmployeeData(preparePayload())
      handleError(`formSubmit`, false)
      setBtnLoading({ loading: true, error: false, network: false })
    }
  }, [error])

  const preparePayload = () => {
    let data = {
      img: image,
      fullName: addEmployee.fullName,
      callName: addEmployee.callName,
      designation: addEmployee.designation,
      paidLeaves: addEmployee.paidLeaves.length === 0 ? 0 : Number(addEmployee.paidLeaves),
      cnic: addEmployee.cnic,
      dob: birthdayDate,
      gender: addEmployee.gender,
      email: addEmployee.email.trim(),
      mobile: addEmployee.phone,
      whatsapp: addEmployee.whatsapp,
      address: addEmployee.address,
      bloodGroup: addEmployee.bloodGroup,
      emergencyInfo: {
        contactNo: addEmployee.emergency,
        relation: addEmployee.relation,
      },
      _attendanceId: addEmployee.attendance,
      status: addEmployee.status,
      joiningDate: joiningDate,
      healthAllowence: addEmployee.healthAllowence.length === 0 ? 0 : Number(addEmployee?.healthAllowence),
      travelAllowence: addEmployee.travelAllowence.length === 0 ? 0 : Number(addEmployee?.travelAllowence),
      residenceAllowence: addEmployee.residenceAllowence.length === 0 ? 0 : Number(addEmployee?.residenceAllowence),
    }
    if (addEmployee.salary.length === 0) {
      data.monthlySalary = 0
    } else {
      data.monthlySalary = addEmployee.salary
    }
    return data
  }

  const genderOptions = [
    {
      value: 'MALE',
      label: 'MALE',
    },
    {
      value: 'FEMALE',
      label: 'FEMALE',
    },
  ]

  const bloodGroupOptions = [
    {
      value: 'A+',
      label: 'A+',
    },
    {
      value: 'A-',
      label: 'A-',
    },
    {
      value: 'B+',
      label: 'B+',
    },
    {
      value: 'B-',
      label: 'B-',
    },
    {
      value: 'O+',
      label: 'O+',
    },
    {
      value: 'O-',
      label: 'O-',
    },
    {
      value: 'AB+',
      label: 'AB+',
    },
    {
      value: 'AB-',
      label: 'AB-',
    },
  ]

  const relationOptions = [
    {
      value: 'FATHER',
      label: 'FATHER',
    },
    {
      value: 'MOTHER',
      label: 'MOTHER',
    },
    {
      value: 'BROTHER',
      label: 'BROTHER',
    },
    {
      value: 'SISTER',
      label: 'SISTER',
    },
    {
      value: 'WIFE',
      label: 'WIFE',
    },
    {
      value: 'FRIEND',
      label: 'FRIEND',
    },
    {
      value: 'OTHER',
      label: 'OTHER',
    },
  ]

  const statusOptions = [
    {
      value: 'EMPLOYED',
      label: 'EMPLOYED',
    },
    {
      value: 'INTERNEE',
      label: 'INTERNEE',
    },
  ]

  const handleBirthdayDate = (selectedBirthdayDate) => {
    setBirthdayDate(selectedBirthdayDate)
  }

  const handleJoiningDate = (selectedJoiningDate) => {
    setJoiningDate(selectedJoiningDate)
  }
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        600,
        600,
        `JPEG`,
        120,
        0,
        (uri) => {
          resolve(uri)
        },
        `base64`,
      )
    })

  const handleFLogo = async (file) => {
    if (Object.keys(file).length === 0) return
    if (file[0].type.includes(`image`)) {
      const base64 = await resizeFile(file[0])
      setImage(base64)
    }
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
            py: 2,
            px: 4,
          }}
        >
          <Grid container spacing={3} alignItems="center" sx={{ gap: '30px' }}>
            <Grid item xs={12} md={4} xl={4}>
              <label htmlFor="icon-button-file">
                <input
                  accept="image/png, image/jpeg"
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => {
                    handleFLogo(e.target.files)
                  }}
                  style={{
                    display: 'none',
                  }}
                />
                <img
                  src={image ? image : bgImage}
                  alt="profile-image"
                  style={{
                    height: '254px',
                    width: '254px',
                    borderRadius: '60%',
                    marginTop: '-126px',
                    cursor: 'pointer',
                    marginBottom: '14px',
                    boxShadow: 'rgba(0, 0, 0, 0.55) 0px 6px 20px',
                  }}
                />
                <span
                  style={{
                    margin: 'auto',
                    color: 'red',
                    fontSize: '18px',
                    padding: '0px 0px 0px 78px',
                  }}
                >
                  {imageError}
                </span>
              </label>
            </Grid>
            {btnLoading?.error ? (
              <div>
                <div>
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                    &nbsp;&nbsp;&nbsp;&nbsp; {errors}
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
                    error?.fullNameError?.length
                      ? error?.fullNameError
                      : 'FULL NAME'
                  }
                  id="fullname"
                  name="fullname"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={addEmployee?.fullName}
                  onChange={(e) => {
                    handleAddUser('fullName', e.target.value)
                  }}
                  size="medium"
                  error={error?.fullNameError?.length}
                />
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  label={
                    error?.callNameError?.length
                      ? error?.callNameError
                      : 'CALL NAME'
                  }
                  id="callname"
                  name="callname"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={addEmployee?.callName}
                  onChange={(e) => {
                    handleAddUser('callName', e.target.value)
                  }}
                  size="medium"
                  error={error?.callNameError?.length}
                />
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  label={
                    error?.designationError?.length
                      ? error?.designationError
                      : 'DESIGNATION'
                  }
                  id="designation"
                  name="designation"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={addEmployee?.designation}
                  onChange={(e) => {
                    handleAddUser('designation', e.target.value)
                  }}
                  size="medium"
                  error={error?.designationError?.length}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  type="number"
                  fullWidth
                  id="paidleaves"
                  name="paidleaves"
                  label="PAID LEAVES"
                  variant="outlined"
                  value={addEmployee?.paidLeaves}
                  onChange={(e) => {
                    handleAddUser('paidLeaves', e.target.value)
                  }}
                  size="medium"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  label={'SALARY'}
                  id="salary"
                  name="salary"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={addEmployee?.salary}
                  onChange={(e) => {
                    handleAddUser('salary', e.target.value)
                  }}
                  size="medium"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <InputMask
                  mask="99999-9999999-9"
                  disabled={false}
                  maskChar=" "
                  value={addEmployee?.cnic}
                  onChange={(e) => {
                    handleAddUser('cnic', e.target.value)
                  }}
                >
                  {() => (
                    <TextField
                      label={
                        error?.cnicError?.length ? error?.cnicError : 'CNIC'
                      }
                      id="cnic"
                      name="cnic"
                      type="text"
                      variant="outlined"
                      fullWidth
                      size="medium"
                      error={error?.cnicError?.length}
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="DATE OF BIRTH"
                    inputFormat="MM/dd/yyyy"
                    variant="outlined"
                    value={birthdayDate}
                    onChange={handleBirthdayDate}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        label={
                          error?.dateError?.length
                            ? error?.dateError
                            : 'DATE OF BIRTH'
                        }
                        error={error?.dateError?.length}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  select
                  type="text"
                  fullWidth
                  id="gender"
                  name="gender"
                  label={
                    error?.genderError?.length ? error?.genderError : 'GENDER'
                  }
                  variant="outlined"
                  value={addEmployee?.gender}
                  onChange={(e) => {
                    handleAddUser('gender', e.target.value)
                  }}
                  size="medium"
                  error={error?.genderError?.length}
                  InputProps={{
                    style: {
                      padding: 10,
                    },
                  }}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  id="email"
                  name="email"
                  type="text"
                  variant="outlined"
                  value={addEmployee?.email}
                  label={
                    error?.emailError?.length ? error?.emailError : 'EMAIL'
                  }
                  fullWidth
                  onChange={(e) => {
                    handleAddUser('email', e.target.value)
                  }}
                  size="medium"
                  error={error?.emailError?.length}
                />
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <InputMask
                  mask="+\923999999999"
                  disabled={false}
                  maskChar=""
                  value={addEmployee?.phone}
                  onChange={(e) => {
                    handleAddUser('phone', e.target.value)
                  }}
                  size="medium"
                >
                  {() => (
                    <TextField
                      label={
                        error?.phoneError?.length ? error?.phoneError : 'PHONE'
                      }
                      error={error?.phoneError?.length}
                      id="phone"
                      name="phone"
                      variant="outlined"
                      type="phone"
                      fullWidth
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <InputMask
                  mask="+\923999999999"
                  disabled={false}
                  maskChar=" "
                  value={addEmployee?.whatsapp}
                  onChange={(e) => {
                    handleAddUser('whatsapp', e.target.value)
                  }}
                  size="medium"
                >
                  {() => (
                    <TextField
                      label={
                        error?.whatsappError?.length
                          ? error?.whatsappError
                          : 'WHATSAPP'
                      }
                      error={error?.whatsappError?.length}
                      id="whatsapp"
                      name="whatsapp"
                      type="phone"
                      fullWidth
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12} md={12} xl={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label={
                    error?.addressError?.length
                      ? error?.addressError
                      : 'ADDRESS'
                  }
                  variant="outlined"
                  value={addEmployee?.address}
                  onChange={(e) => {
                    handleAddUser('address', e.target.value)
                  }}
                  size="medium"
                  error={error?.addressError?.length}
                />
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  fullWidth
                  select
                  type="text"
                  id="bloodgroup"
                  name="bloodgroup"
                  label={
                    error?.bloodGroupError?.length
                      ? error?.bloodGroupError
                      : 'BLOODGROUP'
                  }
                  variant="outlined"
                  value={addEmployee?.bloodGroup}
                  onChange={(e) => {
                    handleAddUser('bloodGroup', e.target.value)
                  }}
                  size="medium"
                  error={error?.bloodGroupError?.length}
                  InputProps={{
                    style: {
                      padding: 10,
                    },
                  }}
                >
                  {bloodGroupOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <InputMask
                  mask="+\923999999999"
                  disabled={false}
                  maskChar=""
                  value={addEmployee?.emergency}
                  onChange={(e) => {
                    handleAddUser('emergency', e.target.value)
                  }}
                  size="medium"
                >
                  {() => (
                    <TextField
                      label={
                        error?.emergencyError?.length
                          ? error?.emergencyError
                          : 'EMERGENCY NO'
                      }
                      error={error?.emergencyError?.length}
                      variant="outlined"
                      id="emergency"
                      name="emergency"
                      type="phone"
                      fullWidth
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  select
                  label={
                    error?.relationError?.length
                      ? error?.relationError
                      : 'RELATION'
                  }
                  variant="outlined"
                  value={addEmployee?.relation}
                  type="text"
                  id="relation"
                  name="relation"
                  fullWidth
                  onChange={(e) => {
                    handleAddUser('relation', e.target.value)
                  }}
                  error={error?.relationError?.length}
                  size="medium"
                  InputProps={{
                    style: {
                      padding: 10,
                    },
                  }}
                >
                  {relationOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  fullWidth
                  id="attendance"
                  name="attendance"
                  label={
                    error?.attendanceError?.length
                      ? error?.attendanceError
                      : 'ATTENDANCE ID'
                  }
                  variant="outlined"
                  value={addEmployee?.attendance}
                  onChange={(e) => {
                    handleAddUser('attendance', e.target.value)
                  }}
                  size="medium"
                  error={error?.attendanceError?.length}
                />
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  select
                  id="status"
                  name="status"
                  label="STATUS"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={addEmployee?.status}
                  onChange={(e) => {
                    handleAddUser('status', e.target.value)
                  }}
                  size="medium"
                  InputProps={{
                    style: {
                      padding: 10,
                    },
                  }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="MM/dd/yyyy"
                    variant="outlined"
                    value={joiningDate}
                    onChange={handleJoiningDate}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        label={
                          error?.joiningDateError?.length
                            ? error?.joiningDateError
                            : 'JOINING DATE'
                        }
                        error={error?.joiningDateError?.length}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  type="number"
                  fullWidth
                  id="healthallowence"
                  name="healthallowence"
                  label="HEALTH ALLOWENCE"
                  variant="outlined"
                  value={addEmployee?.healthAllowence}
                  onChange={(e) => {
                    handleAddUser(`healthAllowence`, e.target.value)
                  }}
                  size="medium"
                />
              </Grid>

              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  type="number"
                  fullWidth
                  id="travelallowence"
                  name="travelallowence"
                  label="TRAVEL ALLOWENCE"
                  variant="outlined"
                  value={addEmployee?.travelAllowence}
                  onChange={(e) => {
                    handleAddUser(`travelAllowence`, e.target.value)
                  }}
                  size="medium"
                />
              </Grid>

              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  type="number"
                  fullWidth
                  id="residenceallowence"
                  name="residenceallowence"
                  label="RESIDENCE ALLOWENCE"
                  variant="outlined"
                  value={addEmployee?.residenceAllowence}
                  onChange={(e) => {
                    handleAddUser(`residenceAllowence`, e.target.value)
                  }}
                  size="medium"
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
                  CREATE
                </Button>
              </Grid>
            )}
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  )
}

export default Addemploy

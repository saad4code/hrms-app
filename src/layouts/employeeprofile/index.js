import React, { useEffect, useState } from 'react'
import MDBox from 'components/MDBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { useParams, useNavigate } from 'react-router-dom'
import backgroundImage from 'assets/images/imageFour.jpg'
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  CircularProgress,
  Card,
} from '@mui/material'
import Resizer from 'react-image-file-resizer'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LoadingButton from '@mui/lab/LoadingButton'
import bgImage from 'assets/images/bg-profile.png'
import InputMask from 'react-input-mask'
import Swal from 'sweetalert2'
import { REACT_APP_BACKEND_API } from "config/backendApi"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import {
  regEx,
  nameregEx,
  designationregEx,
  cnicregEx,
  phoneregEx,
} from 'emailRegex'

function Overview() {
  const [iMage, setImage] = useState(null)
  const [name, setName] = useState(``)
  const [EcallName, setCallname] = useState(``)
  const [desiGnation, setDesignation] = useState(``)
  const [monthlySalary, setmonthlySalary] = useState(0)
  const [cnIC, setCnic] = useState(``)
  const [datevalue, setDate] = useState(``)
  const [genDer, setGender] = useState(``)
  const [emaIl, setEmail] = useState(``)
  const [phOne, setPhone] = useState(``)
  const [wattsApp, setWattsapp] = useState(``)
  const [addRess, setAddress] = useState(``)
  const [bloodGroup, setBloodGroup] = useState(``)
  const [status, setStatus] = useState(``)
  const [emerGency, setEmergency] = useState(``)
  const [relaTion, setRelation] = useState(``)
  const [healthAllowence, setHealthAllowence] = useState(0)
  const [travelAllowence, setTravelAllowence] = useState(0)
  const [residenceAllowence, setResidenceAllowence] = useState(0)
  const [paidLeaves, setpaidLeaves] = useState(0)
  const [document, setdocument] = useState(``)
  const [uploadedFilename, setuploadedFilename] = useState(``)

  const [open, setOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(``);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let navigate = useNavigate()
  const { Id } = useParams()
  const [btnLoading, setBtnLoading] = useState({
    loading: false,
    error: false,
    network: false,
  })
  const [onbtnLoad, setonbtnLoad] = useState({
    loading: false,
    error: false,
    network: false,
  })
  const [employData, setEmployData] = useState([])
  const [Errors, setErrors] = useState(``)

  const [error, setError] = useState({
    formSubmit: false,
    nameError: ``,
    callnameError: ``,
    designationError: ``,
    cnicError: ``,
    emailError: ``,
    phoneError: ``,
    whatsappError: ``,
    addressError: ``,
    emergencyError: ``,
    dateError: ``,
  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: "80%",
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleFileChange = (file) => {
    if (file.length === 1) {
      if (file[0]?.size > 3000000) {
        Swal.fire({
          icon: 'error',
          text: 'File size is too large',
        })
      } else {
        fileToBase64(file[0], (err, base64) => {
          if (base64) {
            // handleInputChange(`document`, base64)
            setdocument(base64)
          }
        })
      }
    } else {
      setdocument("")
    }
  }


  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file)
    }
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }

  const getSingleEmployee = async () => {
    try {
      setBtnLoading({ loading: true, error: false, network: false })
      fetch(` ${REACT_APP_BACKEND_API}/${Id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        // .then((response) => response.json())
        .then((res) => {
          return res.json()
        })
        .then((dataEmploy) => {
          if (dataEmploy.hasError === true) {
            setBtnLoading({ loading: false, error: true, network: false })
          } else {
            setBtnLoading({ loading: false, error: false, network: false })
            setEmployData(dataEmploy.data.employee)
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
    getSingleEmployee()
  }, [])

  const postData = async (payload) => {
    setonbtnLoad({ loading: true, error: false, network: false })
    fetch(`${REACT_APP_BACKEND_API}/${Id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        ...payload,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          return res.json().then((text) => {
            if (text.error.error === 'Update failed due to duplicate email.') {
              handleError(`emailError`, `Duplicate Email`)
            }
            if (text.error.error === `Incoming request body can't be empty.`) {
              Swal.fire({
                icon: 'error',
                title: `Error`,
                html: `<div class="badge-text">Nothing Update.</div>`,
              })
            }
            if (text.error.error === 'Update failed due to duplicate cnic.') {
              handleError(`cnicError`, `Duplicate Cnic`)
            }
            setonbtnLoad({ loading: false, error: false, network: false })
            setErrors(`${text.error.error}`)
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: `Success`,
            html: `<div class="badge-text">RECORD UPDATE.</div>`,
          }).then(() => {
            navigate('/employees')
          })
          res.json()
          setonbtnLoad({ loading: false, error: false, network: false })
        }
      })
      .catch(() => {
        setonbtnLoad({ loading: false, error: false, network: true })
      })
  }

  const handleError = (name, value) => {
    setError((preState) => ({
      ...preState,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (
      error?.formSubmit &&
      !error?.nameError.length &&
      !error?.callnameError.length &&
      !error?.designationError.length &&
      !error?.cnicError.length &&
      !error?.emailError.length &&
      !error?.phoneError.length &&
      !error?.whatsappError.length &&
      !error?.addressError.length &&
      !error?.emergencyError.length &&
      !error?.dateError.length
    ) {
      postData(preparePayload())
      handleError(`formSubmit`, false)
      setonbtnLoad({ loading: true, error: false, network: false })
    }
  }, [error])

  const preparePayload = () => {
    let data = {}

    if (iMage !== employData.photo) {
      data.photo = iMage;
    }
    if (name !== employData.fullName) {
      data.fullName = name;
    }
    if (EcallName !== employData.callName) {
      data.callName = EcallName;
    }
    if (desiGnation !== employData.designation) {
      data.designation = desiGnation
    }

    if (monthlySalary !== employData.monthlySalary) {
      data.monthlySalary = monthlySalary ? monthlySalary : 0
    }

    if (cnIC !== employData.cnic) {
      data.cnic = cnIC;
    }
    if (datevalue !== employData.dob) {
      data.dob = datevalue;
    }
    if (genDer !== employData.gender) {
      data.gender = genDer;
    }
    if (emaIl !== employData.email) {
      data.email = emaIl;
    }
    if (phOne !== employData.mobile) {
      data.mobile = phOne
    }
    if (wattsApp !== employData.whatsapp) {
      data.whatsapp = wattsApp;
    }
    if (addRess !== employData.address) {
      data.address = addRess;
    }
    if (bloodGroup !== employData.bloodGroup) {
      data.bloodGroup = bloodGroup
    }
    if (status !== employData.status) {
      data.status = status;
    }
    let emergencyInfo = {}
    if (emerGency !== employData?.emergencyInfo?.contactNo) {
      emergencyInfo.contactNo = emerGency;
    }

    if (relaTion !== employData?.emergencyInfo?.relation) {
      emergencyInfo.relation = relaTion;
    }
    if (healthAllowence !== employData.healthAllowence) {
      data.healthAllowence = healthAllowence ? healthAllowence : 0
    }
    if (travelAllowence !== employData.travelAllowence) {
      data.travelAllowence = travelAllowence ? travelAllowence : 0
    }
    if (residenceAllowence !== employData.residenceAllowence) {
      data.residenceAllowence = residenceAllowence ? residenceAllowence : 0
    }
    if (paidLeaves !== employData.paidLeaves) {
      data.paidLeaves = paidLeaves ? paidLeaves : 0
    }

    if (document.length) {
      // data.documents = [document]
      data.documents = {
        documentName: uploadedFilename,
        documentBase64: document,
      }
    }
    if (`contactNo` in emergencyInfo || `relation` in emergencyInfo) {
      data.emergencyInfo = emergencyInfo
    }
    return data
  }

  const ValidForm = () => {
    if (!name?.length) {
      handleError(`nameError`, `Enter FullName`)
    } else if (!nameregEx.test(name)) {
      handleError(`nameError`, `Enter Valid FullName`)
    } else {
      handleError(`nameError`, ``)
    }

    if (!EcallName?.length) {
      handleError(`callnameError`, `Enter CallName`)
    } else {
      handleError(`callnameError`, ``)
    }

    if (!desiGnation?.length) {
      handleError(`designationError`, `Enter Designation`)
    } else if (!designationregEx.test(desiGnation)) {
      handleError(`designationError`, `Enter Valid Designation`)
    } else {
      handleError(`designationError`, ``)
    }

    if (!cnIC?.length) {
      handleError(`cnicError`, `Enter CNIC`)
    } else if (!cnicregEx.test(cnIC)) {
      handleError(`cnicError`, `Enter Valid Cnic`)
    } else {
      handleError(`cnicError`, ``)
    }

    if (datevalue > new Date()) {
      handleError(`dateError`, `Enter Valid Date`)
    } else {
      handleError(`dateError`, ``)
    }

    if (!emaIl?.length) {
      handleError(`emailError`, `Enter Email`)
    } else if (!regEx.test(emaIl)) {
      handleError(`emailError`, `Enter Valid Email`)
    } else {
      handleError(`emailError`, ``)
    }

    if (!phOne?.length) {
      handleError(`phoneError`, `Enter Phone`)
    } else if (!phoneregEx.test(phOne)) {
      handleError(`phoneError`, `Enter Valid Phone`)
    } else {
      handleError(`phoneError`, ``)
    }

    if (!wattsApp?.length) {
      handleError(`whatsappError`, `Enter Whatsapp`)
    } else if (!phoneregEx.test(wattsApp)) {
      handleError(`whatsappError`, `Enter Valid Whatsapp`)
    } else {
      handleError(`whatsappError`, ``)
    }

    if (!addRess?.length) {
      handleError(`addressError`, `Enter Address`)
    } else if (addRess?.length < 10) {
      handleError(`addressError`, `Address 10 characters long`)
    } else {
      handleError(`addressError`, ``)
    }

    if (!emerGency?.length) {
      handleError(`emergencyError`, `Enter Emergency`)
    } else if (!phoneregEx.test(emerGency)) {
      handleError(`emergencyError`, `Enter Valid Emergency`)
    } else {
      handleError(`emergencyError`, ``)
    }
    handleError(`formSubmit`, true)
  }

  useEffect(() => {
    if (employData) {
      setImage(employData.photo)
      setName(employData.fullName)
      setCallname(employData.callName)
      setDesignation(employData.designation)
      setmonthlySalary(employData.monthlySalary)
      setCnic(employData.cnic)
      setDate(employData.dob)
      setGender(employData.gender)
      setEmail(employData.email)
      setPhone(employData.mobile)
      setWattsapp(employData.whatsapp)
      setAddress(employData.address)
      setBloodGroup(employData.bloodGroup)
      setStatus(employData.status)
      setEmergency(employData?.emergencyInfo?.contactNo)
      setRelation(employData?.emergencyInfo?.relation)
      setHealthAllowence(employData?.healthAllowence)
      setTravelAllowence(employData.travelAllowence)
      setResidenceAllowence(employData.residenceAllowence)
      setpaidLeaves(employData.paidLeaves)
    }
  }, [employData])

  const handleChange = (newValue) => {
    setDate(newValue)
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
    } else {
      // eslint-disable-next-line no-extra-semi
      ; <span
        style={{
          minWith: '250px',
          margin: 'auto',
          color: 'red',
          padding: '0px 50px 0px 50px',
        }}
      >
        `Enter Image Type`
      </span>
    }
  }

  const bloodgroupOptions = [
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

  const statusOptions = [
    {
      value: 'EMPLOYED',
      label: 'EMPLOYED',
    },
    {
      value: 'TERMINATED',
      label: 'TERMINATED',
    },
    {
      value: 'LEFT',
      label: 'LEFT',
    },
    {
      value: 'INTERNEE',
      label: 'INTERNEE',
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




  const something = (event) => {
    if (event.code === 'Enter') {
      ValidForm()
    }
  }

  // Again Api Call if Error in api
  function ApiCall() {
    getSingleEmployee()
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
          {btnLoading.loading ? (
            <CircularProgress
              variant="indeterminate"
              disableShrink
              size={50}
              sx={{
                animationDuration: '760ms',
                left: 0,
              }}
              style={{ color: '#2FAEB5', marginLeft: '50%' }}
            />
          ) : btnLoading.error ? (
            <>
              <center>
                Something Went Wrong...{' '}
                <a
                  onClick={ApiCall}
                  type="button"
                  style={{
                    color: '#2FAEB5',
                    cursor: 'pointer',
                  }}
                >
                  Reload
                </a>
              </center>
            </>
          ) : btnLoading.network ? (
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
          ) : (
            <>
              <Grid
                container
                spacing={3}
                alignItems="center"
                sx={{ gap: '30px' }}
              >
                <Grid item xs={12} md={4} xl={4}>
                  <label htmlFor="icon-button-file">
                    <input
                      id="icon-button-file"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        handleFLogo(e.target.files)
                      }}
                      style={{
                        display: 'none',
                      }}
                    />
                    <img
                      src={iMage ? iMage : bgImage}
                      alt="profile-image"
                      style={{
                        height: '254px',
                        width: '254px',
                        borderRadius: '100%',
                        marginTop: '-128px',
                        cursor: 'pointer',
                        marginBottom: '18px',
                        boxShadow: 'rgba(0, 0, 0, 0.55) 0px 6px 20px',
                      }}
                    />
                  </label>
                </Grid>
                <div>
                  <div>
                    <strong>Employee ID</strong>&nbsp;&nbsp;{' '}
                    {`${employData._employeeId ? employData._employeeId : ''}`}
                  </div>
                  <div>
                    <strong>Attendance ID</strong>&nbsp;&nbsp;{' '}
                    {`${employData._attendanceId ? employData._attendanceId : ''
                      }`}
                  </div>
                </div>
              </Grid>
              <MDBox mt={6} mb={3} m={1} onKeyPress={(e) => something(e)}>
                {onbtnLoad?.error ? (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    xl={12}
                    sx={{ textAlign: 'center', marginBottom: '30px' }}
                  >
                    <span
                      style={{
                        color: 'red',
                      }}
                    >
                      {Errors}
                    </span>
                  </Grid>
                ) : null}
                {onbtnLoad?.network ? (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    xl={12}
                    sx={{ textAlign: 'center', marginBottom: '30px' }}
                  >
                    <span
                      style={{
                        color: 'red',
                      }}
                    >
                      Connect to the internet
                    </span>
                  </Grid>
                ) : null}
                <Grid
                  container
                  columnSpacing={2}
                  sx={{ '& > :not(style)': { my: 1 } }}
                >
                  <Grid item xs={12} md={12} xl={12}><strong><h3>Employee Details</h3></strong></Grid>
                  <Grid item xs={12} md={6} xl={6}>
                    <TextField
                      id="name"
                      name="name"
                      type="text"
                      variant="outlined"
                      fullWidth
                      label={
                        error?.nameError?.length
                          ? error?.nameError
                          : 'FULL NAME'
                      }
                      value={name || ''}
                      onChange={(e) => {
                        setName(e.target.value)
                      }}
                      size="medium"
                      error={error?.nameError?.length}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={6}>
                    <TextField
                      id="callname"
                      name="callname"
                      type="text"
                      variant="outlined"
                      fullWidth
                      label={
                        error?.callnameError?.length
                          ? error?.callnameError
                          : 'LAST NAME'
                      }
                      value={EcallName || ''}
                      onChange={(e) => {
                        setCallname(e.target.value)
                      }}
                      size="medium"
                      error={error?.callnameError?.length}
                    />
                  </Grid>

                  <Grid item xs={12} md={4} xl={4}>
                    <InputMask
                      mask="99999-9999999-9"
                      disabled={false}
                      maskChar=" "
                      value={cnIC || ''}
                      onChange={(e) => {
                        setCnic(e.target.value)
                      }}
                      size="medium"
                    >
                      {() => (
                        <TextField
                          id="cnic"
                          name="cnic"
                          variant="outlined"
                          type="phone"
                          fullWidth
                          label={
                            error?.cnicError?.length ? error?.cnicError : 'CNIC'
                          }
                          error={error?.cnicError?.length}
                        />
                      )}
                    </InputMask>
                  </Grid>
                  <Grid item xs={12} md={4} xl={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="MM/dd/yyyy"
                        variant="outlined"
                        value={datevalue}
                        onChange={handleChange}
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
                      label="GENDER"
                      variant="outlined"
                      value={genDer || ''}
                      onChange={(e) => {
                        setGender(e.target.value)
                      }}
                      size="medium"
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
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      variant="outlined"
                      label={
                        error?.emailError?.length ? error?.emailError : 'EMAIL'
                      }
                      value={emaIl || ''}
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                      size="medium"
                      error={error?.emailError?.length}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} xl={4}>
                    <InputMask
                      mask="+\923999999999"
                      disabled={false}
                      maskChar=" "
                      value={phOne || ''}
                      onChange={(e) => {
                        setPhone(e.target.value)
                      }}
                      size="medium"
                    >
                      {() => (
                        <TextField
                          label={
                            error?.phoneError?.length
                              ? error?.phoneError
                              : 'PHONE'
                          }
                          error={error?.phoneError?.length}
                          id="phone"
                          name="phone"
                          type="phone"
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    </InputMask>
                  </Grid>
                  <Grid item xs={12} md={4} xl={4}>
                    <InputMask
                      mask="+\923999999999"
                      disabled={false}
                      maskChar=" "
                      value={wattsApp || ''}
                      onChange={(e) => {
                        setWattsapp(e.target.value)
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
                      value={addRess || ''}
                      onChange={(e) => {
                        setAddress(e.target.value)
                      }}
                      size="medium"
                      error={error?.addressError?.length}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12} md={4} lg={4} xl={4}>
                    <TextField
                      fullWidth
                      select
                      type="text"
                      id="bloodgroup"
                      name="bloodgroup"
                      label="BLOODGROUP"
                      variant="outlined"
                      value={bloodGroup || ''}
                      onChange={(e) => {
                        setBloodGroup(e.target.value)
                      }}
                      size="medium"
                      InputProps={{
                        style: {
                          padding: 10,
                        },
                      }}
                    >
                      {bloodgroupOptions.map((option) => (
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
                      value={emerGency || ''}
                      onChange={(e) => {
                        setEmergency(e.target.value)
                      }}
                      size="medium"
                    >
                      {() => (
                        <TextField
                          variant="outlined"
                          id="emergency"
                          name="emergency"
                          type="phone"
                          fullWidth
                          label={
                            error?.emergencyError?.length
                              ? error?.emergencyError
                              : 'EMERGENCY NO'
                          }
                          error={error?.emergencyError?.length}
                        />
                      )}
                    </InputMask>
                  </Grid>
                  <Grid item xs={12} md={4} xl={4}>
                    <TextField
                      select
                      label="RELATION"
                      variant="outlined"
                      type="text"
                      id="relation"
                      name="relation"
                      fullWidth
                      value={relaTion || ''}
                      onChange={(e) => {
                        setRelation(e.target.value)
                      }}
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
                  <Grid item xs={12} md={12} xl={12}><strong><h3>Company Details</h3></strong></Grid>
                  <Grid item xs={12} md={6} xl={6}>
                    <TextField
                      id="designation"
                      name="designation"
                      variant="outlined"
                      type="text"
                      fullWidth
                      label={
                        error?.designationError?.length
                          ? error?.designationError
                          : 'DESIGNATION'
                      }
                      value={desiGnation || ''}
                      onChange={(e) => {
                        setDesignation(e.target.value)
                      }}
                      error={error?.designationError?.length}
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
                      value={monthlySalary || ''}
                      onChange={(e) => {
                        setmonthlySalary(e.target.value)
                      }}
                      size="medium"
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
                      value={status || ''}
                      onChange={(e) => {
                        setStatus(e.target.value)
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
                        disabled
                        inputFormat="MM/dd/yyyy"
                        variant="outlined"
                        value={employData?.joiningDate}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label={'JOINING DATE'}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={4} xl={4}>
                    <TextField
                      label={'HEALTH ALLOWENCE'}
                      id="healthallowence"
                      name="healthallowence"
                      type="number"
                      variant="outlined"
                      fullWidth
                      value={healthAllowence || ''}
                      onChange={(e) => {
                        setHealthAllowence(e.target.value)
                      }}
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} md={4} xl={4}>
                    <TextField
                      type="text"
                      fullWidth
                      id="travelallowence"
                      name="travelallowence"
                      label="TRAVEL ALLOWENCE"
                      variant="outlined"
                      value={travelAllowence || ''}
                      onChange={(e) => {
                        setTravelAllowence(e.target.value)
                      }}
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} md={4} xl={4}>
                    <TextField
                      type="text"
                      fullWidth
                      id="residenceallowence"
                      name="residenceallowence"
                      label="RESIDENCE ALLOWENCE"
                      variant="outlined"
                      value={residenceAllowence || ''}
                      onChange={(e) => {
                        setResidenceAllowence(e.target.value)
                      }}
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} md={4} xl={4}>
                    <TextField
                      type="number"
                      fullWidth
                      id="paidleaves"
                      name="paidleaves"
                      label="PAID LEAVES"
                      variant="outlined"
                      value={paidLeaves || ''}
                      onChange={(e) => {
                        setpaidLeaves(e.target.value)
                      }}
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} md={12} xl={12}>
                    {employData?.documents?.map((data, i) => {
                      return (
                        <Grid container key={i}>
                          <Grid item xs={12} md={12} xl={12}>
                            <p style={{ cursor: "pointer" }} onClick={() => {
                              handleOpen()
                              setCurrentMedia(data.documentBase64)
                            }
                            }>{data.documentName}</p>
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
                {open &&
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <iframe src={currentMedia} height="100%" width="100%" />
                    </Box>
                  </Modal>

                }
                {onbtnLoad?.loading ? (
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
                    <Grid item xs={12} md={12} xl={12}>
                      <label htmlFor="upload-photo">
                        <input
                          accept="image/png, image/jpeg, application/pdf"
                          style={{ display: 'none' }}
                          id="upload-photo"
                          name="upload-photo"
                          type="file"
                          onChange={(e) => {
                            const uploadedFilenamestore = e.target.files[0]?.name
                            setuploadedFilename(uploadedFilenamestore)
                            handleFileChange(e.target.files)
                          }}
                        />
                        <Button
                          component="span"
                          variant="contained"
                          style={{
                            minWith: '250px',
                            margin: 'auto',
                            color: 'white',
                            background: '#2FAEB5',
                          }}
                        >
                          Upload Documents
                        </Button>
                      </label>
                      {uploadedFilename}
                    </Grid>
                    {/* <Grid item xs={12} md={8} xl={8} sx={{ display: "flex", flexDirection: "row", marginTop: "-36px" }}>
                      <Button
                        variant="contained"
                        disableElevation
                        onClick={() => ResetCall()}
                        style={{
                          minWith: '250px',
                          margin: 'auto',
                          color: 'white',
                          background: '#2FAEB5',
                        }}
                      >
                        View Documents
                      </Button>
                    </Grid> */}
                    <Grid
                      item
                      xs={12}
                      md={12}
                      xl={12}
                      sx={{ textAlign: 'center', paddingTop: '40px' }}
                    >
                      <Button
                        variant="contained"
                        disableElevation
                        onClick={() => ValidForm()}
                        style={{
                          minWith: '250px',
                          margin: 'auto',
                          color: 'white',
                          background: '#2FAEB5'
                        }}
                      >
                        Update
                      </Button>
                    </Grid>
                  </>
                )}
              </MDBox>
            </>
          )}
        </Card>
      </MDBox>
    </DashboardLayout >
  )
}

export default Overview

/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import MDBox from 'components/MDBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { useParams, useNavigate } from 'react-router-dom'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import backgroundImage from 'assets/images/imageFour.jpg'
import {REACT_APP_TALENTHUNT_BACKEND_API} from "config/backendApi"
// eslint-disable-next-line no-unused-vars
import {
  Grid,
  Button,
  MenuItem,
  TextField,
  Card,
  Dialog,
  CircularProgress,
  Select,
  DialogContentText,
  DialogTitle,
  OutlinedInput,
  Box,
  Chip,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'
import Swal from 'sweetalert2'

function Overview() {
  const [leadSource, setleadSource] = useState(``)
  const [status, setStatus] = useState(``)
  const [Category, setCategory] = useState()
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
  const [Errors, setErrors] = useState(``)
  const [employData, setEmployData] = useState([])
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [open, setOpen] = useState(false)
  const [personName, setPersonName] = React.useState([])
  const theme = useTheme()
  let navigate = useNavigate()
  const { Id } = useParams()
  const handleChangeeve = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const [error, setError] = useState({
    formSubmit: false,
    leadSource: ``,
  })

  const handleError = (dataname, value) => {
    setError((preState) => ({
      ...preState,
      [dataname]: value,
    }))
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getSingleCandidate = async () => {
    try {
      setBtnLoading({ loading: true, error: false, network: false })
      fetch(` ${REACT_APP_TALENTHUNT_BACKEND_API}/${Id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => response.json())
        .then((dataEmploy) => {
          if (dataEmploy.hasError === true) {
            setBtnLoading({ loading: false, error: true, network: false })
          } else {
            setBtnLoading({ loading: false, error: false, network: false })
            setEmployData(dataEmploy.data.candidate)
            setPersonName(dataEmploy?.data?.candidate?.metadata?.techSkills)
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

  function ApiCall() {
    getSingleCandidate()
  }

  useEffect(() => {
    getSingleCandidate()
  }, [])

  const ValidForm = () => {
    if (!leadSource?.length) {
      handleError(`leadSourceError`, `Enter LeadSource`)
    } else {
      handleError(`leadSourceError`, ``)
    }
    handleError(`formSubmit`, true)
  }

  useEffect(() => {
    if (error?.formSubmit && !error?.leadSourceError.length) {
      postData({
        metadata: {
          leadSource: leadSource,
          techSkills: personName,
          category: Category,
          status: status,
        },
      })
      handleError(`formSubmit`, false)
      setonbtnLoad({ loading: true, error: false, network: false })
    }
  }, [error])

  const postData = async (payload) => {
    setonbtnLoad({ loading: true, error: false, network: false })
    fetch(` ${REACT_APP_TALENTHUNT_BACKEND_API}/${Id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          return res.json().then((text) => {
            setonbtnLoad({ loading: false, error: false, network: false })
            setErrors(`${text.error.error}`)
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: `Success`,
            html: `<div class="badge-text">RECORD UPDATE.</div>`,
          }).then(() => {
            navigate('/talenthunt')
          })
          res.json()
          setonbtnLoad({ loading: false, error: false, network: false })
        }
      })
      .catch(() => {
        setonbtnLoad({ loading: false, error: false, network: true })
      })
  }

  useEffect(() => {
    if (employData) {
      setleadSource(employData.metadata?.leadSource)
      setStatus(employData.metadata?.status)
      setCategory(employData.metadata?.category)
    }
  }, [employData])

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 10
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 9.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    }
  }
  const names = [
    'JAVA',
    'JS',
    'PYTHON',
    'C++',
    'C#',
    '.NET',
    'MYSQL',
    'MONGODB',
    'C',
    'PHP',
    'FIGMA',
    'UI/UX',
    'DIGITAL-MARKETING',
    'OTHER',
  ]

  const leadSourceOptions = [
    {
      value: 'SOCIALMEDIA',
      label: 'SOCIAL MEDIA',
    },
    {
      value: 'WHATTSAPP',
      label: 'WHATTSAPP',
    },
    {
      value: 'UNIVERSITYNOTICE BOARD',
      label: 'UNIVERSITY NOTICE BOARD',
    },
    {
      value: 'CLASS FELLOW',
      label: 'CLASS FELLOW',
    },
    {
      value: 'OTHER',
      label: 'OTHER',
    },
  ]

  const categoryOptions = [
    {
      value: 'DEVELOPMENT',
      label: 'DEVELOPMENT',
    },
    {
      value: 'UI/UX',
      label: 'UI/UX',
    },
    {
      value: 'DOCUMENTATION',
      label: 'DOCUMENTATION',
    },
  ]

  const statusOptions = [
    {
      value: 'SHORT LISTED',
      label: 'SHORT LISTED',
    },
    {
      value: 'ABSENT',
      label: 'ABSENT',
    },
    {
      value: 'NOT SUITABLE',
      label: 'NOT SUITABLE',
    },
  ]

  const something = (event) => {
    if (event.code === 'Enter') {
      onSubmit()
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
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} xl={4}>
                  <TextField
                    id="name"
                    name="name"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'FULL NAME'}
                    value={employData.fullName || ''}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <TextField
                    id="candidate_id"
                    name="candidate_id"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'CANDIDATE_ID'}
                    value={employData._candidateId || ''}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <TextField
                    id="semester"
                    name="semester"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'SEMESTER'}
                    value={employData.semester || ''}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <TextField
                    id="program"
                    name="program"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'PROGRAM'}
                    value={employData.program || ''}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <TextField
                    id="cgpa"
                    name="cgpa"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'CGPA'}
                    value={employData.cgpa || ''}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <TextField
                    id="gender"
                    name="gender"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'GENDER'}
                    value={employData.gender || ''}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <TextField
                    id="email"
                    name="email"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'EMAIL'}
                    value={employData.email || ''}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <TextField
                    id="phone"
                    name="phone"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'PHONE'}
                    value={employData.phone || ''}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <TextField
                    id="whatsapp"
                    name="whatsapp"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'WHATSAPP'}
                    value={employData.phone || ''}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={12} xl={12}>
                  <TextField
                    id="address"
                    name="address"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'ADDRESS'}
                    value={employData.address || ''}
                    size="medium"
                  />
                </Grid>

                {employData?.metadata?.status === 'SHORT LISTED' ||
                employData?.metadata?.status === 'NOT SUITABLE' ? (
                  <Grid item xs={12} md={12} xl={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-chip-label">
                        TECHSKILLS
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={personName || ''}
                        onChange={handleChangeeve}
                        className="selectPadding"
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="TECHSKILLS"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.9 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                ) : null}
                <Grid item xs={12} md={4} xl={4}>
                  <TextField
                    id="institute"
                    name="institute"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'INSTITUTE'}
                    value={employData.institute || ''}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={4}>
                  <TextField
                    id="pin"
                    name="pin"
                    type="text"
                    variant="outlined"
                    disabled
                    fullWidth
                    label={'PIN'}
                    value={employData.pin || ''}
                    size="medium"
                  />
                </Grid>

                {employData?.metadata?.status === 'SHORT LISTED' ||
                employData?.metadata?.status === 'NOT SUITABLE' ? (
                  <Grid item xs={12} md={4} xl={4}>
                    <TextField
                      select
                      fullWidth
                      id="leadSource"
                      name="leadSource"
                      label={
                        error?.leadSourceError?.length
                          ? error?.leadSourceError
                          : 'LEAD SOURCE'
                      }
                      variant="outlined"
                      type="text"
                      value={leadSource || ''}
                      onChange={(e) => {
                        setleadSource(e.target.value)
                      }}
                      error={error?.leadSourceError?.length}
                      size="medium"
                      InputProps={{
                        style: {
                          padding: 10,
                        },
                      }}
                    >
                      {leadSourceOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                ) : null}

                {employData?.metadata?.status === 'SHORT LISTED' ||
                employData?.metadata?.status === 'NOT SUITABLE' ? (
                  <Grid item xs={12} md={4} xl={4}>
                    <TextField
                      select
                      id="category"
                      name="category"
                      type="text"
                      variant="outlined"
                      fullWidth
                      label={'CATEGORY'}
                      value={Category || ''}
                      onChange={(e) => {
                        setCategory(e.target.value)
                      }}
                      size="medium"
                      InputProps={{
                        style: {
                          padding: 10,
                        },
                      }}
                    >
                      {categoryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                ) : null}
                {employData?.metadata?.status === 'ABSENT' ? (
                  <Grid item xs={12} md={4} xl={4}>
                    <TextField
                      select
                      disabled
                      id="status"
                      name="status"
                      type="text"
                      variant="outlined"
                      fullWidth
                      label={'STATUS'}
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
                ) : (
                  <Grid item xs={12} md={4} xl={4}>
                    <TextField
                      select
                      id="status"
                      name="status"
                      type="text"
                      variant="outlined"
                      fullWidth
                      label={'STATUS'}
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
                )}
              </Grid>

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
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    target="_blank"
                    onClick={handleClickOpen}
                    style={{
                      minWith: '250px',
                      margin: 'auto',
                      color: 'white',
                      background: '#2FAEB5',
                      marginLeft: '20px',
                    }}
                  >
                    VIEW RESUME
                  </Button>
                </Grid>
              )}
              <>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  maxWidth="xl"
                >
                  <DialogTitle id="alert-dialog-title">{'RESUME'}</DialogTitle>
                  <DialogContentText
                    id="alert-dialog-description"
                    style={{
                      overflow: 'auto',
                      textAlign: 'center',
                    }}
                    className="hide-scroller  hide-scroller-firefox"
                  >
                    <Document
                      file={employData?.resume}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>
                  </DialogContentText>
                </Dialog>
              </>
            </MDBox>
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  )
}

export default Overview

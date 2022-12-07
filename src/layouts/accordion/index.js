import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, TextField, Button, MenuItem } from '@mui/material'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import Swal from 'sweetalert2'
import CircularProgress from '@mui/material/CircularProgress'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'
import { Box } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { REACT_APP_BACKEND_ATTENDANCE_LIST_GET_API } from 'config/backendApi';
// Export AccordionforEmloyees Component
export function AccordionforEmloyees({ handleFilter, ApiCall }) {
  const [datevalue, setDate] = useState(new Date())
  const [searchEmployee, setsearchEmployee] = useState({
    fullname: ``,
    designation: ``,
    dateFilter: ``,
    status: `EMPLOYED`,
    gender: ``,
    attendance: ``,
    reset: false,
  })


  const handleChange = (newValue) => {
    setDate(newValue)
    setsearchEmployee((p) => ({ ...p, dateFilter: newValue }))
  }

  const handleSearchUser = (data, value) => {
    setsearchEmployee((preState) => ({
      ...preState,
      [data]: value,
    }))
  }

  // useEffect(() =>{
  //   handleFilter({name:"saad", gender:"male"})
  // },[])

  useEffect(() => {
    handleFilter(searchEmployee)
  }, [searchEmployee])


  useEffect(() => {
    if (searchEmployee?.reset) {
      handleFilter(searchEmployee)
      // setsearchEmployee((pre) => ({
      //   ...pre,

      //   reset: false
      // }))

      setsearchEmployee((pre) => ({
        ...pre,

        reset: false
      }))
    }
  }, [searchEmployee?.reset])

  const statusOptions = [
    {
      value: 'EMPLOYED',
      label: 'EMPLOYED',
    },
    {
      value: 'LEFT',
      label: 'LEFT',
    },
    {
      value: 'TERMINATED',
      label: 'TERMINATED',
    },
    {
      value: 'INTERNEE',
      label: 'INTERNEE',
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

  function ResetCall() {
    setsearchEmployee({
      fullname: ``,
      designation: ``,
      dateFilter: ``,
      status: `EMPLOYED`,
      gender: ``,
      attendance: ``,
      reset: true,
    })
  }
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} xl={4}>
            <TextField
              label={'FULL NAME'}
              id="fullname"
              name="fullname"
              type="text"
              variant="outlined"
              fullWidth
              value={searchEmployee?.fullname}
              onChange={(e) => {
                handleSearchUser('fullname', e.target.value)
              }}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} md={4} xl={4}>
            <TextField
              label={'DESIGNATION'}
              id="designation"
              name="designation"
              type="text"
              variant="outlined"
              fullWidth
              value={searchEmployee?.designation}
              onChange={(e) => {
                handleSearchUser('designation', e.target.value)
              }}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} md={4} xl={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="DATE OF BIRTH"
                inputFormat="MM/dd/yyyy"
                variant="outlined"
                value={datevalue}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    label={'DATE OF BIRTH'}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4} xl={4}>
            <TextField
              select
              label={'STATUS'}
              id="status"
              name="status"
              type="text"
              variant="outlined"
              fullWidth
              value={searchEmployee?.status}
              onChange={(e) => {
                handleSearchUser('status', e.target.value)
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
            <TextField
              select
              label={'GENDER'}
              id="gender"
              name="gender"
              type="text"
              variant="outlined"
              fullWidth
              value={searchEmployee?.gender}
              onChange={(e) => {
                handleSearchUser('gender', e.target.value)
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
              label={'ATTENDANCE ID'}
              id="attendance"
              name="attendance"
              type="text"
              variant="outlined"
              fullWidth
              value={searchEmployee?.attendance}
              onChange={(e) => {
                handleSearchUser('attendance', e.target.value)
              }}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} md={4} xl={4}>
          </Grid>
        </Grid>
        <Box textAlign='center'>
          <Button
            variant="contained"
            disableElevation
            onClick={() => ApiCall()}
            style={{
              color: 'white',
              background: '#2FAEB5',
            }}
          >
            SEARCH
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => ResetCall()}
            style={{
              color: 'white',
              background: '#2FAEB5',
              marginLeft: "20px"
            }}
          >
            RESET
          </Button>
        </Box>
        {/* <Grid
          item
          xs={12}
          md={12}
          xl={12}
          sx={{ textAlign: 'center', paddingTop: '30px' }}
        >
          <Button
            variant="contained"
            disableElevation
            onClick={() => ApiCall()}
            style={{
              minWith: '250px',
              margin: 'auto',
              color: 'white',
              background: '#2FAEB5',
            }}
          >
            SEARCH
          </Button>
        </Grid> */}
      </AccordionDetails>
    </Accordion>
  );
}

// Typechecking props for the DataTable
AccordionforEmloyees.propTypes = {
  handleFilter: PropTypes.any,
  ApiCall: PropTypes.any,
}

// Export AccordionforAttendence Component
export function AccordionforAttendence({ handleFilter, ApiAttenCall }) {
  // const [datevalue, setDate] = useState(new Date())
  // const [EndDate, setEndDate] = useState(new Date())
  const [dateRangeshow, setdateRangeshow] = useState(false)
  const [searchAttendence, setsearchAttendence] = useState({
    id: 8,
    dateRange: [
      {
        startDate: new Date(moment().startOf('month').subtract(1, 'months').format('YYYY-MM-DD')),
        endDate: new Date(moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD')),
        key: 'selection'
      }
    ],
    timeStatus: ``,
  })

  const [dropdownLoading, setdropdownLoading] = useState({ loading: false })
  const [dropdownOptions, setdropdownOptions] = useState([])

  const DropdownApi = async () => {
    setdropdownLoading({ loading: true })
    try {
      fetch(`${REACT_APP_BACKEND_ATTENDANCE_LIST_GET_API}`, {
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
          setdropdownOptions(dropdowndata.data.nameAndId)
          setdropdownLoading({ loading: false })
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: `Name Not Found!`,
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


  // const handleChange = (newValue) => {
  //   setDate(newValue)
  //   setsearchAttendence((p) => ({ ...p, dateFilter: newValue }))
  // }

  // const handleEndDate = (newValue) => {
  //   setEndDate(newValue)
  //   setsearchAttendence((p) => ({ ...p, enddateFilter: newValue }))
  // }

  const handleAttendence = (data, value) => {
    setsearchAttendence((preState) => ({
      ...preState,
      [data]: value,
    }))
  }

  useEffect(() => {
    const empId = localStorage.getItem("empId")
    if (empId) {
      handleAttendence('id', empId)
    }
  }, [])


  useEffect(() => {
    handleFilter(searchAttendence)
  }, [searchAttendence])


  const timeSelection = [
    {
      value: 'ontime',
      label: 'On Time',
    },
    {
      value: 'latetime',
      label: 'Late Time',
    },
  ]

  const hanldedaterange = () => {
    setdateRangeshow(!dateRangeshow)
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} xl={4}>
            <TextField
              select
              label={'FULL NAME'}
              id="id"
              name="id"
              type="text"
              variant="outlined"
              fullWidth
              value={searchAttendence?.id}
              onChange={(e) => {
                handleAttendence('id', e.target.value)
              }}
              size="medium"
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
                  <MenuItem key={ind} value={option._attendanceId}>
                    {option?.fullName}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4} xl={4}>
            <TextField
              select
              label={'Time Status'}
              id="id"
              name="id"
              type="text"
              variant="outlined"
              fullWidth
              value={searchAttendence?.timeStatus}
              onChange={(e) => {
                handleAttendence('timeStatus', e.target.value)
              }}
              size="medium"
              InputProps={{
                style: {
                  padding: 10,
                },
              }}
            >
              {timeSelection.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4} xl={4}>
            <TextField disabled fullWidth onClick={hanldedaterange} value={`${new Date(searchAttendence?.dateRange[0].startDate).getFullYear() + '-' + (new Date(searchAttendence?.dateRange[0].startDate).getMonth() + 1) + '-' + new Date(searchAttendence?.dateRange[0].startDate).getDate()} / ${new Date(searchAttendence?.dateRange[0].endDate).getFullYear() + '-' + (new Date(searchAttendence?.dateRange[0].endDate).getMonth() + 1) + '-' + new Date(searchAttendence?.dateRange[0].endDate).getDate()}`} />
            {dateRangeshow &&
              <div style={{ marginTop: "10px" }}>
                <DateRange
                  editableDateInputs={true}
                  onChange={item => handleAttendence(`dateRange`, [item.selection])}
                  ranges={searchAttendence?.dateRange}
                />
              </div>
            }

            {/* <Button
              variant="contained"
              disableElevation
              onClick={() => ResetAtenCall()}
              style={{
                marginLeft: "25px",
                color: 'white',
                background: '#2FAEB5',
              }}
            >
              RESET
            </Button> */}

          </Grid>

        </Grid>
        <Box textAlign='center'>
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              setdateRangeshow(false)
              ApiAttenCall()
            }}
            style={{
              color: 'white',
              background: '#2FAEB5',
              marginTop: "38px",
            }}
          >
            SEARCH
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

// Typechecking props for the DataTable
AccordionforAttendence.propTypes = {
  handleFilter: PropTypes.any,
  ApiAttenCall: PropTypes.any,
}

export function AccordionforSalary({ SalaryQuery, ApiSalaryCall, loading, expandedAccordion }) {
  const [dateRangeshow, setdateRangeshow] = useState(false)

  const [generateSalary, setgenerateSalary] = useState({
    id: ``,
    dateRange: [
      {
        startDate: new Date(moment().startOf('month').subtract(1, 'months').format('YYYY-MM-DD')),
        endDate: new Date(moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD')),
        key: 'selection'
      }
    ],
    advance: 0,
    leave: 0,
    paymentDate: new Date(),
    paymentDetails: `UBL Bank`,
  })

  const [, setDate] = useState(new Date())


  const handleChange = (panel) => (newExpanded) => {
    expandedAccordion[1](newExpanded ? panel : false);
  };

  const handledateChange = (newValue) => {
    setgenerateSalary((p) => ({ ...p, paymentDate: newValue }))
    setDate(newValue)
  }




  useEffect(() => {
    SalaryQuery(generateSalary)
  }, [generateSalary])

  const handleSalary = (data, value) => {
    setgenerateSalary((preState) => ({
      ...preState,
      [data]: value,
    }))
  }

  const hanldedaterange = () => {
    setdateRangeshow(!dateRangeshow)
  }

  return (
    <Accordion expanded={expandedAccordion[0]} onChange={handleChange(!expandedAccordion[0])}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header"
        aria-controls="panelsStayOpen-collapseOne"
      >
        <Typography>Generate Salary</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>

          <Grid item xs={12} md={4} xl={4}>
            <TextField disabled fullWidth onClick={hanldedaterange} value={`${new Date(generateSalary?.dateRange[0].startDate).getFullYear() + '-' + (new Date(generateSalary?.dateRange[0].startDate).getMonth() + 1) + '-' + new Date(generateSalary?.dateRange[0].startDate).getDate()} / ${new Date(generateSalary?.dateRange[0].endDate).getFullYear() + '-' + (new Date(generateSalary?.dateRange[0].endDate).getMonth() + 1) + '-' + new Date(generateSalary?.dateRange[0].endDate).getDate()}`} />
            {dateRangeshow &&
              <div style={{ marginTop: "10px" }}>
                <DateRange
                  editableDateInputs={true}
                  onChange={item => handleSalary(`dateRange`, [item.selection])}
                  ranges={generateSalary?.dateRange}
                />
              </div>
            }
          </Grid>


          <Grid item xs={12} md={4} xl={4}>
            <TextField
              label={'ADVANCE'}
              id="advance"
              name="advance"
              type="number"
              variant="outlined"
              fullWidth
              value={generateSalary?.advance || ''}
              onChange={(e) => {
                handleSalary('advance', e.target.value)
              }}
              size="medium"
            />
          </Grid>

          <Grid item xs={12} md={4} xl={4}>
            <TextField
              label={'LEAVE'}
              id="leave"
              name="leave"
              type="number"
              variant="outlined"
              fullWidth
              value={generateSalary?.leave || ''}
              onChange={(e) => {
                handleSalary('leave', e.target.value)
              }}
              size="medium"
            />
          </Grid>

          <Grid item xs={12} md={6} xl={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                inputFormat="MM/dd/yyyy"
                variant="outlined"
                value={generateSalary?.paymentDate || ''}
                onChange={handledateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    label={'PAYMENT DATE'}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <TextField
              label={'PAYMENT DETAILS'}
              id="paymentdetails"
              name="paymentdetails"
              type="text"
              variant="outlined"
              fullWidth
              value={generateSalary?.paymentDetails || ''}
              onChange={(e) => {
                handleSalary('paymentDetails', e.target.value)
              }}
              size="medium"
            />
          </Grid>
        </Grid>
        {loading.loading ? (
          <Box textAlign='center'>
            <LoadingButton
              loading
              variant="outlined"
              style={{
                color: 'white',
                background: '#2FAEB5',
                padding: '0px 60px 0px 60px',
                marginTop: "34px"
              }}
            />
          </Box>
        ) : (
          <Box textAlign='center'>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                setdateRangeshow(false);
                ApiSalaryCall();
              }}
              style={{
                color: 'white',
                background: '#2FAEB5',
                marginTop: "38px",
              }}
            >
              Generate
            </Button>
          </Box>
        )}

      </AccordionDetails>
    </Accordion>
  );
}

AccordionforSalary.propTypes = {
  SalaryQuery: PropTypes.any,
  ApiSalaryCall: PropTypes.any,
  loading: PropTypes.any,
  expandedAccordion: PropTypes.any,
}
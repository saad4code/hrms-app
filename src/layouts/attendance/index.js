import React, { useEffect, useState } from 'react'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import { Grid, Card, Button } from '@mui/material'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import DataTable from 'examples/Tables/DataTable'
import useAttendancerecord from 'layouts/attendance/data/useAttendancerecordHook'
import { SeletonForAttendance } from 'layouts/skeleton'
import { AccordionforAttendence } from "layouts/accordion/index"
import moment from 'moment'
import AddEntries from 'layouts/attendance/addentrie'

function Attendance() {
  const [filters, setFilter] = useState({
    id: 8,
    dateRange: [
      {
        startDate: moment().startOf('month').subtract(1, 'months').format('YYYY-MM-DD'),
        endDate: new Date(moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD')),
        key: 'selection'
      }
    ],
    timeStatus: ``,
  })
  const { columns, rows, attendanceData, loading, getAttendanceApi, uploadAttendance } = useAttendancerecord(filters)

  const [file, setFile] = useState('')
  // Again Api Call if Error in api
  function ApiAttenCall() {
    getAttendanceApi()
  }

  useEffect(() => {
    ApiAttenCall()
  }, []);

  const handleFilter = (value) => {
    setFilter(value)
  }
  useEffect(() => {
    if (file.length) {
      uploadAttendance(file)
    }
  }, [file])

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

  const handleAttendanceFile = async (file) => {
    const fileTobase64 = await toBase64(file)
    setFile(fileTobase64)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <AccordionforAttendence handleFilter={handleFilter} ApiAttenCall={ApiAttenCall} />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                borderRadius="lg"
                coloredShadow="error"
                style={{
                  backgroundColor: '#6854A1',
                  boxShadow: '0px 4px 7px #6854A1',
                }}
              >
                <MDTypography variant="h6" color="white">
                  ATTENDANCE
                </MDTypography>
                <Grid
                  item
                  xs={12}
                  md={12}
                  xl={12}
                  sx={{ textAlign: 'right' }}
                  marginTop={-4}
                >
                  {loading.loading ? (
                    <Button
                      disabled
                      style={{
                        minWith: '250px',
                        margin: 'auto',
                        color: 'white',
                        background: '#2FAEB5',
                      }}
                    >
                      Upload
                    </Button>
                  ) : (
                    <label htmlFor="upload-photo">
                      <input
                        accept=".csv"
                        style={{ display: 'none' }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={(e) =>
                          handleAttendanceFile(e.target.files[0])
                        }
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
                        Upload
                      </Button>
                    </label>
                  )}
                </Grid>
                <Grid
                  item
                  xs={10}
                  md={10}
                  xl={10}
                  sx={{ textAlign: 'right' }}
                  marginTop={-4.6}
                >
                  <AddEntries getAttendanceApi={getAttendanceApi} attendanceData={attendanceData} />
                </Grid>
              </MDBox>

              <MDBox pt={3}>
                {loading.loading ? (
                  <div>
                    <SeletonForAttendance />
                  </div>
                ) : loading.error ? (
                  <>
                    <center>
                      Something Went Wrong...{' '}
                      <a
                        type="button"
                        onClick={ApiAttenCall}
                        style={{
                          color: '#2FAEB5',
                          cursor: 'pointer',
                        }}
                      >
                        Reload
                      </a>
                    </center>
                  </>
                ) : loading.network ? (
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
                ) : !loading.default ? (
                  <>
                    <DataTable
                      canSearch={false}
                      table={{ columns, rows }}
                      isSorted={false}
                      showTotalEntries={true}
                      showData={true}
                      noEndBorder
                      entriesPerPage={{ defaultValue: 25, entries: [25, 30] }}
                      attendanceData={attendanceData}
                      getAttendanceApi={getAttendanceApi}
                    // entriesPerPage={false}
                    />
                  </>
                ) : null}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  )
}
// Export Component default
export default Attendance

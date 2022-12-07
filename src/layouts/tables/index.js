// Soft UI Dashboard React components
// Import React
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import DataTable from 'examples/Tables/DataTable'
import useEmployeesdata from 'layouts/tables/data/useEmployeesdata'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { SeletonForEmployees } from 'layouts/skeleton'
import { AccordionforEmloyees } from "layouts/accordion/index"

function EmployeesdataTable() {
  const [filters, setFilter] = useState({
    fullname: ``,
    designation: ``,
    dateFilter: ``,
    status: ``,
    gender: ``,
    attendance: ``,
  })
  const { columns, rows, loading, EmployeesApiCall } = useEmployeesdata(filters)

  // Again Api Call if Error in api
  function ApiCall() {
    EmployeesApiCall()
  }

  useEffect(() => {
    ApiCall()
  }, []);

  const handleFilter = (value) => {
    setFilter(value)
  }

  // Return This Table
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <AccordionforEmloyees handleFilter={handleFilter} ApiCall={ApiCall} />
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
                  EMPLOYEES
                </MDTypography>
                <Grid
                  item
                  xs={12}
                  md={12}
                  xl={12}
                  sx={{ textAlign: 'right' }}
                  marginTop={-4}
                >
                  <Link to={`/employees/add`}>
                    <Button
                      variant="contained"
                      style={{
                        minWith: '250px',
                        margin: 'auto',
                        color: 'white',
                        background: '#2FAEB5',
                      }}
                    >
                      ADD
                      <AddIcon />
                    </Button>
                  </Link>
                </Grid>
              </MDBox>

              <MDBox pt={3}>
                {loading.loading ? (
                  <div>
                    <SeletonForEmployees />
                  </div>
                ) : loading.error ? (
                  <>
                    <center>
                      Something Went Wrong...{' '}
                      <a
                        type="button"
                        onClick={ApiCall}
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
                  <DataTable
                    canSearch={false}
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
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
export default EmployeesdataTable

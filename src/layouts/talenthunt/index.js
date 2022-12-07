import React from 'react'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import { Grid, Card } from '@mui/material'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import DataTable from 'examples/Tables/DataTable'
import authorsTablehuntData from 'layouts/talenthunt/data/authorsTablehunt'
import { SeletonForCandidates } from 'layouts/skeleton'

function Talenthunt() {
  const { columns, rows, loading, TalenthutApi } = authorsTablehuntData()

  // Again Api Call if Error in api
  function ApiCall() {
    TalenthutApi()
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                  CANDIDATES
                </MDTypography>
              </MDBox>

              <MDBox pt={3}>
                {loading.loading ? (
                  <div style={{ paddingTop: '126px' }}>
                    <SeletonForCandidates />
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
                    canSearch
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
export default Talenthunt

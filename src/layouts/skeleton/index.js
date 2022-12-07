import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Skeleton } from '@mui/material'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('1', 159, 6.0, 24, 4.0),
  createData('2', 237, 9.0, 37, 4.3),
  createData('3', 262, 16.0, 24, 6.0),
  createData('4', 305, 3.7, 67, 4.3),
  createData('5', 356, 16.0, 49, 3.9),
  createData('6', 356, 16.0, 49, 3.9),
  createData('7', 356, 16.0, 49, 3.9),
  createData('8', 356, 16.0, 49, 3.9),
  createData('9', 356, 16.0, 49, 3.9),
  createData('10', 356, 16.0, 49, 3.9),
]

export function SeletonForEmployees() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="circular" width={40} height={40}></Skeleton>
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="80%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="80%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="80%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="80%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton
                  animation="wave"
                  height={40}
                  width="30%"
                  style={{ marginLeft: '-7px' }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function SeletonForCandidates() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
            >
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="40%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="80%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="54%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="70%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="60%" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function SeletonForAttendance() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
            >
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="40%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="50%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="54%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="54%" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function SeletonForAccounts() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
            >
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="40%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="50%" />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" height={40} width="54%" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
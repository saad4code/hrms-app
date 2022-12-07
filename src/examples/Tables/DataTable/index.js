/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  useTable,
  usePagination,
  useGlobalFilter,

  useSortBy,
} from 'react-table'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Autocomplete from '@mui/material/Autocomplete'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDInput from 'components/MDInput'
import MDPagination from 'components/MDPagination'
import Editfield from 'examples/Tables/DataTable/editfield'
import { useLocation } from 'react-router-dom';
import DataTableHeadCell from 'examples/Tables/DataTable/DataTableHeadCell'
import DataTableBodyCell from 'examples/Tables/DataTable/DataTableBodyCell'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  showData,
  table,
  pagination,
  isSorted,
  noEndBorder,
  attendanceData,
  getAttendanceApi
}) {
  const defaultValue = entriesPerPage.defaultValue
    ? entriesPerPage.defaultValue
    : 10
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ['5', '10', '15', '20', '25']
  const columns = useMemo(() => table.columns, [table])
  const data = useMemo(() => table.rows, [table])
  const [modalOpening, setModalOpening] = useState(false)
  const [rowData, setRowData] = useState({})
  const location = useLocation();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  const { pageIndex, pageSize, globalFilter } = state

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue])

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value)
  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ))

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0
      ? gotoPage(0)
      : gotoPage(Number(value))

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1)

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) =>
    gotoPage(Number(value.value - 1))

  // const onSearchChange = useAsyncDebounce((value) => {

  // }, 200);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? 'desc' : 'asce'
    } else if (isSorted) {
      sortedValue = 'none'
    } else {
      sortedValue = false
    }

    return sortedValue
  }

  // Setting the entries starting point
  const entriesStart =
    pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1

  // Setting the entries ending point
  let entriesEnd

  if (pageIndex === 0) {
    entriesEnd = pageSize
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length
  } else {
    entriesEnd = pageSize * (pageIndex + 1)
  }

  const handleClickOpen = () => {
    setModalOpening(true)
  };


  return (
    <TableContainer sx={{ boxShadow: 'none' }}>
      {entriesPerPage || canSearch ? (
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          {entriesPerPage && (
            <MDBox display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10))
                }}
                size="small"
                sx={{ width: '5rem' }}
                renderInput={(params) => <MDInput {...params} />}
              />
              <MDTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </MDTypography>
            </MDBox>
          )}
          {canSearch && (
            <MDBox width="12rem" ml="auto">
              <MDInput
                placeholder="Search..."
                value={globalFilter || ''}
                size="small"
                fullWidth
                onChange={(e) => {
                  setGlobalFilter(e.target.value)
                }}
              />
            </MDBox>
          )}
        </MDBox>
      ) : null}
      <Table {...getTableProps()}>
        <MDBox component="thead">
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <DataTableHeadCell
                  {...column.getHeaderProps(
                    isSorted && column.getSortByToggleProps(),
                  )}
                  width={column.width ? column.width : 'auto'}
                  align={column.align ? column.align : 'left'}
                  sorted={setSortedValue(column)}
                >
                  {column.render('Header')}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody
          {...getTableBodyProps()}
          sx={{
            ...(location.pathname === `/attendance` && {
              minWidth: 650,
              "& .MuiTableRow-root:hover": {
                backgroundColor: "#F4F5F7",
                cursor: "pointer"
              }
            })
          }}
        >
          {page.map((row, key) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}
                onClick={() => {
                  handleClickOpen()
                  location.pathname === `/attendance` &&
                    setRowData(attendanceData[row?.id])
                }}
              >
                {row.cells.map((cell) => (
                  <DataTableBodyCell
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : 'left'}
                    {...cell.getCellProps()}
                  >
                    <span style={{ fontSize: "11.4px", }}>
                      {cell.render('Cell')}
                    </span>
                  </DataTableBodyCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {showData && (
        <MDTypography
          variant="button"
          fontWeight="regular"
        >
          {/* Showing {entriesStart} to {entriesEnd} of {rows.length} entries */}
          {rows.length === 0 && <p style={{ textAlign: "center", margin: "42px", marginBottom: "-22px", fontSize: "20px" }}>No Data Found</p>}
        </MDTypography>
      )}

      {location.pathname === `/attendance` && modalOpening ? (
        <Editfield rowData={rowData} setModalOpening={() => setModalOpening(false)} getAttendanceApi={getAttendanceApi} />
      ) : (
        null
      )}


      <MDBox
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography
              variant="button"
              color="secondary"
              fontWeight="regular"
            >
              {/* Showing {entriesStart} to {entriesEnd} of {rows.length} entries */}
              Showing {rows.length} Entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : 'gradient'}
            color={pagination.color ? pagination.color : 'info'}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <ChevronLeftIcon sx={{ fontWeight: 'bold' }} />
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{
                    type: 'number',
                    min: 1,
                    max: customizedPageOptions.length,
                  }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <ChevronRightIcon sx={{ fontWeight: 'bold' }} />
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer >
  )
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  showData: true,
  pagination: { variant: 'gradient', color: 'info' },
  isSorted: true,
  noEndBorder: false,
}

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  showData: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(['contained', 'gradient']),
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'dark',
      'light',
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  filters: PropTypes.any,
  attendanceData: PropTypes.any,
  getAttendanceApi: PropTypes.func,
}

export default DataTable

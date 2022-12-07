/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import MDBox from 'components/MDBox'
import React from 'react'

// eslint-disable-next-line no-unused-vars
export const MyGlobalFilter = ({
  globalFilter,
  setGlobalFilter,
  // eslint-disable-next-line no-unused-vars
  preGlobalFilteredRows,
}) => {
  return (
    <div>
      <MDBox width="12rem" ml="auto">
        <input
          placeholder="Search..."
          value={globalFilter || ''}
          size="small"
          fullWidth
          onChange={(e) => {
            setGlobalFilter(e.target.value)
          }}
        />
      </MDBox>
    </div>
  )
}

import React from 'react'
import { useTable, usePagination } from "react-table";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

export const Table = ({ columns, data }) => {

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data
    },
        usePagination
    );

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <table {...getTableProps()} width="100%" style={{ border: "1px Solid black", marginTop: "100px", borderCollapse: "collapse" }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                !column.columns &&
                                <th key={column.id} style={{ borderBottom: "1px Solid black", padding: "8px" }} {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr key={row?.id} {...row.getRowProps()} className='salary-table-backgrond-color'>
                                {row.cells.map(cell => {
                                    return <td key={row?.id} {...cell.getCellProps()} style={{ textAlign: "center", padding: "8px" }}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </DashboardLayout>
    )
}
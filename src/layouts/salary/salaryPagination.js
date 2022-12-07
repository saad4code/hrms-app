import React from "react";
import { useTable, usePagination } from "react-table";
import Pagination from '@mui/material/Pagination';
import { Grid } from "@mui/material";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
// import { makeStyles } from '@material-ui/core/styles';

export const SalaryPaginated = ({ columns, data, setPageNumber, getPageNumberFromApi }) => {
    const {
        gotoPage,
    } = useTable(
        {
            columns,
            data,
        },
        usePagination
    );

    const handleChange = (event, value) => {
        setPageNumber(value);
        gotoPage(value)
    };

    // const useStyles = makeStyles(() => ({
    //     ul: {
    //         "&:selected .MuiPaginationItem-root": {
    //             backgroundColor: "#772e2e !important",
    //         }
    //     }
    // }));

    // const classes = useStyles();

    return (
        <>
            <DashboardLayout>
                <Grid container>
                    <Grid item
                        xs={5}
                        md={5}
                        xl={5}
                    ></Grid>
                    <Grid
                        item
                        xs={7}
                        md={7}
                        xl={7}
                    >
                        <Pagination
                            count={getPageNumberFromApi}
                            variant="text"
                            className="css-1nu2tsa-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected"
                            // color="primary"
                            // classes={{ ul: classes.ul }}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DashboardLayout>
            {/* <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </span> */}
        </>
    );
};
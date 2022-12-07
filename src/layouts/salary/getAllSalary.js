import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table } from "layouts/salary/table.js"
import Swal from 'sweetalert2'
import { SalaryPaginated } from "layouts/salary/salaryPagination"
// import Button from '@mui/material/Button';
import SalarySlip from "layouts/salary/slip"
// import { LoadingButton } from '@mui/lab';
import { LoadingButton } from "layouts/salary/loadingButton";



export const GetAllSalary = () => {

    const [loading, setLoading] = useState({
        loading: false,
        error: false,
        network: false,
    })

    const [allSalaryData, setAllSalaryData] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [getPageNumberFromApi, setGetPageNumberFromApi] = useState(0)
    const [singleSalary, setSingleSalary] = useState()


    console.log(`loading12`, loading)


    // Get All Salary API Call.
    const getSalaryDataApi = useCallback((params) => {
        setLoading({ loading: true, error: false, network: false })
        try {
            fetch(`${`http://localhost:3000/api/payroll?page=${params}&offset=10`}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'GET',
            })
                .then((getSalaryData) => getSalaryData.json())
                .then((getSalaryData) => {
                    if (getSalaryData?.hasError === true) {
                        if (getSalaryData?.error?.error) {
                            setLoading({ loading: false, error: true, network: false })
                        }
                    }
                    else {
                        setLoading({ loading: false, error: false, network: false })
                        setAllSalaryData(getSalaryData.data.payrolls.result)
                        setGetPageNumberFromApi(getSalaryData.data.payrolls.totalPages)
                    }
                })
                .catch(() => {
                    setLoading({ loading: false, error: false, network: false })
                    Swal.fire({
                        icon: 'error',
                        title: `Something went wrong!`,
                    })
                })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Something went wrong!`,
            })
        }
    }, [])

    useEffect(() => {
        getSalaryDataApi(pageNumber)
    }, [getSalaryDataApi, pageNumber])

    const getSingleEmployeeSalary = useCallback((params, loadingHandler) => {
        loadingHandler({ loading: true, error: false })
        try {
            fetch(`${`http://localhost:3000/api/payroll/${params}`}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'GET',
            })
                .then((getSingleSalaryData) => getSingleSalaryData.json())
                .then((getSingleSalaryData) => {
                    loadingHandler({ loading: false, error: false })
                    if (getSingleSalaryData?.hasError === true) {
                        if (getSingleSalaryData?.error?.error) {
                            loadingHandler({ loading: false, error: true })
                        }
                    }
                    else {
                        setSingleSalary(getSingleSalaryData.data.payroll)
                    }
                })
                .catch(() => {
                    loadingHandler({ loading: false, error: true })
                    Swal.fire({
                        icon: 'error',
                        title: `Something went wrong!`,
                    })
                })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Something went wrong!`,
            })
        }
    }, [])



    const columns = useMemo(() => [
        {
            id: 1,
            columns: [
                {
                    Header: "Employee ID",
                    accessor: `employeeId`
                },
                {
                    Header: "Name",
                    accessor: `employeeName`
                },
                {
                    Header: "Payslip",
                    accessor: `attendanceId`,
                    // Maping The Button In Table. 
                    Cell: function OrderItems({ row }) {
                        const attendanceIdForParam = row?.original?.attendanceId
                        return (
                            <LoadingButton
                                // Get The State From ChildComponent Which Name Is LoadingButton.
                                getSingleEmployeeSalary={(setLoadingState) => {
                                    // Handle Loading State.
                                    const loadingHandler = (value) => {
                                        // Set Loading State.
                                        setLoadingState({ ...value })
                                    }
                                    // Api Call
                                    getSingleEmployeeSalary(attendanceIdForParam, (value) => loadingHandler(value))
                                }}
                            />
                        )
                    }
                },
                {
                    Header: "Absent Days",
                    accessor: `absentDays`
                },
            ]
        },
    ],
        []
    );

    return (
        <>
            {singleSalary?.employeeName ?
                <SalarySlip singleSalary={singleSalary}></SalarySlip>
                : (
                    <>
                        <Table columns={columns} data={allSalaryData}></Table>
                        <SalaryPaginated pageNumber={pageNumber} columns={columns} data={allSalaryData} setPageNumber={setPageNumber} getPageNumberFromApi={getPageNumberFromApi}></SalaryPaginated></>
                )
            }
        </>
    )
}


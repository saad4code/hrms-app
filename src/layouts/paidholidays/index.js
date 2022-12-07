import React, { useState, useEffect } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import MDBox from 'components/MDBox'
import backgroundImage from 'assets/images/imageSeven.jpg'
import {
    TextField,
    Grid,
    MenuItem,
    Card,
    Button
} from '@mui/material'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import Swal from 'sweetalert2'
import LoadingButton from '@mui/lab/LoadingButton'
import { REACT_APP_BACKEND_HOLIDAYS_API } from 'config/backendApi'

const holidays = () => {
    const [dateRangeshow, setDateRangeshow] = useState(false)

    const [holidays, setHolidays] = useState({
        holidayName: ``,
        dateRange: [
            {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            }
        ],
        holidayType: ``,
        description: ``,
    })

    const [btnLoading, setBtnLoading] = useState({
        loading: false,
        error: false,
        network: false,
    })

    const [error, setError] = useState({
        formSubmit: false,
        holidayNameError: ``,
        holidayTypeError: ``,
    })


    const handleHolidays = (data, value) => {
        setHolidays((preState) => ({
            ...preState,
            [data]: value,
        }))
    }

    const handleError = (dataname, value) => {
        setError((preState) => ({
            ...preState,
            [dataname]: value,
        }))
    }

    const ValidForm = () => {
        if (!holidays?.holidayName.length) {
            handleError(`holidayNameError`, `Enter Holiday Name`)
        } else {
            handleError(`holidayNameError`, ``)
        }
        if (!holidays?.holidayType.length) {
            handleError(`holidayTypeError`, `Enter Holiday Type`)
        } else {
            handleError(`holidayTypeError`, ``)
        }
        handleError(`formSubmit`, true)
    }

    const AddHolidaysCall = async (payload) => {
        setBtnLoading({ loading: true, error: false, network: false })
        try {
            fetch(`${REACT_APP_BACKEND_HOLIDAYS_API}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.hasError === true) {
                        Swal.fire({
                            icon: 'error',
                            title: `Something went wrong!`,
                        })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: `Success`,
                            html: `<div class="badge-text">ADDED.</div>`,
                        }).then(() => {
                            setHolidays({
                                holidayName: ``,
                                dateRange: [
                                    {
                                        startDate: new Date(),
                                        endDate: new Date(),
                                        key: 'selection'
                                    }
                                ],
                                holidayType: ``,
                                description: ``,
                            })
                        })
                    }
                    setBtnLoading({ loading: false, error: false, network: false })
                })
                .catch(() => {
                    setBtnLoading({ loading: false, error: true, network: false })
                })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Something went wrong!`,
            })
        }
    }

    const preparePayload = () => {
        let dateArray = []
        if (holidays.dateRange.length) {
            let startDate = new Date(holidays?.dateRange[0].startDate)
            let endDate = new Date(holidays?.dateRange[0].endDate)
            dateArray = [
                {
                    startDate: new Date(startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset())).toISOString(),
                    endDate: new Date(endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset())).toISOString(),
                    key: 'selection'
                }
            ]

        }

        let splitingStartDate = dateArray[0].startDate.split(`T`)[0];
        let splitingEndDate = dateArray[0].endDate.split(`T`)[0];

        let splitingDateArray = []

        splitingDateArray = [
            {
                startDate: splitingStartDate,
                endDate: splitingEndDate
            }
        ]
        let data = {
            holidayName: holidays?.holidayName,
            dates: splitingDateArray,
            holidayType: holidays?.holidayType,
            description: holidays?.description.length === 0 ? `Holidays` : holidays?.description,
        }
        return data
    }

    useEffect(() => {
        if (
            error?.formSubmit &&
            !error?.holidayNameError.length &&
            !error?.holidayTypeError.length
        ) {
            AddHolidaysCall(preparePayload())
            handleError(`formSubmit`, false)
            setBtnLoading({ loading: true, error: false, network: false })
        }
    }, [error])

    const hanldedaterange = () => {
        setDateRangeshow(!dateRangeshow)
    }

    const typeOptions = [
        {
            value: 'PUBLIC',
            label: 'PUBLIC',
        },
        {
            value: 'COMPANY',
            label: 'COMPANY',
        },

    ]
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mb={2} />
            <MDBox position="relative" mb={5}>
                <MDBox
                    display="flex"
                    alignItems="center"
                    position="relative"
                    minHeight="18.75rem"
                    borderRadius="xl"
                    sx={{
                        backgroundImage: ({
                            functions: { rgba, linearGradient },
                            palette: { gradients },
                        }) =>
                            `${linearGradient(
                                rgba(gradients.info.main, 0.1),
                                rgba(gradients.info.state, 0.1),
                            )}, url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: '50%',
                        overflow: 'hidden',
                    }}
                />
                <Card
                    sx={{
                        position: 'relative',
                        mt: -8,
                        mx: 3,
                        py: 2,
                        px: 4,
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} xl={4}>
                            <TextField
                                id="name"
                                name="name"
                                type="text"
                                variant="outlined"
                                fullWidth
                                label={
                                    error?.holidayNameError?.length
                                        ? error?.holidayNameError
                                        : 'HOLIDAY NAME'
                                }
                                value={holidays?.holidayName}
                                onChange={(e) => {
                                    handleHolidays('holidayName', e.target.value)
                                }}
                                size="medium"
                                error={error?.holidayNameError?.length}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} xl={4}>
                            <TextField disabled fullWidth onClick={hanldedaterange} value={`${new Date(holidays?.dateRange[0].startDate).getFullYear() + '-' + (new Date(holidays?.dateRange[0].startDate).getMonth() + 1) + '-' + new Date(holidays?.dateRange[0].startDate).getDate()} / ${new Date(holidays?.dateRange[0].endDate).getFullYear() + '-' + (new Date(holidays?.dateRange[0].endDate).getMonth() + 1) + '-' + new Date(holidays?.dateRange[0].endDate).getDate()}`} />
                            {dateRangeshow &&
                                <div style={{ marginTop: "10px" }}>
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={item => handleHolidays(`dateRange`, [item.selection])}
                                        ranges={holidays?.dateRange}
                                    />
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12} md={4} xl={4}>
                            <TextField
                                select
                                label={
                                    error?.holidayTypeError?.length
                                        ? error?.holidayTypeError
                                        : 'TYPE OF HOLIDAY'
                                }
                                variant="outlined"
                                type="text"
                                id="holidaytype"
                                name="holidaytype"
                                fullWidth
                                size="medium"
                                value={holidays?.holidayType}
                                onChange={(e) => {
                                    handleHolidays('holidayType', e.target.value)
                                }}
                                InputProps={{
                                    style: {
                                        padding: 10,
                                    },
                                }}
                                error={error?.holidayTypeError?.length}
                            >
                                {typeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                placeholder="DESCRIPTION"
                                multiline
                                fullWidth
                                rows={4}
                                maxRows={10}
                                value={holidays?.description}
                                onChange={(e) => {
                                    handleHolidays('description', e.target.value)
                                }}
                            />
                        </Grid>
                        {btnLoading?.loading ? (
                            <Grid
                                item
                                xs={12}
                                md={12}
                                xl={12}
                                sx={{ textAlign: 'center', paddingTop: '30px' }}
                            >
                                <LoadingButton
                                    loading
                                    variant="outlined"
                                    style={{
                                        minWith: '250px',
                                        margin: 'auto',
                                        color: 'white',
                                        background: '#2FAEB5',
                                        padding: '0px 60px 0px 60px',
                                    }}
                                />
                            </Grid>
                        ) : (
                            <Grid
                                item
                                xs={12}
                                md={12}
                                xl={12}
                                sx={{ textAlign: 'center', paddingTop: '30px' }}
                            >
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() => ValidForm()}
                                    style={{
                                        minWith: '250px',
                                        margin: 'auto',
                                        color: 'white',
                                        background: '#2FAEB5',
                                    }}
                                >
                                    CREATE
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Card>
            </MDBox>
        </DashboardLayout>
    )
}

export default holidays
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2'
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { REACT_APP_BACKEND_ATTENDANCE_ADD_API } from 'config/backendApi';

export const textfield = ({ getAttendanceApi, attendanceData }) => {
    const [date, setDate] = useState(new Date())
    const [inTime, setInTime] = useState(`08:00:00`)
    const [outTime, setOutTime] = useState(`17:00:00`)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState({
        loading: false,
        error: false,
        network: false,
    })

    const addEnteriesCall = () => {
        setLoading({ loading: true, error: false, network: false })
        try {
            fetch(`${`${REACT_APP_BACKEND_ATTENDANCE_ADD_API}`}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    name: attendanceData[0]?.name,
                    attendanceId: attendanceData[0]?.attendanceId,
                    date: date,
                    inTime: inTime,
                    outTime: outTime,
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.hasError === true) {
                        if (res.error.error) {
                            setLoading({ loading: false, error: true, network: false })
                        }
                    } else {
                        setLoading({ loading: false, error: false, network: false })
                        setOpen(false)
                        Swal.fire({
                            icon: 'success',
                            title: `Success`,
                            html: `<div class="badge-text">ENTERIES ADD.</div>`,
                        }).then(() => {
                            getAttendanceApi()
                        })
                    }
                })
                .catch(() => {
                    setLoading({ loading: false, error: false, network: false })
                    setOpen(false)
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
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDate = (selectedDate) => {
        setDate(selectedDate)
    }

    const handleInTime = (selectedInTime) => {
        setInTime(selectedInTime?.target?.value)

        // let checkIsAMPM = selectedInTime?.target?.value?.split(':')[0]
        // console.log(`selectedInTime`, checkIsAMPM)

        // if (checkIsAMPM > 13) {
        //     setInTime(selectedInTime?.target?.value + ' PM')
        // } else {
        //     setInTime(selectedInTime?.target?.value + ' AM')

        // }
    }

    const handleOutTime = (selectedOutTime) => {
        setOutTime(selectedOutTime?.target?.value)
    }


    return (
        <>
            <Button
                component="span"
                variant="contained"
                style={{
                    margin: 'auto',
                    color: 'white',
                    background: '#2FAEB5',
                }}
                onClick={handleClickOpen}
            >
                Add Enteries
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ATTENDANCE</DialogTitle>
                <DialogContent>
                    {loading.error ? (
                        <div style={{ color: "red", textAlign: "center" }}>Attendance Already Exists.</div>
                    ) : (
                        null
                    )}
                    <Grid container spacing={3}>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            xl={6}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                id="fullName"
                                label="FULL NAME"
                                type="fullName"
                                disabled
                                value={attendanceData[0]?.name}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            xl={6}
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MobileDatePicker
                                    label="DATE"
                                    inputFormat="MM/dd/yyyy"
                                    variant="outlined"
                                    value={date}
                                    onChange={handleDate}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            margin="dense"
                                            variant="outlined"
                                            label={'DATE'}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            xl={6}
                        >
                            <Stack component="form" noValidate spacing={3}>
                                <TextField
                                    fullWidth
                                    id="intime"
                                    name='intime'
                                    label="IN TIME"
                                    type="time"
                                    defaultValue="08:00:00"
                                    value={inTime}
                                    onChange={handleInTime}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 400, // 5 min
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            xl={6}
                        >
                            <Stack component="form" noValidte spacing={3}>
                                <TextField
                                    fullWidth
                                    id="outtime"
                                    name='outtime'
                                    label="OUT TIME"
                                    type="time"
                                    defaultValue="17:00"
                                    value={outTime}
                                    onChange={handleOutTime}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 400, // 5 min
                                    }}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {loading.loading ? (
                        <LoadingButton
                            size="medium"
                            loading={loading}
                            loadingPosition="end"
                            endIcon={<SendIcon />}
                            variant="outlined"
                            disabled
                            style={{ color: "blue" }}
                        >
                            Add Enterie
                        </LoadingButton>
                    ) : (
                        <Button onClick={() => addEnteriesCall()}>Add Enterie</Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default textfield
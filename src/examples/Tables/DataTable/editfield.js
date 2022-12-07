import React, { useState, useEffect } from 'react'
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
import { REACT_APP_BACKEND_ATTENDANCE_EDIT_API } from 'config/backendApi';

export const editfield = ({ rowData, setModalOpening, getAttendanceApi }) => {
    const [editRowData] = useState(rowData)
    const singleIndexOfArray = editRowData?.time?.length - 1
    const [inTime, setInTime] = useState(editRowData?.time[0]?.split(`T`)[1]?.split(`.`)[0])
    const [outTime, setOutTime] = useState(editRowData?.time[singleIndexOfArray].split(`T`)[1].split(`.`)[0])
    const [open, setOpen] = useState(true)
    const [loading, setLoading] = useState({
        loading: false,
        error: false,
        network: false,
    })

    const handleSingleIndexOfArray = () => {
        if (editRowData?.time.length < 2) {

            let orignal = new Date(`${editRowData.time[0].split("T")[0]} ${editRowData.time[0].split("T")[1]}`).getTime()

            let bydefault = new Date(`${editRowData.time[0].split("T")[0]} 17:00:00`).getTime()

            if (orignal > bydefault) {
                setInTime(``)
            }
            else {
                setOutTime(``)
            }
        }
    }

    useEffect(() => {
        handleSingleIndexOfArray()
    }, []);

    const editEnteriesCall = () => {
        setLoading({ loading: true, error: false, network: false })
        try {
            fetch(`${`${REACT_APP_BACKEND_ATTENDANCE_EDIT_API}/${editRowData._id}`}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'PATCH',
                body: JSON.stringify({
                    date: editRowData?.date,
                    inTime: inTime,
                    outTime: outTime,
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res?.hasError === true) {
                        if (res?.error?.error) {
                            setLoading({ loading: false, error: true, network: false })
                        }
                    }
                    if (res?.error?.error === `Time entries can't be empty`) {
                        setLoading({ loading: false, error: true, network: false })
                    }
                    else {
                        setLoading({ loading: false, error: false, network: false })
                        setOpen(false)
                        Swal.fire({
                            icon: 'success',
                            title: `Success`,
                            html: `<div class="badge-text">ENTERIES UPDATED.</div>`,
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

    const handleClose = () => {
        setModalOpening()
    };


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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ATTENDANCE</DialogTitle>
                <DialogContent>
                    {loading.error ? (
                        <div style={{ color: "red", textAlign: "center" }}>Enter Your Entrie Time.</div>
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
                                value={editRowData?.name}
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
                                    value={editRowData?.date}
                                    disabled
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
                                    value={inTime}
                                    // defaultValue={editRowData?.time[0]}
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
                                    // defaultValue="17:00"
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
                            Edit Enterie
                        </LoadingButton>
                    ) : (
                        <Button onClick={() => editEnteriesCall()}>Edit Enterie</Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default editfield
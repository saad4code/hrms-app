// Soft UI Dashboard React components
// Import React
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import moment from 'moment'
import { REACT_APP_BACKEND_ATTENDANCE_API } from "config/backendApi"


// Export function default
export default function useAttendancerecordHook(filters) {
  const [attendanceData, setAttendanceData] = useState([])
  const [loading, setLoading] = useState({
    loading: false,
    error: false,
    network: false,
    default: true,
  })
  const [lateDays, setLateDays] = useState(0)

  // Attendance Get.
  const getAttendanceApi = async () => {
    // Date Logic With Payload
    let dateArray = []
    if (filters.dateRange.length) {
      let startDate = new Date(filters?.dateRange[0].startDate)
      let endDate = new Date(filters?.dateRange[0].endDate)
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

    const empId = localStorage.getItem("empId")
    try {
      setLoading({ loading: true, error: false, network: false })
      fetch(`${REACT_APP_BACKEND_ATTENDANCE_API}/?employeeId=${empId ? empId : filters?.id}&DateRange=${JSON.stringify(splitingDateArray)}&checkTime=${filters?.timeStatus}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          return res.json()
        })
        .then((attendancedata) => {
          localStorage.setItem("empId", "")
          if (attendancedata.hasError === true) {
            setLoading({ loading: false, error: true, network: false })
          } else {
            setLoading({ loading: false, error: false, network: false })
            setAttendanceData(attendancedata.data.attendance)
          }
        })
        .catch(() => {
          setLoading({ loading: false, error: false, network: true })
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `Something went wrong!`,
      })
    }
  }

  // Attendance Upload.
  const uploadAttendance = async (payload) => {
    try {
      setLoading({ loading: true, error: false, network: false })
      fetch(`${REACT_APP_BACKEND_ATTENDANCE_API}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: payload }),
      })
        .then((res) => {
          return res.json()
        })
        .then((attendancedata) => {
          if (attendancedata?.hasError === true) {
            setLoading({ loading: false, error: true, network: false })
          } else {
            setLoading({ loading: false, error: false, network: false })
            setattendance(attendancedata?.data?.attendance)
          }
        })
        .catch(() => {
          setLoading({ loading: false, error: false, network: true })
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `Something went wrong!`,
      })
    }
  }

  // Handleing The Duration Of Two Times.
  const handleDuration = (times) => {
    let currentTimes = []
    if (times.length !== 1) {
      if (times.length > 2) {
        currentTimes = [times[0], times[times.length - 1]]
      } else {
        currentTimes = times
      }

      const duration = moment.duration(moment(currentTimes[1]).diff(moment(currentTimes[0])));
      const hours = parseInt(duration.asHours());
      const minutes = parseInt(duration.asMinutes()) % 60;
      return (
        <div
          style={{
            float: 'right',
          }}
        >
          <span
            style={{

              fontSize: "11.4px",
              backgroundColor: '#6854A1',
              borderRadius: '18px',
              padding: '5px',
              color: 'white',
            }}
          >
            {hours + "h:" + minutes + "m"}
          </span>
        </div>
      )
    } else {
      return (
        `Duration Not Found`
      )
    }
  }

  // Api Call Function.
  useEffect(() => {
    getAttendanceApi()
  }, [])

  // Handle Custom Time 5:00 Pm Against Every Employe.
  const handleEnteries = (attend) => {
    // let customTime
    let limitTime = new Date(`${attend.date.split("T")[0]} 09:31:00`).getTime()
    let arrivingTime = new Date(`${attend.time[0].split("T")[0]} ${attend.time[0].split("T")[1].split(".")[0]}`).getTime()


    // let orignal = new Date(`${attend.time[0].split("T")[0]} ${attend.time[0].split("T")[1]}`).getTime()
    // let bydefault = new Date(`${attend.time[0].split("T")[0]} 17:00:00`).getTime()

    // if (orignal < bydefault) {
    //   customTime = `05:00:00 PM`
    // }

    return attend?.time?.map((time, i) => {
      return (
        <>
          <div
            key={i}
            style={{
              float: 'left'
            }}
          >
            <span
              style={{
                backgroundColor: `${arrivingTime > limitTime ? "red" : "#2FAEB5"}`,
                fontSize: "11.4px",
                borderRadius: '18px',
                padding: '5px',
                color: 'white'
              }}
            >
              {moment(time).utc().format('hh:mm:ss A')}
            </span>
          </div>
          {/* {
            // CustomTime 
            attend.time?.length < 2 && customTime?.length &&
            <span
              style={{
                backgroundColor: `#2FAEB5`,
                borderRadius: '18px',
                padding: '5px',
                color: 'white',
                fontSize: "11.4px",
              }}>
              {customTime}
              <span style={{ padding: "5px" }}>
                ⬤
              </span>
            </span>
          } */}
        </>
      )
    })
  }

  // Late Time Handleing Against Every Employe. 
  useEffect(() => {
    let count = 0
    if (attendanceData) {
      attendanceData?.forEach((attend) => {
        let firstEntry = new Date(`${attend.date.split("T")[0]} 12:00:00`).getTime()
        let limitTime = new Date(`${attend.date.split("T")[0]} 09:30:00`).getTime()
        let arrivingTime = new Date(attend.time[0]).getTime()
        if (attend.time.length > 1) {
          if (arrivingTime > limitTime) {
            count = count + 1
          }
        } else {
          if (arrivingTime <= firstEntry) {
            if (arrivingTime > limitTime) {
              count = count + 1
            }
          }
        }
      })

    }
    setLateDays(count)
  }, [attendanceData])


  // Return This Table
  return {

    loading,
    getAttendanceApi,
    uploadAttendance,
    attendanceData,
    lateDays,
    columns: [
      { Header: 'Name', accessor: 'author', },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Entries', accessor: 'timestamp' },
      { Header: 'Duration', accessor: 'duration' },
    ],

    rows: attendanceData?.map((attend) => ({
      author: attend?.name.split(`'`),
      date: attend?.date?.split(`T`)[0] + ` [${moment(attend?.date?.split(`T`)[0]).format('dddd')}]`,

      timestamp: handleEnteries(attend),
      duration: handleDuration(attend?.time),
    })),
  }
}

// Soft UI Dashboard React components
// Import React
import React, { useEffect, useState } from 'react'
// Import Link From React Router-Dom
import { Link } from 'react-router-dom'
// Import MDBox,MDAvatarl,MDBadge from Components folder
import MDBox from 'components/MDBox'
import MDAvatar from 'components/MDAvatar'
import MDBadge from 'components/MDBadge'
// Import Icons From Material UI
import PhoneIcon from '@mui/icons-material/Phone'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Swal from 'sweetalert2'
import MoneyIcon from '@mui/icons-material/Money';
import { REACT_APP_BACKEND_API } from "config/backendApi"


// Export function default
export default function Employeesdata(filters) {

  const [employData, setEmployData] = useState([])
  const [loading, setLoading] = useState({
    loading: false,
    error: false,
    network: false,
    default: true,
  })

  const EmployeesApiCall = async () => {
    let queryOnMount = `${`?name=${filters.fullname}&designation=${filters.designation}&status=${!filters.status ? `EMPLOYED` : filters.status}&gender=${filters.gender}&attendanceId=${filters.attendance}`}`
    try {
      setLoading({ loading: true, error: false, network: false })
      fetch(`${REACT_APP_BACKEND_API}${queryOnMount}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          return res.json()
        })
        // .then((res) => res.json())
        .then((employeesdata) => {
          if (employeesdata.hasError === true) {
            setLoading({ loading: false, error: true, network: false })
          } else {
            setLoading({ loading: false, error: false, network: false })
            setEmployData(employeesdata.data.employees)
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


  useEffect(() => {
    if (filters?.reset) EmployeesApiCall()
  }, [filters?.reset])

  // Return This Table
  return {
    loading,
    EmployeesApiCall,
    columns: [
      { Header: 'image', accessor: 'avatar', align: 'left' },
      { Header: 'name', accessor: 'author' },
      { Header: 'designation', accessor: 'designation' },
      { Header: 'contact', accessor: 'function', align: 'left' },
      { Header: 'status', accessor: 'status', align: 'center' },
      { Header: 'action', accessor: 'action', align: 'center' },
    ],

    rows: employData?.map((employ) => ({
      avatar: (
        <>
          <MDAvatar src={employ.img}></MDAvatar>
        </>
      ),
      author: employ.fullName,
      designation: employ.designation,

      function: (
        <>
          <a href={`tel:${employ.mobile}`}>
            <Tooltip
              TransitionComponent={Zoom}
              title="Phone"
              arrow
              placement="top"
            >
              <PhoneIcon
                style={{
                  marginRight: '10px',
                  height: '18px',
                  width: '18px',
                  color: '#2FAEB5',
                }}
              />
            </Tooltip>
          </a>
          <a
            href={`https://wa.me/${employ.whatsapp}`}
            target={'_blank'}
            rel="noreferrer"
          >
            <Tooltip
              TransitionComponent={Zoom}
              title="Whatsapp"
              arrow
              placement="top"
            >
              <WhatsAppIcon
                style={{
                  marginRight: '10px',
                  height: '18px',
                  width: '18px',
                  color: '#2FAEB5',
                }}
              />
            </Tooltip>
          </a>
          <Tooltip
            TransitionComponent={Zoom}
            title="Email"
            arrow
            placement="top"
          >
            <a href={`mailto:${employ.email}`}>
              <MailOutlineIcon
                style={{ height: '18px', width: '18px', color: '#2FAEB5' }}
              />
            </a>
          </Tooltip>
        </>
      ),

      status: (
        <MDBox ml={-1}>
          {employ.status === 'EMPLOYED' ? (
            <MDBadge
              badgeContent={`${employ.status}`}
              color="success"
              variant="gradient"
              size="sm"
            />
          ) : (
            <MDBadge
              badgeContent={`${employ.status}`}
              color="error"
              variant="gradient"
              size="sm"
            />
          )}
        </MDBox>
      ),

      action: (
        <>
          <Tooltip
            TransitionComponent={Zoom}
            title="View"
            arrow
            placement="top"
          >
            <Link to={`/employees/${employ._id}/update`}>
              <VisibilityIcon
                style={{ height: '18px', width: '18px', color: '#2FAEB5', marginRight: '10px', }}
              />
            </Link>
          </Tooltip>

          <>
            <Tooltip
              TransitionComponent={Zoom}
              title="View Attendance"
              arrow
              placement="top"
            >
              <Link onClick={() => { localStorage.setItem("empId", employ?._attendanceId) }} to={`/attendance`}>
                <CalendarMonthIcon
                  style={{ height: '18px', width: '18px', color: '#2FAEB5', marginRight: '10px', }}
                />
              </Link>
            </Tooltip>

            <Tooltip
              TransitionComponent={Zoom}
              title="Salary"
              arrow
              placement="top"
            >
              <Link to={`/salary/${employ?._attendanceId}`}>
                <MoneyIcon
                  style={{ height: '18px', width: '18px', color: '#2FAEB5' }}
                />
              </Link>
            </Tooltip>
          </>
        </>
      ),
    })),
  }
}

// Soft UI Dashboard React components
// Import React
import React, { useEffect, useState } from 'react'
// Import MDBox from Components folder
import MDBox from 'components/MDBox'
// Import Link From React Router-Dom
import { Link } from 'react-router-dom'
// Import Icons From Material UI
import PhoneIcon from '@mui/icons-material/Phone'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Swal from 'sweetalert2'
import {REACT_APP_TALENTHUNT_BACKEND_API} from "config/backendApi"

// Export function default
export default function data() {
  const [candidate, setCandidatedata] = useState([])
  const [loading, setLoading] = useState({
    loading: false,
    error: false,
    network: false,
    default: true,
  })

  const TalenthutApi = async () => {
    try {
      setLoading({ loading: true, error: false, network: false })
      fetch(`${REACT_APP_TALENTHUNT_BACKEND_API}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          return res.json()
        })
        // .then((res) => res.json())
        .then((candidatedata) => {
          if (candidatedata.hasError === true) {
            setLoading({ loading: false, error: true, network: false })
          } else {
            setLoading({ loading: false, error: false, network: false })
            setCandidatedata(candidatedata.data.candidates)
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
    // Call this Api Function
    TalenthutApi()
  }, [])

  // Return This Table
  return {
    loading,
    TalenthutApi,
    columns: [
      { Header: 'candidate_Id', accessor: 'candidate' },
      { Header: 'name', accessor: 'author' },
      { Header: 'contact', accessor: 'function', align: 'left' },
      { Header: 'institute', accessor: 'institute', align: 'center' },
      { Header: 'action', accessor: 'action', align: 'center' },
    ],

    rows: candidate?.map((Candidate) => ({
      candidate: Candidate._candidateId,
      author: Candidate.fullName,

      function: (
        <>
          <a href={`tel:${Candidate.phone}`}>
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
            href={`https://wa.me/${Candidate.phone}`}
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
            <a href={`mailto:${Candidate.email}`}>
              <MailOutlineIcon
                style={{ height: '18px', width: '18px', color: '#2FAEB5' }}
              />
            </a>
          </Tooltip>
        </>
      ),

      institute: <MDBox ml={-1}>{Candidate.institute}</MDBox>,

      action: (
        <>
          <Tooltip
            TransitionComponent={Zoom}
            title="View"
            arrow
            placement="top"
          >
            <Link to={`/candidates/${Candidate._id}/view`}>
              <VisibilityIcon
                style={{ height: '18px', width: '18px', color: '#2FAEB5' }}
              />
            </Link>
          </Tooltip>
        </>
      ),
    })),
  }
}

// Soft UI Dashboard React components
// Import React
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import {REACT_APP_BACKEND_ACCOUNT_GET_API} from "config/backendApi"
// Export function default
export default function data() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState({
    loading: false,
    error: false,
    network: false,
    default: true,
  })

  const AccountApi = async () => {
    try {
      setLoading({ loading: true, error: false, network: false })
      fetch(` ${REACT_APP_BACKEND_ACCOUNT_GET_API}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          return res.json()
        })
        // .then((res) => res.json())
        .then((accountsdata) => {
          if (accountsdata.hasError === true) {
            setLoading({ loading: false, error: true, network: false })
          } else {
            setLoading({ loading: false, error: false, network: false })
            setAccounts(accountsdata.data.accounts)
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
    AccountApi()
  }, [])

  // Return This Table
  return {
    loading,
    AccountApi,
    columns: [
      { Header: 'accountname', accessor: 'accountname' },
      { Header: 'description', accessor: 'description' },
      { Header: 'Balance', accessor: 'Balance' },
    ],

    rows: accounts?.map((accounts) => ({
      accountname: accounts.accountName,
      description: accounts.accountDescription,
      Balance: accounts.totalBalance,
    })),
  }
}

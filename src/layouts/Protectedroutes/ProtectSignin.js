import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

export default function ProtectSignin({ children }) {
  let token = localStorage.getItem('token')
  let location = useLocation()
  let path = location.pathname
  if (process.browser && token && path === '/sign-in') {
    return <Navigate to={'/dashboard'} />
  } else {
    return children
  }
}

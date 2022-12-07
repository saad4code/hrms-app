import React from 'react'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export function Protect({ children }) {
  const tokenProtection = localStorage.getItem('token')
  return tokenProtection ? children : <Navigate to="/sign-in" />
}
// let x=[{name:{line :'adress',address:"park"},city:{line :'adress',address:"park"}}];
// x[0].name={
//     loading:true,
//     error:false,
// }
// console.log(x)

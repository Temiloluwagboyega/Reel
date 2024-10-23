import React from 'react'
import Form from '../components/auth/Form'
function Login() {
  return (
    <div><Form method='login' route='/api/token/'/></div>
  )
}

export default Login
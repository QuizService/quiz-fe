import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import GoogleLogin from './GoogleLogin'
import { setCookies, getCookies, setTokenAtCookies } from '../../../cookie/Cookie'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const onGoogleSignIn = async (res) => {
    const { credential } = res
    const result = await axios.post(
      'http://localhost:8080/api/googleLogin',
      JSON.stringify({ code: credential }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    const status = result.status
    if (status !== 200) console.error('login failed')
    console.log(result.headers)
    const accessToken = result.headers.authorization
    const refreshToken = result.headers.refresh

    setTokenAtCookies(accessToken, refreshToken)
    navigate('/dashboard')
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="Google login" />
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

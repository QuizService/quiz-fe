import React from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
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

const Login = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID

  const GoogleLogin = () => {
    const googleLogin = useGoogleLogin({
      scope: 'email profile',
      onSuccess: async ({ code }) => {
        axios
          .get('https://accounts.google.com/o/oauth2/v2/auth', { code })
          .then(({ data }) => console.log(data))
          .catch((error) => {
            console.log(error)
          })
      },
      onError: (error) => {
        console.log(error)
      },
      flow: 'auth-code',
    })

    return (
      <CButton color="primary" onClick={() => googleLogin()}>
        Google Login
      </CButton>
    )
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
                    <GoogleOAuthProvider clientId={clientId}>
                      <GoogleLogin />
                    </GoogleOAuthProvider>
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

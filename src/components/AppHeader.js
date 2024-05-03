import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CImage,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilContrast, cilMoon, cilSun } from '@coreui/icons'
import { logo } from 'src/assets/brand/logo'
import { AppHeaderDropdown } from './header/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../config/CustomAxios'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const [showInviteCode, setShowInviteCode] = useState(false)
  const [title, setTitle] = useState('')
  const [capacity, setCapacity] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  const changeTitle = (e) => {
    console.log(e.target.value)
    setTitle(e.target.value)
  }
  const changeCapacity = (e) => {
    setCapacity(e.target.value)
  }
  const changeStartDate = (e) => {
    const st = e.target.value
    if (st !== null && st !== '') {
      const tmpSt = st.split('T')
      const start = tmpSt[0] + ' ' + tmpSt[1] + ':00'
      setStartDate(start)
    }
  }
  const changeDueDate = (e) => {
    const dt = e.target.value
    if (dt !== null && dt !== '') {
      const tmpDt = dt.split('T')
      const due = tmpDt[0] + ' ' + tmpDt[1] + ':00'
      setDueDate(due)
    }
  }

  const createQuiz = async () => {
    console.log('save quiz')
    try {
      const response = await api.post(`/api/v1/quiz`, {
        title: title,
        capacity: capacity,
        startDate: startDate,
        dueDate: dueDate,
      })
      if (response.status === 200) {
        console.log('save quiz success')
        setTitle('')
        setCapacity(0)
        setStartDate('')
        setDueDate('')
      }
    } catch (err) {
      console.log(err)
    }
    setVisible(false)
  }

  const changeInviteCode = (e) => {
    console.log(e.target.value)
    setInviteCode(e.target.value)
  }

  const goToQuiz = (e) => {
    setShowInviteCode(false)
    navigate(`/wait/${inviteCode}`, {
      state: {
        endPoint: inviteCode,
      },
    })
  }

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CNavLink to="/dashboard" as={NavLink}>
          <CImage rounded src="/icons8-퀴즈-cute-outline-32.png" width={32} height={32} />
        </CNavLink>
        <CHeaderNav className="d-none d-md-flex">
          <CButton color="secondary" variant="ghost">
            {location.pathname === '/dashboard' && (
              <CNavLink onClick={() => setVisible(!visible)}>퀴즈 생성</CNavLink>
            )}
          </CButton>
          <CButton color="secondary" variant="ghost">
            {location.pathname === '/dashboard' && (
              <CNavLink onClick={() => setShowInviteCode(!showInviteCode)}>초대 코드 입력</CNavLink>
            )}
          </CButton>
        </CHeaderNav>
        <CHeaderNav className="ms-auto"></CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            {/* dark mode setting */}
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}></CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            id="title"
            label="title"
            onChange={changeTitle}
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormInput
            type="text"
            id="capacity"
            label="capacity"
            onChange={changeCapacity}
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormInput
            type="datetime-local"
            id="startDate"
            label="startDate"
            onChange={changeStartDate}
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormInput
            type="datetime-local"
            id="dueDate"
            label="dueDate"
            onChange={changeDueDate}
            aria-describedby="exampleFormControlInputHelpInline"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={(e) => createQuiz(e)}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        visible={showInviteCode}
        onClose={() => setShowInviteCode(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setShowInviteCode(false)}></CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            id="inviteCode"
            label="초대 코드"
            onChange={changeInviteCode}
            aria-describedby="exampleFormControlInputHelpInline"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowInviteCode(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={(e) => goToQuiz(e)}>
            이동
          </CButton>
        </CModalFooter>
      </CModal>
    </CHeader>
  )
}

export default AppHeader

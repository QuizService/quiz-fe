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
import { useLocation } from 'react-router-dom'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const location = useLocation()
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [capacity, setCapacity] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')

  const changeTitle = (e) => {
    console.log(e.target.value)
    setTitle(e.target.value)
  }
  const changeCapacity = (e) => {
    setCapacity(e.target.value)
  }
  const changeStartDate = (e) => {
    setStartDate(e.target.value)
  }
  const changeDueDate = (e) => {
    setDueDate(e.target.value)
  }

  const createQuiz = () => {
    console.log('save quiz')
    setVisible(false)
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
          <CIcon icon={logo} height={32} />
        </CNavLink>
        <CHeaderNav className="d-none d-md-flex">
          <CButton color="secondary" variant="ghost">
            {location.pathname === '/dashboard' && (
              <CNavLink href="#" onClick={() => setVisible(!visible)}>
                퀴즈 생성
              </CNavLink>
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
            type="date"
            id="startDate"
            label="startDate"
            onChange={changeStartDate}
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormInput
            type="date"
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
    </CHeader>
  )
}

export default AppHeader

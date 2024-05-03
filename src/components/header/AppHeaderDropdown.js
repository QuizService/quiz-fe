import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import userImage from './../../assets/images/avatars/user.png'
import { api } from '../../config/CustomAxios'

const AppHeaderDropdown = () => {
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState('')

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await api.get('/api/v1/user')
      if (res.status !== 200) {
        console.log('cannot get userInfo')
      }
      const userInfo = res.data.data
      setVisible(userInfo.name === null ? false : true)
      setUsername(userInfo.name === null ? '' : userInfo.name)
      setProfile(userInfo.picture === null ? '' : userInfo.picture)
    }
    getUserInfo()
  }, [])

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={profile === '' ? userImage : profile} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem href={username === '' ? '/login' : '/#'}>My Page</CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href={username === '' ? '/login' : '/logout'}>
          {username === '' ? 'Login' : 'Logout'}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

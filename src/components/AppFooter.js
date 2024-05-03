import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4" position="sticky">
      <div>
        <a target="_blank" href="https://icons8.com/icon/cVFryODskV5B/quizizz">
          Favicon
        </a>{' '}
        by{' '}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

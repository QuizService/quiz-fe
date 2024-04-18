import React, { useState, useEffect } from 'react'

import {
  CCol,
  CForm,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CFormCheck,
  CButton,
} from '@coreui/react'

const MultipleChoiceForm = () => {
  const [choices, setChoices] = useState([{ id: 0, answer: false, value: '' }])

  const btnClick = () => {
    setChoices((prevChoices) => [
      ...prevChoices,
      { id: prevChoices.length, answer: false, value: '' },
    ])
  }

  return (
    <CCol>
      {choices.map((item, idx) => (
        <CInputGroup className="mb-3" key={idx}>
          <CInputGroupText>
            <CFormCheck type="checkbox" />
          </CInputGroupText>
          <CFormInput />
        </CInputGroup>
      ))}
      <CButton color="primary" onClick={btnClick}>
        {' '}
        +{' '}
      </CButton>
    </CCol>
  )
}

export default MultipleChoiceForm

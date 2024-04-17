import React, { useState, useEffect } from 'react'

import {
  CCol,
  CForm,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CFormCheck,
  CFormSelect,
  CButton,
  CFormTextarea,
} from '@coreui/react'

const MultipleChoiceForm = ({ onValueChange }) => {
  const [choices, setChoices] = useState([{ id: 0, answer: false, value: '' }])

  const handleChange = (event, idx) => {
    const value = event.target.value
    setChoices((prevChoices) => {
      const updatedChoices = [...prevChoices]
      updatedChoices[idx] = { ...updatedChoices[idx], value }
      return updatedChoices
    })
    onValueChange(choices)
  }

  const handleCheck = (event, idx) => {
    const answer = event.target.checked
    setChoices((prevChoices) => {
      const updatedChoices = [...prevChoices]
      updatedChoices[idx] = { ...updatedChoices[idx], answer }
      return updatedChoices
    })
    onValueChange(choices)
  }

  const btnClick = () => {
    setChoices((prevChoices) => [
      ...prevChoices,
      { id: prevChoices.length, answer: false, value: '' },
    ])
  }

  const handleSubmit = () => {
    onValueChange(choices)
  }

  return (
    <CCol>
      {choices.map((item, idx) => (
        <CInputGroup className="mb-3" key={idx}>
          <CInputGroupText>
            <CFormCheck type="checkbox" onChange={(e) => handleCheck(e, idx)} />
          </CInputGroupText>
          <CFormInput onChange={(e) => handleChange(e, idx)} />
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

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

const MultipleChoiceForm = () => {
  const [result, setResult] = useState([
    {
      id: 'mul_' + 0,
      value: (
        <>
          <CInputGroupText>
            <CInputGroupText>
              <CFormCheck type="checkbox" value="" aria-label="Checkbox for following text input" />
            </CInputGroupText>
          </CInputGroupText>
          <CFormInput aria-label="Text input with radio button" />
        </>
      ),
    },
  ])

  const btnClick = () => {
    setResult([
      ...result,
      {
        id: 'mul_' + result.length,
        value: (
          <>
            <CInputGroupText>
              <CInputGroupText>
                <CFormCheck type="checkbox" aria-label="Checkbox for following text input" />
              </CInputGroupText>
            </CInputGroupText>
            <CFormInput aria-label="Text input with radio button" />
          </>
        ),
      },
    ])
  }

  return (
    <CCol>
      {result.map((item) => (
        <CInputGroup className="mb-3" key={item.id}>
          {item.value}
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

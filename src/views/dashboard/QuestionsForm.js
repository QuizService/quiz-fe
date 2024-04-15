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

const QuestionForm = () => {
  let [question, setQuestion] = useState('')

  const [multipleChoiceForm, setMultipleChoiceForm] = useState({
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
  })

  const changeQuestions = (event) => {
    setQuestion(event.target.value)
  }

  const btnClick = () => {
    setMultipleChoiceForm([
      ...multipleChoiceForm,
      {
        id: multipleChoiceForm.length,
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
    <>
      <CForm className="row g-3">
        <CCol md={8}>
          <CFormInput id="inputTitle" label="Title" />
        </CCol>
        <CCol md={4}>
          <CFormSelect id="inputState" label="Type" onChange={changeQuestions}>
            <option value="">Type</option>
            <option value="M">Multiple</option>
            <option value="S">Short</option>
          </CFormSelect>
        </CCol>
        {question === '' && <></>}
        {/* {question === 'M' && } */}
        {question === 'S' && Short()}
      </CForm>
    </>
  )
}

function Short() {
  return <CFormTextarea label="Write your Answer" rows={3}></CFormTextarea>
}

export default QuestionForm

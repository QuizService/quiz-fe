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

import MultipleChoiceForm from './questionForm/MultipleChoiceForm'

const QuestionForm = () => {
  let [question, setQuestion] = useState('')

  const changeQuestions = (event) => {
    setQuestion(event.target.value)
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
        {question === 'M' && <MultipleChoiceForm />}
        {question === 'S' && Short()}
      </CForm>
    </>
  )
}

function Short() {
  return <CFormTextarea label="Write your Answer" rows={3}></CFormTextarea>
}

export default QuestionForm

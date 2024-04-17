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
import MultipleChoiceForm from '../dashboard/questionForm/MultipleChoiceForm'

const QuestionForm = (props) => {
  let [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState([])

  const changeQuestions = (event) => {
    setQuestion(event.target.value)
  }

  const changeAnswer = (event) => {
    console.log(event.target.value)
    const answer = {
      questionType: 'S',
      choices: [],
      answer: event.target.value,
    }

    props.onValueChange(answer, props.idx)
  }

  const shortAnswerForm = (
    <CFormTextarea label="Write your Answer" rows={3} onChange={changeAnswer}></CFormTextarea>
  )

  const handleValueChange = (data) => {
    setAnswers(data)
    const answer = {
      questionType: 'M',
      choices: answers,
      answer: '',
    }
    props.onValueChange(answer, props.idx)
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
        {question === 'M' && <MultipleChoiceForm onValueChange={handleValueChange} />}
        {question === 'S' && shortAnswerForm}
      </CForm>
    </>
  )
}

export default QuestionForm

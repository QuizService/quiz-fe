import React, { useRef, useState } from 'react'

import {
  CCol,
  CForm,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CFormCheck,
  CFormSelect,
  CButton,
} from '@coreui/react'
import QuestionForm from './QuestionsForm'

const Quiz = () => {
  const id = useRef(1)

  const [quizForm, setQuizForm] = useState([
    {
      id: 0,
      value: <QuestionForm />,
    },
  ])

  const addForm = () => {
    setQuizForm([
      ...quizForm,
      {
        id: id.current,
        value: <QuestionForm />,
      },
    ])
    id.current += 1
  }

  const removeForm = (idxToRemove) => {
    setQuizForm((prevForm) => prevForm.filter((item) => item.id !== idxToRemove))
  }

  return (
    <>
      {quizForm.map((item) => (
        <CForm className="row g-3" key={item.id}>
          {item.value}
          <CButton color="primary" onClick={() => removeForm(item.id)}>
            {' '}
            -{' '}
          </CButton>
        </CForm>
      ))}
      <CForm className="row g-3">
        <CButton color="primary" onClick={addForm}>
          {' '}
          +{' '}
        </CButton>
      </CForm>
    </>
  )
}

export default Quiz

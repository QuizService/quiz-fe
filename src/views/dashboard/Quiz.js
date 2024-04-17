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
  const [questions, setQuestions] = useState([])

  const [quizForm, setQuizForm] = useState([])

  const addForm = () => {
    const idx = id.current
    setQuizForm([
      ...quizForm,
      {
        id: idx,
        value: <QuestionForm onValueChange={handleValueChange} idx={idx} />,
      },
    ])

    setQuestions([
      ...questions,
      {
        id: idx + 1,
        value: { sequence: questions.length, questionType: '', choices: [], answer: '' },
      },
    ])
    id.current += 1
    console.log(questions)
    console.log(quizForm)
  }

  const handleValueChange = (data, idx) => {
    let findIdx = questions.findIndex((item) => {
      console.log(item.id)
      return item.id === idx
    })
    let copiedArr = [...questions]

    const result = {
      sequence: findIdx,
      questionType: data.questionType,
      choices: data.choices,
      answer: data.answer,
    }

    console.log(findIdx)
    console.log(idx)
    copiedArr[findIdx].value = result
    setQuestions(copiedArr)
    console.log(questions)
  }

  const removeForm = (idxToRemove) => {
    setQuizForm((prevForm) => prevForm.filter((item) => item.id !== idxToRemove))
    setQuestions((question) => question.filter((item) => item.id !== idxToRemove))
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

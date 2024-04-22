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
  const [question, setQuestion] = useState([
    {
      id: 0,
      value: { title: '', score: 0, sequence: 0, questionType: '', choices: [], answer: '' },
    },
  ])
  const [quizForm, setQuizForm] = useState([
    {
      id: 0,
      value: <QuestionForm setQuestion={setQuestion} question={question} id={0} />,
    },
  ])

  const addForm = async () => {
    const idx = id.current

    await addQuestions(idx)
    await addQuizForm(idx)
    await plusId()
    console.log(question)
  }

  const addQuestions = async (idx) => {
    setQuestion((prevQuestion) => [
      ...prevQuestion,
      {
        id: idx,
        value: { title: '', score: 0, sequence: 0, questionType: '', choices: [], answer: '' },
      },
    ])
  }

  const plusId = async () => {
    id.current += 1
  }

  const addQuizForm = async (idx) => {
    setQuizForm((prevQuizForm) => [
      ...prevQuizForm,
      {
        id: idx,
        value: <QuestionForm setQuestion={setQuestion} question={question} id={idx} />,
      },
    ])
  }

  const removeForm = async (idxToRemove) => {
    await removeQuestion(idxToRemove)
    await removeQuizForm(idxToRemove)
  }

  const removeQuestion = async (idx) => {
    setQuestion((prev) => prev.filter((item) => item.id !== idx))
  }

  const removeQuizForm = async (idx) => {
    setQuizForm((prevForm) => prevForm.filter((item) => item.id !== idx))
  }

  const submit = () => {
    console.log(question)
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
        <CButton color="primary" onClick={submit}>
          submit
        </CButton>
      </CForm>
    </>
  )
}

export default Quiz

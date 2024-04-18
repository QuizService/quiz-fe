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
  CFormTextarea,
} from '@coreui/react'
import QuestionForm from './QuestionsForm'

const Quiz2 = () => {
  const [quizForm, setQuizForm] = useState([])
  const [questionType, setQuestionType] = useState([])

  const addForm = () => {
    setQuizForm((quiz) => [
      ...quiz,
      {
        title: '',
        score: 0,
        questionType: '',
        choices: [
          { id: 0, isAnswer: false, value: '' },
          { id: 1, isAnswer: false, value: '' },
          { id: 2, isAnswer: false, value: '' },
          { id: 3, isAnswer: false, value: '' },
          { id: 4, isAnswer: false, value: '' },
        ],
        answer: '',
      },
    ])
    setQuestionType((type) => [...type, ''])
  }

  const handleQuestionType = (e, idx) => {
    setQuestionType(questionType.map((item, index) => (idx === index ? e.target.value : item)))
  }

  const edit = (e, idx) => {
    const { name, value } = e.target
    setQuizForm(
      quizForm.map((item, index) =>
        idx === index ? { ...item, [name]: value, questionType: questionType[index] } : item,
      ),
    )
  }

  const editChoice = (e, id, idx) => {
    const { name, value } = e.target
    const newQuizForm = quizForm.map((item, index) => {
      if (index === idx) {
        const newChoices = item.choices.map((it, i) => (i === id ? { ...it, [name]: value } : it))
        return { ...item, choices: newChoices }
      } else {
        return item
      }
    })
    setQuizForm(newQuizForm)
  }

  const removeForm = (e, idx) => {
    console.log(idx)
    const newQuizForm = quizForm.filter((_, index) => index !== idx)
    setQuizForm(newQuizForm)
  }

  const submit = () => {
    console.log(questionType)
    console.log(quizForm)
  }

  return (
    <>
      {quizForm.map((item, idx) => (
        <CForm className="row g-3" key={item.id}>
          <CForm className="row g-3">
            <CCol md={8}>
              <CFormInput
                id="inputTitle"
                label="Title"
                name="title"
                onChange={(e) => edit(e, idx)}
              />
            </CCol>
            <CCol md={2}>
              <CFormSelect
                id="inputState"
                label="Type"
                value={questionType[idx]}
                onChange={(e) => handleQuestionType(e, idx)}
              >
                <option value="">Type</option>
                <option value="M">Multiple</option>
                <option value="S">Short</option>
              </CFormSelect>
            </CCol>
            <CCol md={2}>
              <CFormInput name="score" label="Score" onChange={(e) => edit(e, idx)} />
            </CCol>
            {questionType[idx] === '' && <></>}
            {questionType[idx] === 'M' && (
              <CCol>
                {item.choices.map((item, id) => (
                  <CInputGroup className="mb-3" key={id}>
                    <CInputGroupText>
                      <CFormCheck
                        type="checkbox"
                        name="isAnswer"
                        onChange={(e) => editChoice(e, id, idx)}
                      />
                    </CInputGroupText>
                    <CFormInput name="value" onChange={(e) => editChoice(e, id, idx)} />
                  </CInputGroup>
                ))}
              </CCol>
            )}
            {questionType[idx] === 'S' && (
              <CFormTextarea
                label="Write your Answer"
                rows={3}
                name="answer"
                onChange={(e) => edit(e, idx)}
              ></CFormTextarea>
            )}
          </CForm>
          <CButton color="primary" onClick={(e) => removeForm(e, idx)}>
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

export default Quiz2

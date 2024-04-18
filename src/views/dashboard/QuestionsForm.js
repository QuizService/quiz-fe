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

const QuestionForm = (props) => {
  let [question, setQuestion] = useState('')
  const [choices, setChoices] = useState([{ id: 0, isAnswer: false, value: '' }])

  const changeQuestions = (event) => {
    setQuestion(event.target.value)
  }

  const btnClick = () => {
    setChoices((prevChoices) => [
      ...prevChoices,
      { id: prevChoices.length, isAnswer: false, value: '' },
    ])
  }

  const editTitle = (event) => {
    const id = props.id
    const { name, value } = event.target
    // 직접 Quiz.js에서 정의된 question 상태를 업데이트합니다.
    const updatedQuestions = props.question.map((item) =>
      item.id === id
        ? {
            ...item,
            value: {
              ...item.value,
              questionType: question,
              [name]: value,
            },
          }
        : item,
    )
    props.setQuestion(updatedQuestions)
  }

  const editChoices = async (event, idx) => {
    const id = props.id
    const checked = event.target.checked
    const value = event.target.value

    setChoices((choice) =>
      choice.map((item) => (item.id === idx ? { ...item, isAnswer: checked, value: value } : item)),
    )

    await changeQuestionForm(choices, id)
  }

  const changeQuestionForm = async (choices, id) => {
    props.setQuestion((prevQuestions) =>
      prevQuestions.map((item) =>
        item.id === id
          ? {
              ...item,
              value: {
                ...item.value,
                choices: choices,
              },
            }
          : item,
      ),
    )
  }

  return (
    <>
      <CForm className="row g-3">
        <CCol md={8}>
          <CFormInput id="inputTitle" label="Title" name="title" onChange={editTitle} />
        </CCol>
        <CCol md={4}>
          <CFormSelect id="inputState" label="Type" onChange={changeQuestions}>
            <option value="">Type</option>
            <option value="M">Multiple</option>
            <option value="S">Short</option>
          </CFormSelect>
        </CCol>
        {question === '' && <></>}
        {question === 'M' && (
          <CCol>
            {choices.map((item, idx) => (
              <CInputGroup className="mb-3" key={idx}>
                <CInputGroupText>
                  <CFormCheck
                    type="checkbox"
                    name={`check${idx}`}
                    onChange={(e) => editChoices(e, idx)}
                  />
                </CInputGroupText>
                <CFormInput name={`choice${idx}`} onChange={(e) => editChoices(e, idx)} />
              </CInputGroup>
            ))}
            <CButton color="primary" onClick={btnClick}>
              {' '}
              +{' '}
            </CButton>
          </CCol>
        )}
        {question === 'S' && (
          <CFormTextarea
            label="Write your Answer"
            rows={3}
            name="answer"
            onChange={editTitle}
          ></CFormTextarea>
        )}
      </CForm>
    </>
  )
}

export default QuestionForm

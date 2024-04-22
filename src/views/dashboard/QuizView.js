import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardSubtitle,
  CInputGroup,
  CInputGroupText,
  CFormCheck,
  CButton,
  CDropdownToggle,
  CDropdown,
  CDropdownItem,
  CDropdownDivider,
  CDropdownMenu,
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CForm,
  CCallout,
  CFormTextarea,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { array } from 'prop-types'

const QuizView = () => {
  const params = useParams()
  console.log(params)
  const [quiz, setQuiz] = useState({
    quizId: 0,
    title: '',
    maxScore: 0,
    startDate: '',
    dueDate: '',
    created: '',
  })
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const quizInfo = {
    quizId: 1,
    title: 'title1',
    maxScore: 100,
    startDate: '2024-10-01',
    dueDate: '2024-10-30',
    created: '2024-04-22',
  }

  const questionArr = [
    {
      questionId: '1',
      title: 'title1',
      score: 10,
      questionType: 'M',
      choicesResponseDtos: [
        { seq: 1, title: 't1' },
        { seq: 2, title: 't2' },
        { seq: 3, title: 't3' },
        { seq: 4, title: 't4' },
        { seq: 5, title: 't5' },
      ],
    },
    {
      questionId: '2',
      title: 'title2',
      score: 10,
      questionType: 'S',
      choicesResponseDtos: [],
    },
    {
      questionId: '3',
      title: 'title3',
      score: 10,
      questionType: 'M',
      choicesResponseDtos: [
        { seq: 1, title: 't1' },
        { seq: 2, title: 't2' },
        { seq: 3, title: 't3' },
        { seq: 4, title: 't4' },
        { seq: 5, title: 't5' },
      ],
    },
  ]
  const qArr = []

  useEffect(() => {
    const endPoint = params.endpoint
    setQuiz(quizInfo)
    for (let i = 0; i < questionArr.length; i++) {
      qArr.push(questionArr[i])
    }
    setQuestions(qArr)
    const answersArr = []
    for (let i = 0; i < questionArr.length; i++) {
      answersArr.push({
        questionId: '',
        sequence: 0,
        choices: [],
        answer: '',
      })
    }
    setAnswers(answersArr)
  }, [])

  const submit = () => {
    console.log('saved')
  }

  return (
    <>
      <CForm>
        <CCallout color="primary">
          <h3>{quiz.title}</h3>
          <hr />
          <CCol>maxScore : {quiz.maxScore}</CCol>
          <CCol>startDate : {quiz.startDate}</CCol>
          <CCol>dueDate : {quiz.dueDate}</CCol>
        </CCallout>
        {questions.map((item, idx) => (
          <CCard key={item.questionId}>
            <CCardBody>
              <CCardTitle>{item.title}</CCardTitle>
              <CCardSubtitle className="mb-2 text-body-secondary">
                score : {item.score}
              </CCardSubtitle>
              {item.questionType === 'M' ? (
                <CCol>
                  {item.choicesResponseDtos.map((item, id) => (
                    <CInputGroup className="mb-3" key={id}>
                      <CInputGroupText>
                        <CFormCheck
                          type="checkbox"
                          name={`check${id}`}
                          onChange={(e) => isChecked(e, idx, id)}
                        />
                      </CInputGroupText>
                      <CFormInput name={`choice${id}`} defaultValue={item.title} />
                    </CInputGroup>
                  ))}
                </CCol>
              ) : (
                <CCol>
                  <CFormTextarea label="Write your Answer" rows={3} name="answer"></CFormTextarea>
                </CCol>
              )}
            </CCardBody>
          </CCard>
        ))}
      </CForm>
      <CForm className="row g-3">
        <CButton color="primary" onClick={submit}>
          submit
        </CButton>
      </CForm>
    </>
  )
}

export default QuizView

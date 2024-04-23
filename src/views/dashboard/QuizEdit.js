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
  CFormSelect,
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
import { useNavigate, useLocation } from 'react-router-dom'
import { array } from 'prop-types'

const QuizEdit = () => {
  const { state } = useLocation()
  const { quizId } = state

  const [quiz, setQuiz] = useState({
    quizId: 0,
    title: '',
    maxScore: 0,
    startDate: '',
    dueDate: '',
    created: '',
  })
  const [questions, setQuestions] = useState([])
  const [visible, setVisible] = useState(false)

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
        { seq: 1, title: 't1', isAnswer: true },
        { seq: 2, title: 't2', isAnswer: false },
        { seq: 3, title: 't3', isAnswer: false },
        { seq: 4, title: 't4', isAnswer: true },
        { seq: 5, title: 't5', isAnswer: false },
      ],
      answer: '',
    },
    {
      questionId: '2',
      title: 'title2',
      score: 10,
      questionType: 'S',
      choicesResponseDtos: [
        { seq: 1, title: '', isAnswer: false },
        { seq: 2, title: '', isAnswer: false },
        { seq: 3, title: '', isAnswer: false },
        { seq: 4, title: '', isAnswer: false },
        { seq: 5, title: '', isAnswer: false },
      ],
      answer: 'aaa',
    },
    {
      questionId: '3',
      title: 'title3',
      score: 10,
      questionType: 'M',
      choicesResponseDtos: [
        { seq: 1, title: 't1', isAnswer: false },
        { seq: 2, title: 't2', isAnswer: true },
        { seq: 3, title: 't3', isAnswer: false },
        { seq: 4, title: 't4', isAnswer: false },
        { seq: 5, title: 't5', isAnswer: false },
      ],
      answer: '',
    },
  ]
  const qArr = []

  useEffect(() => {
    setQuiz(quizInfo)
    for (let i = 0; i < questionArr.length; i++) {
      qArr.push(questionArr[i])
    }
    setQuestions(qArr)
  }, [])

  const isChecked = (e, idx, id) => {
    const checked = e.target.checked
    const newQuestionArr = questions.map((item, index) => {
      if (index === idx) {
        const newChoices = item.choicesResponseDtos.map((it, i) =>
          i === id ? { ...it, isAnswer: checked } : it,
        )
        return { ...item, choicesResponseDtos: newChoices }
      } else return item
    })
    setQuestions(newQuestionArr)
  }

  const editChoices = (e, idx, id) => {
    const choice = e.target.value
    const newQuestionArr = questions.map((item, index) => {
      if (index === idx) {
        const newChoices = item.choicesResponseDtos.map((it, i) =>
          i === id ? { ...it, title: choice } : it,
        )
        return { ...item, choicesResponseDtos: newChoices }
      } else return item
    })
    setQuestions(newQuestionArr)
  }

  const edit = (e, idx) => {
    const { name, value } = e.target
    const newQuestionArr = questions.map((item, index) => {
      if (index === idx) {
        return { ...item, [name]: value }
      } else return item
    })
    setQuestions(newQuestionArr)
  }

  const handleQuestionType = (e, idx) => {
    console.log(e.target.value)
    const updatedQuestions = questions.map((item, index) =>
      index === idx ? { ...item, questionType: e.target.value } : item,
    )
    setQuestions(updatedQuestions)
  }

  const removeForm = (e, idx) => {
    const newQuestionArr = questions.filter((item, index) => index !== idx)

    setQuestions(newQuestionArr)
  }

  const addForm = (e) => {
    setQuestions((question) => [
      ...question,
      {
        questionId: '',
        title: '',
        score: 0,
        questionType: '',
        choicesResponseDtos: [
          { seq: 1, title: '', isAnswer: false },
          { seq: 2, title: '', isAnswer: false },
          { seq: 3, title: '', isAnswer: false },
          { seq: 4, title: '', isAnswer: false },
          { seq: 5, title: '', isAnswer: false },
        ],
        answer: '',
      },
    ])
  }

  const submit = () => {
    const resultArr = []

    for (let i = 0; i < questions.length; i++) {
      const choiceArr = []
      const item = questions[i]
      if (item.questionType === 'M') {
        for (let j = 0; j < item.choicesResponseDtos.length; j++) {
          const c = item.choicesResponseDtos[j]
          choiceArr.push({
            sequence: j + 1,
            title: c.title,
            isAnswer: c.isAnswer,
          })
        }
      }
      const result = {
        questionId: item.questionId,
        title: item.title,
        score: item.score,
        sequence: i + 1,
        questionType: item.questionType,
        choices: choiceArr,
        answer: item.answer === '' ? null : item.answer,
      }
      resultArr.push(result)
    }
    console.log(resultArr)
  }

  const openModal = (e) => {
    setVisible(true)
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
          <CRow key={item.questionId}>
            <CCol>
              <CCard className="mb-3 border">
                <CCardBody>
                  <CCardTitle>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="basic-addon3">title</CInputGroupText>
                      <CFormInput
                        name="title"
                        defaultValue={item.title}
                        onChange={(e) => edit(e, idx)}
                      />
                    </CInputGroup>
                  </CCardTitle>
                  <CCardSubtitle className="mb-2 text-body-secondary">
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="basic-addon3">score</CInputGroupText>
                      <CFormInput
                        name="score"
                        defaultValue={item.score}
                        onChange={(e) => edit(e, idx)}
                      />
                    </CInputGroup>
                  </CCardSubtitle>
                  <CFormSelect
                    id="inputState"
                    label="Type"
                    defaultValue={item.questionType}
                    onChange={(e) => handleQuestionType(e, idx)}
                  >
                    <option value="">Type</option>
                    <option value="M">Multiple</option>
                    <option value="S">Short</option>
                  </CFormSelect>
                  {item.questionType === 'M' && (
                    <CCol>
                      {item.choicesResponseDtos.map((it, id) => (
                        <CInputGroup className="mb-3" key={id}>
                          <CInputGroupText>
                            <CFormCheck
                              type="checkbox"
                              name={id}
                              checked={it.isAnswer}
                              onChange={(e) => isChecked(e, idx, id)}
                            />
                          </CInputGroupText>
                          <CFormInput
                            name={id}
                            defaultValue={it.title}
                            onChange={(e) => editChoices(e, idx, id)}
                          />
                        </CInputGroup>
                      ))}
                    </CCol>
                  )}
                  {item.questionType === 'S' && (
                    <CCol>
                      <CFormTextarea
                        label="Write your Answer"
                        rows={3}
                        name="answer"
                        defaultValue={item.answer}
                        onChange={(e) => edit(e, idx)}
                      ></CFormTextarea>
                    </CCol>
                  )}
                  {item.questionType === '' && <></>}
                </CCardBody>
                <CButton color="primary" className="mb-3" onClick={(e) => removeForm(e, idx)}>
                  {' '}
                  -{' '}
                </CButton>
              </CCard>
            </CCol>
          </CRow>
        ))}
        <CButton color="primary" onClick={addForm}>
          {' '}
          +{' '}
        </CButton>
      </CForm>
      <br />
      <CForm>
        <CRow>
          <CButton color="primary" onClick={submit}>
            submit
          </CButton>
          <CButton color="danger" onClick={(e) => openModal(e)}>
            cancel
          </CButton>
        </CRow>
      </CForm>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}></CModalHeader>
        <CModalBody>Are you sure to exit? All changes will be lost!</CModalBody>
        <CModalFooter>
          <CButton color="danger">yes</CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            no
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default QuizEdit

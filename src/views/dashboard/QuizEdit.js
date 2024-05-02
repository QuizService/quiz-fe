import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

import { array } from 'prop-types'
import { api } from '../../config/CustomAxios'

const QuizEdit = () => {
  const navigate = useNavigate()
  const params = useParams()
  const quizId = params.quizId
  const [removeQuestionsIdArr, setRemoveQuestionsIdArr] = useState([])

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

  const getQuestionsInfo = async () => {
    const qArr = []
    try {
      const res = await api.get(`/api/v1/questions/${quizId}`)
      const data = res.data.data
      for (let i = 0; i < data.length; i++) {
        const choices = data[i].choicesResponseDtos

        qArr.push({
          questionId: data[i].questionId,
          title: data[i].title,
          score: data[i].score,
          questionType: data[i].questionType,
          choicesResponseDtos:
            data[i].questionType === 'S'
              ? [
                  { seq: 1, title: '', isAnswer: false },
                  { seq: 2, title: '', isAnswer: false },
                  { seq: 3, title: '', isAnswer: false },
                  { seq: 4, title: '', isAnswer: false },
                  { seq: 5, title: '', isAnswer: false },
                ]
              : [
                  { seq: choices[0].seq, title: choices[0].title, isAnswer: choices[0].answer },
                  { seq: choices[1].seq, title: choices[1].title, isAnswer: choices[1].answer },
                  { seq: choices[2].seq, title: choices[2].title, isAnswer: choices[2].answer },
                  { seq: choices[3].seq, title: choices[3].title, isAnswer: choices[3].answer },
                  { seq: choices[4].seq, title: choices[4].title, isAnswer: choices[4].answer },
                ],
          answer: data[i].questionType === 'M' ? '' : data[i].answer,
        })
      }
      setQuestions(qArr)
    } catch (err) {
      console.log(err)
    }
  }

  const getQuizInfo = async () => {
    try {
      const response = await api.get(`/api/v1/quiz/${quizId}`)
      const data = response.data.data
      const quizInfo = {
        quizId: data.quizId,
        title: data.title,
        maxScore: data.maxScore,
        startDate: data.startDate,
        dueDate: data.dueDate,
        created: data.created,
      }
      setQuiz(quizInfo)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getQuestionsInfo()
    getQuizInfo()
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
    const removeQuestions = questions.filter((item, index) => index === idx)
    const newQuestionArr = questions.filter((item, index) => index !== idx)
    if (removeQuestions[0].questionId !== '') {
      console.log(removeQuestions[0].questionId)
      setRemoveQuestionsIdArr((item) => [...item, removeQuestions[0].questionId])
    }

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

  const submit = async () => {
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
        questionId: item.questionId === '' ? null : item.questionId,
        title: item.title,
        score: item.score,
        sequence: i + 1,
        questionType: item.questionType,
        choices: choiceArr,
        answer: item.answer === '' ? null : item.answer,
      }
      resultArr.push(result)
    }
    try {
      console.log(resultArr)
      const request = { questionRequestDtos: resultArr, removeQuestionIds: removeQuestionsIdArr }
      const response = await api.patch(`/api/v1/questions/${quizId}`, request)
      console.log(response.status)

      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
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
          <CButton color="danger" onClick={() => navigate('/dashboard')}>
            yes
          </CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            no
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default QuizEdit

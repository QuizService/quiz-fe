import React, { useEffect, useRef, useState } from 'react'

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
  CCallout,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../config/CustomAxios'

const Quiz = () => {
  const [quizInfo, setQuizInfo] = useState({})
  const [quizForm, setQuizForm] = useState([])
  const [questionType, setQuestionType] = useState([])
  const navigate = useNavigate()

  const params = useParams()
  const quizId = params.quizId

  useEffect(() => {
    const getQuizInfo = async () => {
      try {
        const res = await api.get(`/api/v1/quiz/${quizId}`)
        const quizData = res.data.data
        console.log(quizData)
        setQuizInfo(quizData)
      } catch (err) {
        console.log(err)
      }
    }
    getQuizInfo()
  }, [])

  const addForm = () => {
    setQuizForm((quiz) => [
      ...quiz,
      {
        title: '',
        score: 0,
        questionType: '',
        choices: [
          { sequence: 1, title: '', isAnswer: false },
          { sequence: 2, title: '', isAnswer: false },
          { sequence: 3, title: '', isAnswer: false },
          { sequence: 4, title: '', isAnswer: false },
          { sequence: 5, title: '', isAnswer: false },
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

  const editCheck = (e, id, idx) => {
    const { name, checked } = e.target

    const newQuizForm = quizForm.map((item, index) => {
      if (index === idx) {
        const newChoices = item.choices.map((it, i) => (i === id ? { ...it, [name]: checked } : it))
        return { ...item, choices: newChoices }
      } else {
        return item
      }
    })
    setQuizForm(newQuizForm)
  }

  const editChoice = (e, id, idx) => {
    const { name, value } = e.target
    console.log(name)

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

  const submit = async () => {
    const questionList = []

    quizForm.forEach((item, idx) => {
      questionList.push({
        title: item.title,
        score: item.score,
        sequence: idx + 1,
        questionType: item.questionType,
        choices: item.choices,
        answer: item.answer,
      })
    })

    try {
      const questionIntegratedDto = {
        questionRequestDtos: questionList,
      }
      const res = await api.post(`/api/v1/questions/${quizId}`, questionIntegratedDto)
      console.log(res)
      await navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <CCallout color="primary">
        <h3>{quizInfo.title}</h3>
        <hr />
        <CCol>최대 참여 가능 인원 : {quizInfo.capacity}</CCol>
        <CCol>시작날짜 : {quizInfo.startDate}</CCol>
        <CCol>마감날짜 : {quizInfo.dueDate}</CCol>
      </CCallout>
      {quizForm.map((item, idx) => (
        <div key={item}>
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
                  <CInputGroup className="mb-3" key={item.id}>
                    <CInputGroupText>
                      <CFormCheck
                        type="checkbox"
                        id={`${id}`}
                        name="isAnswer"
                        checked={item.isAnswer}
                        onChange={(e) => editCheck(e, id, idx)}
                      />
                    </CInputGroupText>
                    <CFormInput name="title" onChange={(e) => editChoice(e, id, idx)} />
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
        </div>
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

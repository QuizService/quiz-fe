import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
  CInputGroup,
  CInputGroupText,
  CFormCheck,
  CButton,
  CCol,
  CFormInput,
  CForm,
  CCallout,
  CFormTextarea,
} from '@coreui/react'

import { api } from '../../config/CustomAxios'

const QuizView = () => {
  const params = useParams()
  const navigate = useNavigate()
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
  const [checkArr, setCheckArr] = useState([])

  const getQuizInfo = async () => {
    const endPoint = params.endpoint
    try {
      const response = await api.get(`/api/v1/quiz/form/${endPoint}`)
      const data = response.data.data
      setQuiz(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getQuestionsInfo = async () => {
    const endPoint = params.endpoint
    try {
      const response = await api.get(`/api/v1/questions/form/${endPoint}`)
      const data = response.data.data
      setQuestions(data)
      await getCheckedArr(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getCheckedArr = async (questions) => {
    const answersArr = []
    const checkedArr = []
    for (let i = 0; i < questions.length; i++) {
      answersArr.push({
        questionId: questions[i].questionId,
        sequence: i + 1,
        questionType: questions[i].questionType,
        choices: [
          { id: 0, isAnswer: false },
          { id: 1, isAnswer: false },
          { id: 2, isAnswer: false },
          { id: 3, isAnswer: false },
          { id: 4, isAnswer: false },
        ],
        answer: '',
      })
      checkedArr.push([false, false, false, false, false])
    }
    setAnswers(answersArr)
    setCheckArr(checkedArr)
  }

  useEffect(() => {
    getQuizInfo()
    getQuestionsInfo()
  }, [])

  const isChecked = (e, idx, id) => {
    const checked = e.target.checked
    const newAnswerArr = answers.map((item, index) => {
      if (index === idx) {
        const newChoices = item.choices.map((it, i) =>
          i === id ? { ...it, isAnswer: checked } : it,
        )
        return { ...item, choices: newChoices }
      } else {
        return item
      }
    })
    const newCheckedArr = checkArr.map((item, index) => {
      if (index === idx) {
        console.log(item)
        const newChecked = item.map((it, i) => (i === id ? checked : it))
        return newChecked
      } else {
        return item
      }
    })
    setAnswers(newAnswerArr)
    setCheckArr(newCheckedArr)
  }

  const edit = (e, idx) => {
    const newAnswerArr = answers.map((item, index) => {
      if (index === idx) {
        return { ...item, answer: e.target.value }
      } else return item
    })
    setAnswers(newAnswerArr)
  }

  const submit = async () => {
    console.log(answers)
    const resultArr = []
    for (let i = 0; i < answers.length; i++) {
      const choiceArr = []
      if (answers[i].questionType === 'M') {
        const choicesArr = answers[i].choices
        for (let j = 0; j < choicesArr.length; j++) {
          if (choicesArr[j].isAnswer === true) {
            choiceArr.push(j + 1)
          }
        }
      }

      const result = {
        questionId: answers[i].questionId,
        sequence: answers[i].sequence,
        choices: choiceArr,
        answer: answers[i].answer,
      }
      resultArr.push(result)
    }
    try {
      const response = await api.patch(`/api/v1/participant_info/${quiz.quizId}`, {
        responses: resultArr,
      })
      console.log(response)
      navigate(`/quiz/rank/${quiz.quizId}`, {
        state: {
          quizId: quiz.quizId,
        },
      })
    } catch (err) {
      console.log(err)
    }
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
          <CCard key={`question-${item.questionId}`}>
            <CCardBody>
              <CCardTitle>{item.title}</CCardTitle>
              <CCardSubtitle className="mb-2 text-body-secondary">
                score : {item.score}
              </CCardSubtitle>
              {item.questionType === 'M' ? (
                <CCol>
                  {item.choicesResponseDtos.map((item, id) => (
                    <CInputGroup className="mb-3" key={`choice-${id}`}>
                      <CInputGroupText>
                        <CFormCheck
                          type="checkbox"
                          name={`checked${idx}-${id}`}
                          checked={checkArr[idx][id]}
                          onChange={(e) => isChecked(e, idx, id)}
                        />
                      </CInputGroupText>
                      <CFormInput name={`title:${idx}-${id}`} defaultValue={item.title} readOnly />
                    </CInputGroup>
                  ))}
                </CCol>
              ) : (
                <CCol>
                  <CFormTextarea
                    label="Write your Answer"
                    rows={3}
                    name="answer"
                    onChange={(e) => edit(e, idx)}
                  ></CFormTextarea>
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

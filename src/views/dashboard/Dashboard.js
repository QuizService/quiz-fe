import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
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
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [quizModal, setQuizModal] = useState({
    quizId: 0,
    capacity: 0,
    title: '',
    startDate: '',
    dueDate: '',
  })

  const titleArr = ['title1', 'title2', 'title3', 'title4', 'title5', 'title6']

  const quizArr = [
    {
      quizId: 1,
      capacity: 10,
      title: 'title1',
      startDate: '2024-10-01',
      dueDate: '2024-10-31',
      isQuestionsCreated: false,
    },
    {
      quizId: 2,
      capacity: 10,
      title: 'title1',
      startDate: '2024-10-01',
      dueDate: '2024-10-31',
      isQuestionsCreated: true,
    },
    {
      quizId: 3,
      capacity: 10,
      title: 'title1',
      startDate: '2024-10-01',
      dueDate: '2024-10-31',
      isQuestionsCreated: true,
    },
    {
      quizId: 4,
      capacity: 10,
      title: 'title1',
      startDate: '2024-10-01',
      dueDate: '2024-10-31',
      isQuestionsCreated: false,
    },
    {
      quizId: 5,
      capacity: 10,
      title: 'title1',
      startDate: '2024-10-01',
      dueDate: '2024-10-31',
      isQuestionsCreated: false,
    },
  ]

  const resultArr = []
  const [result, setResult] = useState([])
  useEffect(() => {
    for (let i = 0; i < quizArr.length; i++) {
      resultArr.push(quizArr[i])
    }
    setResult(resultArr)
  }, [])

  const [title, setTitle] = useState('')
  const [capacity, setCapacity] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')

  const openQuizModal = (e, quiz) => {
    setVisible(!visible)
    console.log(quiz)
    setQuizModal({
      quizId: quiz.quizId,
      capacity: quiz.capacity,
      title: quiz.title,
      startDate: quiz.startDate,
      dueDate: quiz.dueDate,
    })
  }

  const updateQuiz = (e, quizId) => {
    console.log('update quiz')
    const quiz = {
      quizId: quizId,
      capacity: capacity === 0 ? quizModal.capacity : capacity,
      title: title === '' ? quizModal.title : title,
      startDate: startDate === '' ? quizModal.startDate : startDate,
      dueDate: dueDate === '' ? quizModal.dueDate : dueDate,
    }

    console.log(quiz)
    setVisible(false)
  }

  const createQuestion = (e, quizId) => {
    navigate('/quiz', {
      state: {
        quizId: quizId,
      },
    })
  }

  const editQuestion = (e, quizId) => {
    console.log(quizId)
    navigate('/quiz-edit', {
      state: {
        quizId: quizId,
      },
    })
  }

  const changeTitle = (e) => {
    console.log(e.target.value)
    setTitle(e.target.value)
  }
  const changeCapacity = (e) => {
    setCapacity(e.target.value)
  }
  const changeStartDate = (e) => {
    setStartDate(e.target.value)
  }
  const changeDueDate = (e) => {
    setDueDate(e.target.value)
  }

  return (
    <>
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
        {result.map((item, idx) => (
          <CCol sm={4} href="#" key={idx}>
            <CCard>
              <CCardBody>
                <CCardTitle>{item.title}</CCardTitle>
                <CCardText>
                  <CCol>{`startDate : ${item.startDate}`}</CCol>
                  <CCol>{`dueDate : ${item.dueDate}`}</CCol>
                </CCardText>
                <CDropdown alignment={{ lg: 'end' }}>
                  <CDropdownToggle color="transparent" caret={false}>
                    <CIcon icon={cilOptions} className="text-white" />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#" onClick={(e) => openQuizModal(e, item)}>
                      퀴즈 업데이트
                    </CDropdownItem>
                    {item.isQuestionsCreated === true ? (
                      <CDropdownItem href="#" onClick={(e) => createQuestion(e, item.quizId)}>
                        문제 생성
                      </CDropdownItem>
                    ) : (
                      <CDropdownItem onClick={(e) => editQuestion(e, item.quizId)}>
                        문제 업데이트
                      </CDropdownItem>
                    )}
                  </CDropdownMenu>
                </CDropdown>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setVisible(false)}></CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              id="title"
              label="title"
              defaultValue={quizModal.title}
              onChange={changeTitle}
              aria-describedby="exampleFormControlInputHelpInline"
            />
            <CFormInput
              type="text"
              id="capacity"
              label="capacity"
              defaultValue={quizModal.capacity}
              onChange={changeCapacity}
              aria-describedby="exampleFormControlInputHelpInline"
            />
            <CFormInput
              type="date"
              id="startDate"
              label="startDate"
              defaultValue={quizModal.startDate}
              onChange={changeStartDate}
              aria-describedby="exampleFormControlInputHelpInline"
            />
            <CFormInput
              type="date"
              id="dueDate"
              label="dueDate"
              defaultValue={quizModal.dueDate}
              onChange={changeDueDate}
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={(e) => updateQuiz(e, quizModal.quizId)}>
              Save changes
            </CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    </>
  )
}

export default Dashboard

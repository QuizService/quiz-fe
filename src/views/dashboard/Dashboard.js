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
  CModalBody,
  CModalFooter,
  CFormInput,
  CCardHeader,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import Pagination from '../pagination/Pagination'
import { api } from '../../config/CustomAxios'

const Dashboard = () => {
  const navigate = useNavigate()
  const [showQuizUpdateModal, setShowQuizUpdateModal] = useState(false)
  const [showQuizUrl, setShowQuizUrl] = useState(false)
  const [quizUrl, setQuizUrl] = useState('')
  const [quizModal, setQuizModal] = useState({
    quizId: 0,
    capacity: 0,
    title: '',
    startDate: '',
    dueDate: '',
    isQuestionsCreated: false,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const resultArr = []
  const [result, setResult] = useState([])

  const getQuizList = async () => {
    console.log(currentPage)
    const res = await api.get(`/api/v1/quiz?page=${currentPage}&size=${size}`)
    if (res.status != 200) {
      console.log(res.error)
      return
    }
    const quizList = res.data.data.data
    const pageInfo = res.data.data.pageInfo
    for (let i = 0; i < quizList.length; i++) {
      const quiz = {
        quizId: quizList[i].quizId,
        title: quizList[i].title,
        capacity: quizList[i].capacity,
        maxScore: typeof quizList[i].maxScore === 'undefined' ? 0 : quizList[i].maxScore,
        startDate: quizList[i].startDate,
        dueDate: quizList[i].dueDate,
        isQuestionsCreated: quizList[i].isQuestionsCreated,
      }
      resultArr.push(quiz)
    }
    setResult(resultArr)
    setCurrentPage(pageInfo.page)
    setSize(pageInfo.size)
    setTotalPages(pageInfo.totalPages)
  }
  useEffect(() => {
    getQuizList()
  }, [currentPage])

  const [title, setTitle] = useState('')
  const [capacity, setCapacity] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')

  const openQuizModal = (e, quiz) => {
    setShowQuizUpdateModal(!showQuizUpdateModal)
    console.log(quiz)
    setQuizModal({
      quizId: quiz.quizId,
      capacity: quiz.capacity,
      title: quiz.title,
      startDate: quiz.startDate,
      dueDate: quiz.dueDate,
    })
    setTitle(quiz.title)
    setCapacity(quiz.capacity)
    setStartDate(quiz.startDate)
    setDueDate(quiz.dueDate)
  }

  const updateQuiz = async (e, quizId) => {
    console.log('update quiz')

    const quiz = {
      quizId: quizId,
      capacity: capacity,
      title: title,
      startDate: startDate,
      dueDate: dueDate,
    }

    try {
      const res = await api.patch(`/api/v1/quiz/${quizId}`, quiz)
      console.log(res.status)
      await getQuizList()
    } catch (err) {
      console.error('error : ', err)
    }

    setShowQuizUpdateModal(false)
  }

  const createQuestion = (e, quizId) => {
    navigate(`/quiz/${quizId}`, {
      state: {
        quizId: quizId,
      },
    })
  }

  const editQuestion = (e, quizId) => {
    console.log(quizId)
    navigate(`/quiz-edit/${quizId}`, {
      state: {
        quizId: quizId,
      },
    })
  }

  const getQuizUrl = async (e, item) => {
    setShowQuizUrl(true)
    const response = await api.get(`/api/v1/quiz/endpoint/${item.quizId}`)
    const data = response.data.data
    setQuizUrl(data)
  }

  const changeTitle = (e) => {
    console.log(e.target.value)
    setTitle(e.target.value)
  }
  const changeCapacity = (e) => {
    setCapacity(e.target.value)
  }
  const changeStartDate = (e) => {
    const dt = e.target.value
    const st = dt.split('T')
    const tmpSt = st[0] + ' ' + st[1] + ':00'
    console.log(tmpSt)
    setStartDate(tmpSt)
  }
  const changeDueDate = (e) => {
    const dt = e.target.value
    const dd = dt.split('T')
    const tmpDd = dd[0] + ' ' + dd[1] + ':00'
    console.log(tmpDd)
    setDueDate(tmpDd)
  }

  return (
    <>
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
        {result.map((item, idx) => (
          <CCol sm={4} href="#" key={idx}>
            <CCard>
              <CCardHeader>{item.title}</CCardHeader>
              <CCardBody>
                <CCol>{`참가 가능 인원 : ${item.capacity}`}</CCol>
                <CCol>{`점수 : ${item.maxScore}`}</CCol>
                <CCol>{`시작날짜 : ${item.startDate}`}</CCol>
                <CCol>{`마감날짜 : ${item.dueDate}`}</CCol>
                <CDropdown alignment={{ lg: 'end' }}>
                  <CDropdownToggle color="transparent" caret={false}>
                    <CIcon icon={cilOptions} className="text-white" />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#" onClick={(e) => openQuizModal(e, item)}>
                      퀴즈 업데이트
                    </CDropdownItem>
                    {item.isQuestionsCreated !== true ? (
                      <CDropdownItem href="#" onClick={(e) => createQuestion(e, item.quizId)}>
                        문제 생성
                      </CDropdownItem>
                    ) : (
                      <CDropdownItem onClick={(e) => editQuestion(e, item.quizId)}>
                        문제 업데이트
                      </CDropdownItem>
                    )}
                    <CDropdownItem href="#" onClick={(e) => getQuizUrl(e, item)}>
                      퀴즈 초대코드 공유
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
        <CModal
          visible={showQuizUpdateModal}
          onClose={() => setShowQuizUpdateModal(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setShowQuizUpdateModal(false)}></CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              id="title"
              label="제목"
              defaultValue={quizModal.title}
              onChange={changeTitle}
              aria-describedby="exampleFormControlInputHelpInline"
            />
            <CFormInput
              type="text"
              id="capacity"
              label="참가 가능 인원"
              defaultValue={quizModal.capacity}
              onChange={changeCapacity}
              aria-describedby="exampleFormControlInputHelpInline"
            />
            <CFormInput
              type="datetime-local"
              id="startDate"
              label="시작날짜"
              defaultValue={quizModal.startDate}
              onChange={changeStartDate}
              aria-describedby="exampleFormControlInputHelpInline"
            />
            <CFormInput
              type="datetime-local"
              id="dueDate"
              label="마감날짜"
              defaultValue={quizModal.dueDate}
              onChange={changeDueDate}
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowQuizUpdateModal(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={(e) => updateQuiz(e, quizModal.quizId)}>
              Save changes
            </CButton>
          </CModalFooter>
        </CModal>
        <CModal
          visible={showQuizUrl}
          onClose={() => setShowQuizUrl(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setShowQuizUrl(false)}>초대 코드</CModalHeader>
          <CModalBody>{quizUrl}</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowQuizUrl(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CRow>
      <br />
      <CRow>
        <Pagination
          page={currentPage}
          size={size}
          totalPages={totalPages}
          paginate={setCurrentPage}
        ></Pagination>
      </CRow>
    </>
  )
}

export default Dashboard

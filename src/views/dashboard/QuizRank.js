import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../config/CustomAxios'

import {
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableHead,
  CTableDataCell,
  CTableBody,
  CRow,
  CCol,
  CContainer,
} from '@coreui/react'

const QuizRank = () => {
  const params = useParams()
  const [userRank, setUserRank] = useState({
    userId: '',
    username: '',
    totalScore: 0,
    number: 0,
  })
  const [rank, setRank] = useState([])

  useEffect(() => {
    const getRanks = async () => {
      console.log(params.quizId)
      try {
        const quizId = params.quizId
        const response = await api.get(`/api/v1/participant_info/${quizId}`)
        console.log(response.data.data)
        const rnk = []
        for (let i = 0; i < response.data.data.length; i++) {
          const ranks = response.data.data[i]
          rnk.push({
            userId: ranks.userId,
            username: ranks.username,
            totalScore: ranks.totalScore,
            number: ranks.number,
          })
        }
        setRank(rnk)
        const res = await api.get(`/api/v1/participant_info/user/${quizId}`)
        setUserRank({
          username: res.data.data.username,
          number: res.data.data.number,
          totalScore: res.data.data.totalScore,
        })
      } catch (err) {
        console.log(err)
      }
    }
    getRanks()
  }, [])

  return (
    <>
      <CContainer>
        <CRow>
          <CCol>
            {userRank.username}님 당신의 순위는 {userRank.number}위 입니다
          </CCol>
          <CCol>점수 : {userRank.totalScore}</CCol>
        </CRow>
        <br />
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">이름</CTableHeaderCell>
              <CTableHeaderCell scope="col">순서</CTableHeaderCell>
              <CTableHeaderCell scope="col">점수</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {rank.map((item, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item.username}</CTableDataCell>
                <CTableDataCell>{item.number}</CTableDataCell>
                <CTableDataCell>{item.totalScore}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CContainer>
    </>
  )
}

export default QuizRank

import { CSpinner, CModalHeader, CModal, CModalBody, CModalFooter, CButton } from '@coreui/react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getCookies } from '../../../cookie/Cookie'

import { api } from '../../../config/CustomAxios'
import * as StompJs from '@stomp/stompjs'
// import * as SockJs from 'sockjs-client'

const Waiting = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [endpoint, setEndpoint] = useState('')
  const [userId, setUserId] = useState(0)
  const [quizId, setQuizId] = useState(0)
  const [rank, setRank] = useState(0)
  const [accessToken, setAccessToken] = useState('')
  const [showNotFoundModal, setShowNotFoundModal] = useState(false)
  const [showCannotParticipate, setShowCannotParticipate] = useState(false)

  const client = useRef({})

  useEffect(() => {
    async function registerUserAtQueue() {
      try {
        const accessToken = getCookies('Authorization')
        if (accessToken === null || accessToken === '' || typeof accessToken === 'undefined') {
          navigate('/login')
        }
        setAccessToken(accessToken)

        const splitUrl = location.pathname.split('/')
        const endpoint = splitUrl.length > 1 ? splitUrl[splitUrl.length - 1] : ''
        setEndpoint(endpoint)
        const res = await api.get(`/api/v1/participant_info/wait/${endpoint}`)
        console.log(res)

        console.log(res.data.data.userId)
        setUserId(res.data.data.userId)
        setQuizId(res.data.data.quizId)
        setRank(res.data.data.Rank)
      } catch (err) {
        console.log(err.response)
        if (err.response.status === 404) {
          setShowNotFoundModal(true)
        }
      }
    }
    registerUserAtQueue()
  }, [])

  useEffect(() => {
    const connect = async () => {
      client.current = new StompJs.Client({
        brokerURL: 'ws://localhost:8080/web-socket-connection',
        connectHeaders: {
          login: '',
          passcode: 'password',
          Authorization: accessToken,
        },
        debug: function (str) {
          console.log(str)
        },
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log('connect success')
          subscribe()
        },
      })
      await client.current.activate()
    }

    const subscribe = () => {
      client.current.subscribe(`/topic/participant?quiz-id=${quizId}&user-id=${userId}`, callback)
    }

    const callback = (message) => {
      const body = message.body
      const jsonBody = JSON.parse(body)

      const isCapacityLeft = jsonBody.isCapacityLeft
      if (!isCapacityLeft) {
        console.log('인원 다 참')
      }
      const rank = jsonBody.rank
      setRank(rank)

      const userTurn = jsonBody.isUsersTurn
      if (userTurn) {
        disconnect()
        navigate(`/quiz-view/${endpoint}`)
      }
    }

    const disconnect = () => {
      client.current.deactivate()
      console.log('disconnect')
    }

    connect()
  }, [quizId, userId])

  const goToDashBoard = (e) => {
    setShowNotFoundModal(false)
    setShowCannotParticipate(false)
    navigate('/dashboard')
  }

  return (
    <>
      <p>당신 앞으로 {rank} 명이 있습니다.</p>
      <CSpinner />
      <CModal
        visible={showNotFoundModal}
        onClose={() => setShowNotFoundModal(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setShowNotFoundModal(false)}>
          잘못된 초대 코드입니다.
        </CModalHeader>
        <CModalBody></CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={(e) => goToDashBoard(e)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        visible={showCannotParticipate}
        onClose={() => setShowCannotParticipate(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setShowCannotParticipate(false)}>
          인원 초과, 참여할 수 없습니다.
        </CModalHeader>
        <CModalBody></CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={(e) => goToDashBoard(e)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Waiting

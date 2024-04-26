import { CSpinner } from '@coreui/react'
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

  const client = useRef({})

  useEffect(() => {
    async function registerUserAtQueue() {
      const accessToken = getCookies('Authorization')
      if (accessToken === null || accessToken === '' || typeof accessToken === 'undefined') {
        navigate('/login')
      }
      setAccessToken(accessToken)

      const splitUrl = location.pathname.split('/')
      const endpoint = splitUrl.length > 1 ? splitUrl[splitUrl.length - 1] : ''
      setEndpoint(endpoint)
      const res = await api.get(`/api/v1/participant_info/wait/${endpoint}`)
      if (res.status !== 200) {
        console.error('error')
      }
      console.log(res.data.data.userId)
      setUserId(res.data.data.userId)
      setQuizId(res.data.data.quizId)
      setRank(res.data.data.Rank)
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
        throw new Error('인원 다 참')
      }
      const rank = jsonBody.rank
      setRank(rank)

      const userTurn = jsonBody.isUsersTurn
      if (userTurn) {
        navigate(`/quiz-view/${endpoint}`)
        disconnect()
      }
    }

    const disconnect = () => {
      client.current.deactivate()
      console.log('disconnect')
    }

    connect()
  }, [quizId, userId])

  return (
    <>
      <p>당신 앞으로 {rank} 명이 있습니다.</p>
      <CSpinner />
    </>
  )
}

export default Waiting

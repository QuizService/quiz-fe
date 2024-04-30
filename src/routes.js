import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Quiz = React.lazy(() => import('./views/dashboard/Quiz'))
const Quiz = React.lazy(() => import('./views/dashboard/Quiz'))
const QuizView = React.lazy(() => import('./views/dashboard/QuizView'))
const QuizEdit = React.lazy(() => import('./views/dashboard/QuizEdit'))

const Waiting = React.lazy(() => import('./views/dashboard/queue/Waiting'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/quiz', name: 'Quiz', element: Quiz },
  { path: '/quiz-view/:endpoint', name: 'QuizView', element: QuizView },
  { path: '/quiz-edit/:quizId', name: 'QuizEdit', element: QuizEdit },
  { path: '/quiz/:quizId', name: 'Quiz', element: Quiz },
  { path: '/wait/:endpoint', name: 'Waiting', element: Waiting },
]

export default routes

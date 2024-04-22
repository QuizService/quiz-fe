import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Quiz = React.lazy(() => import('./views/dashboard/Quiz'))
const Quiz = React.lazy(() => import('./views/dashboard/Quiz'))
const QuizView = React.lazy(() => import('./views/dashboard/QuizView'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/quiz', name: 'Quiz', element: Quiz },
  { path: '/quiz-view/:endpoint', name: 'QuizView', element: QuizView },
  { path: '/quiz', name: 'Quiz', element: Quiz },
]

export default routes

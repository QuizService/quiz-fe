import React, { useState, useEffect } from 'react'

import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'

const Dashboard = () => {
  const titleArr = ['title1', 'title2', 'title3', 'title4', 'title5', 'title6']

  const resultArr = []
  const [result, setResult] = useState([])
  useEffect(() => {
    for (let i = 0; i < titleArr.length; i++) {
      resultArr.push(
        <CCard>
          <CCardBody>
            <CCardTitle>{titleArr[i]}</CCardTitle>
            <CCardText>
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </CCardText>
          </CCardBody>
        </CCard>,
      )
    }
    setResult(resultArr)
  }, [])

  return (
    <>
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
        {result.map((item, idx) => (
          <CCol sm={4} href="#" key={idx}>
            {item}
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default Dashboard

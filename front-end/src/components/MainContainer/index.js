import { Container } from 'react-bootstrap'
import React from 'react'

import './index.css'

export default function MainContainer({children}) {
  return (
    <Container className="centered-container">
      {children}
    </Container>
  )
}


import { Container } from 'react-bootstrap'
import React from 'react'

import './index.css'

export default function MainContainer({children}) {
  return (
    <Container class="centered-container">
      {children}
    </Container>
  )
}


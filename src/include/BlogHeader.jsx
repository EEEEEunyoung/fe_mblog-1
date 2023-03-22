import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BlogHeader = () => {
  return (
    <div>

      <Navbar bg="light" >
        <Container fluid>
          <Link to="/" className='nav-link'>터짐</Link>
          <Nav className="me-auto">
            <Link to="/home" className='nav-link'>Home</Link>
            <Link to="/dept/0"  className='nav-link'>부서관리</Link>
            <Link to="/board" className='nav-link'>게시판</Link>
          </Nav>
        </Container>
      </Navbar>

    </div>
  )
}

export default BlogHeader

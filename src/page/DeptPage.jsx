import React, { useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import '../components/css/style.css'
import DeptRow from '../components/dept/DeptRow'
import BlogHeader from '../include/BlogHeader'

const DeptPage = () => {
    const [deptList, setDeptList] = useState([])
    const [show, setShow] = useState(false)
    const handleClose=()=>setShow(false)
    const handleShow=()=>setShow(true)
    //조건 검색 구현
    const reactSearch=()=>{

    }
    //부서목록 가져오기
    const getDeptList=()=>{

    }
    //부서목록 JSON포맷 가져오기
    const jsonDeptList=()=>{

    }
    //이미지 파일 첨부구현
    const imgChange=()=>{

    } 
    
    
    const deptInsert=()=>{

    }
  return (
    <>
      <BlogHeader/>
      <div className="container">
      <div className="page-header">
      <h2>부서관리&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;<small>부서목록</small></h2>
        <hr />
	    </div>      
      <div className="row">
        <div className="col-3">
          <select id="gubun" className="form-select" aria-label="분류선택">
            <option defaultValue>분류선택</option>
            <option value="deptno">부서번호</option>
            <option value="dname">부서명</option>
            <option value="loc">지역</option>
          </select>			
        </div>
		    <div className="col-6">
			    <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" 
                 aria-label="검색어를 입력하세요" aria-describedby="btn_search" />
		    </div>
		    <div className="col-3">
			    <Button variant='danger' id="btn_search" onClick={reactSearch}>검색</Button>
		    </div>
	     </div> 
      <div className='book-list'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>부서번호</th>
              <th>부서명</th>
              <th>지역</th>
            </tr>
          </thead>
          <tbody>
          {deptList.map(dept => (
            <DeptRow key={dept.DEPTNO} dept={dept} />
          ))}
          </tbody>
        </Table> 
        <hr />    
        <div className='booklist-footer'>
          <Button variant="warning" onClick={jsonDeptList}>
            전체조회
          </Button>&nbsp; 
          <Button variant="success" onClick={handleShow}>
            부서등록
          </Button> 
        </div>
      </div>
    </div>
    {/* ========================== [[ 도서등록 Modal ]] ========================== */}
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>부서등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="f_dept" method="get">
          <input type="hidden" id="fileName" name="fileName"/>
          <input type="hidden" id="fileURL" name="fileURL"/>
          <Form.Group className="mb-3" controlId="formBasicDname">
            <Form.Label>부서번호</Form.Label>
            <Form.Control type="text" name="deptno" placeholder="Enter 부서번호" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDname">
            <Form.Label>부서명</Form.Label>
            <Form.Control type="text" name="dname" placeholder="Enter 부서명" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLoc">
            <Form.Label>지역</Form.Label>
            <Form.Control type="text" name="loc" placeholder="Enter 지역" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicOffice">
            <Form.Label>건물이미지</Form.Label>
              <input className="form-control" type="file" accept='image/*' id="dimg" name="dimg" onChange={imgChange}/>
          </Form.Group>
          <div id="uploadImg">
            <img className='thumbNail' src="http://via.placeholder.com/200X250" alt="미리보기" />
          </div>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={deptInsert}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>     
    {/* ========================== [[ 부서등록 Modal ]] ========================== */}  
    </>
)
}

export default DeptPage

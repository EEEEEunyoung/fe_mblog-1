import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import '../css/style.css'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { deptDeleteDB, deptListDB, deptUpdateDB } from '../../service/dbLogic'
import { MyInput, MyLabel, MyLabelAb } from '../styles/FormStyle'
import BlogFooter from '../../include/BlogFooter'
import BlogHeader from '../../include/BlogHeader'
import { setLogLevel } from 'firebase/app'

const DivDeptBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
`
const DivUploadImg = styled.div`
  display: flex;
  width: 200px;
  height: 250px;
  overflow: hidden;
  margin: 10px auto;
`
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const DeptDetail = ({imageUploader}) => {
  //부서번호를 클릭했을 때 해시값으로 전달된 부서번호 담기
  //사용자가 부서번호를 선택할때마다 변경되니까 useEffect에서 의존배열인자로 사용함
  const {deptno} = useParams()  //App.jsx의 Route path 해시값으로 넘어온다. - 바뀐다. 
  const[dname,setDname] = useState("");
  const[loc,setLoc] = useState("");
  //오라클 서버에서 파라미터로 넘어온 부서번호를 가지고 한 건을 조회한 후에 담기
  const [dept, setDept] = useState({
    DEPTNO: 0,
    DNAME: "",
    LOC:"",
    FILENAME:"",
    FILEURL:""
  });
  const navigate = useNavigate();
  const[files,setFiles] = useState({
    filename: null, fileurl:null
  })
  const[comment, setComment] = useState({
    deptno: "",
    dname: "",
    loc: ""
  })
  const[star, setStar] = useState({
    deptno: "*",
    dname: "*",
    loc: "*"
  })

 //이미지 파일 첨부구현
 const imgChange = async (e) => {
    const uploaded = await imageUploader.upload(e.target.files[0]);
    setFiles({
      filename: uploaded.public_id + "." + uploaded.format,
      fileurl: uploaded.url,
    });
    //input의 이미지 객체 얻어오기
    const upload = document.querySelector("#dimg");
    //이미지를 집어넣을 곳의 부모태그
    const holder = document.querySelector("#uploadImg");
    const file = upload.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      if (img.width > 150) {
        img.width = 150;
      }
      holder.innerHTML = "";
      holder.appendChild(img);
    };
    reader.readAsDataURL(file);
    return false;
  };


///////////////////////////////////////////수정 <<<update>>>/////////////////////////////////////////////////////////
    //부서등록구현
  //스프링부트와 리액트 연동하기   - @RequestBody 사용해서  JSON 포맷으로 넘김
  const deptUpdate = async() => {
    const dept={
      deptno,   //이름 같으면 생략 가능
      dname,
      loc,
      filename:files.filename,
      fileurl:files.fileurl
    }
    const res = await deptUpdateDB(dept)
    if(!res.data){
      console.log('부서등록 실패 ')

    }
    else{
      console.log('부서등록 성공')
      //성공 시 부서목록 새로고침 처리할 것 - window.,location.reload()쓰지말것 - SPA 컨벤션
      //useEffect - 의존성 배열을 연습할 수 있음
      handleClose()    //모달창을 닫기
      //부서목록 새로고침 처리 
    }
  }
  useEffect(() => {
  }, []);//의존성 배열이 빈배열이면 최초 한번만
///////////////////////////////////////////////수정끝 / 삭제 시작 <<<delete>>>>///////////////////////////////////////////////////
const deptDelete = async() => {
    console.log('삭제')
       const asyncDB=async()=>{
        const res = deptDeleteDB({deptno:deptno})
        console.log(res.data)
        navigate("/dept/0")
       }
       asyncDB() 
     } //end of deptDelete
     useEffect(() => {
     }, []);//의존성 배열이 빈배열이면 최초 한번만

/////////////////////////////////////////////// 삭제 끝<<<delete>>>>///////////////////////////////////////////////////




  const validate = (key, e) => {
    console.log("validate : "+key)
    let result;
    if(key === 'dname') {
      result = validateDName(e)
    }
    setComment({...comment,[key]: result})
    if(result){
      if(result === '') {
        setStar({...star,[key]:""})
      } else {
        setStar({...star,[key]:"*"})
      }
    } else {
      setStar({...star,[key]:""})
    }
  }
  //수정화면 모달 마운트(화면에 나타남) 여부 결정 -  false 안보임, true 보임
  const[show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)









  const deptInsert = () => {
}

  
  const validateDName = () => {
 }





  useEffect(()=> {
    //파라미터가 deptno로 바뀌면 useEffect가 실행된다????-이거맞나.
    const asyncDB = async() => {
      const res = await deptListDB({deptno:deptno})
      console.log(res.data)
      const result = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(result)
      setDept({DEPTNO:jsonDoc[0].DEPTNO,
        DNAME:jsonDoc[0].DNAME,
        LOC:jsonDoc[0].LOC,
        FILENAME:jsonDoc[0].FILENAME,
        FILEURL:jsonDoc[0].FILEURL
      })
    }
    asyncDB()
    return()=>{
        //언마운트 될 때 처리할 일이 있으면 여기에 코딩할 것
    }
  },[deptno]) //deptno가 변경될 대 마다 함수가 실행됨
  if(!dept.FILEURL) {
    dept.FILEURL="http://via.placeholder.com/200X250"
  }
  //부서 목록 페이지 이동하기
  const deptList = () => {
    navigate("/dept/0")
  }
  //리액트에서는 메모리제이션 컨벤션
  //useMemo와 useCallback - 첫번째 파라미터 함수가 두번째 파라미터 의존성배열
  //차이점: useMemo는 값을 반환하고 useCallback은 함수를 반환함
  //리렌더링은 언제 일어나지?
  //1.state변경 2.props변경, 3. 부모컴포넌트가 변경
  //
  const handleDname = useCallback((value) => {
    setDname(value)
  },[])
  //아래와 같이 함수를 선언하면 DeptDetail컴포넌트가 마운트될 때 마다 주소번지가 바뀐다
  //함수의 구현내용이 변화가 없는 경우라면 한 번 생성된 주소번지를 계속 가지고 있어도 되지 않을까
  //그러면 이걸 좀 기억해줘 - cache - 필요할 때 새로 생성하지 말고 cache에 있는 함수를 불러줘
  //이렇게 처리할 때 useCallback사용함
  const handleLoc = useCallback((value) => {
    setLoc(value)
  },[])
  return (
    <>
      <BlogHeader/>
      <div className="container">
      <div className="page-header">
        <h2>부서관리&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;<small>부서목록</small></h2>
          <hr />
          </div>
          <Card style={{width: "58rem"}}>
            <Card.Body>
            <Card.Img style={{width:"250px"}} src={`${dept.FILEURL}`} alt="Card image" />
            <DivDeptBody>
              <Card.Title>{dept.DNAME}</Card.Title>
              <Card.Text>{dept.LOC}</Card.Text>
              <Card.Text>{dept.DEPTNO}</Card.Text>
            </DivDeptBody>
            </Card.Body>
            <div>
              <Button onClick={handleShow}>수정</Button>
              &nbsp;
              <Button onClick={deptDelete}>삭제</Button>
              &nbsp;
              <Button onClick={deptList}>부서목록</Button>
            </div>
          </Card>
      </div>
      {/* ========================== [[ 부서정보 수정화면 Modal ]] ========================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>부서정보수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{display: "flex", flexWrap: 'wrap', justifyContent: "center"}}>
            <div style={{display:"flex"}}>
                <MyLabel>
                  부서번호<span style={{color:"red"}}>{star.deptno}</span>
                  <MyInput type="text" name="deptno" placeholder="Enter 부서번호" value={deptno} />
                  <MyLabelAb>{comment.deptno}</MyLabelAb>
                </MyLabel>
            </div>
            <div style={{display:"flex"}}>
              <MyLabel>
                부서명<span style={{color:"red"}}>{star.dname}</span>
                <MyInput type="text" name="dname" placeholder="Enter 부서명" onChange={(e)=> {handleDname(e.target.value); validate('dname', e);}} />
                <MyLabelAb>{comment.dname}</MyLabelAb>
              </MyLabel>
            </div>
            <div style={{display:"flex"}}>
              <MyLabel>
                지역<span style={{color:"red"}}>{star.loc}</span>
              <MyInput type="text" name="loc" placeholder="Enter 지역" onChange={(e)=> {handleLoc(e.target.value)}} />
              <MyLabelAb>{comment.loc}</MyLabelAb>
              </MyLabel>
            </div>
            <Form.Group className="mb-3" controlId="formBasicOffice">
              <Form.Label>부서이미지</Form.Label>
                <input className="form-control" type="file" accept='image/*' id="dimg" name="dimg" onChange={imgChange}/>
            </Form.Group>
            <DivUploadImg id="uploadImg">
              <Img src="http://via.placeholder.com/200X250" alt="미리보기" />
            </DivUploadImg>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={deptUpdate}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>
      {/* ========================== [[ 부서정보수정 Modal ]] ========================== */}
      <BlogFooter/>
    </>
  )
  }
export default DeptDetail
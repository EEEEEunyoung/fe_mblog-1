/* global daum */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../components/styles/FormStyle';
import { memberInsertDB } from '../service/dbLogic';


const Signup = () => {
      const navigate = useNavigate();
      const[mem_uid, setMemuid] = useState("")
      const[mem_pw,setMempw] = useState("")
      const[mem_name,setMemname] = useState("")
      const[mem_nickname,setMemnickname] = useState("")
      const[mem_email,setMememail] = useState("")
      const[mem_tel,setMemtel] = useState("")
      const[mem_birthday,setMembirthday] = useState("")
      const[mem_gender,setMemgender] = useState("")
      const[mem_zipcode,setZipcode] = useState("")
      const[mem_addr,setAddr] = useState("")
      const[mem_addr_dtl,setAddrDtl] = useState("")
      const[post,setPost] = useState({
        zipcode:'',
        addr:'',
        addrDetail:''
          })
    //Post. @RequestBody, {} -> Map or VO  -> 비동기 처리 -> Promise (resolve, reject)
    //async - await
    const memberInsert=async()=>{
        const member={
            mem_uid,
            mem_pw,
            mem_name,
            mem_nickname,
            mem_email,
            mem_tel,
            mem_gender,
            mem_birthday,
            mem_zipcode,
            mem_addr,
            mem_addr_dtl
          }
          const res =await  memberInsertDB(member)
          if(!res.data){
            console.log('회원가입 실패 ')
      
          }
          else{
            console.log('회원가입 성공')
            navigate("/login")
          }
    }



      const quillRef = useRef()
      const fileRef = useRef()
    
      //사용자가 입력한 값을 useState에 초기화 하기
const handleID = useCallback((e) => {
    setMemuid(e)
},[])

      const handlePW = useCallback((e) => {
        setMempw(e)
      },[])
      const handleName = useCallback((e) => {
        setMemname(e)
      },[])
      const handleNickcame= useCallback((e) => {
        setMemnickname(e)
      },[])
      const handleEmail = useCallback((e) => {
        setMememail(e)
      },[])
      const handleTel = useCallback((e) => {
        setMemtel(e)
      },[]) 
      const handleBirthday = useCallback((e) => {
        setMembirthday(e)
      },[])
      const handleGender = useCallback((e) => {
        setMemgender(e)
      },[])
      const handleZipcode = useCallback((e) => {
        setZipcode(e)
      },[])
      const handleAddr = useCallback((e) => {
        setAddr(e)
      },[])  
      const handleAddrDtl = useCallback((e) => {
        setAddrDtl(e)
      },[])

const clickAddr =(e)=>{
  e.preventDefault()
  new daum.Postcode({
    oncomplete: function(data) {
      let addr=''
      if(data.userSelectedType==='R'){
        addr = data.roadAddress; // 도로명
      }
      else{
        addr= data.jibunAddress; // 도로명
      }
      console.log(data) //전체 주소정보 - 한글+영어
      console.log(addr)//주소정보만
      setPost({...post, zipcode: data.zonecode, addr:data.address}) //깊은복사
      document.querySelector("#mem_zipcode").value=data.zonecode  //화면에 자동으로 입력처리
      document.querySelector("#mem_addr").value=addr  //선택한 주소정보를 input 컴포넌트에 자동 입력 처리 
      document.querySelector("#mem_addr_dtl").focus()  
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
    }
}).open();
}



      // const handleClick = (event) => {
      //   event.preventDefault()
      //   document.querySelector("#file-input").click((event)=>{
      //     console.log(event.currentTarget.value);
      //   })
      // }
      const handleChange = async (event) => {

      }
      const handleFiles = () => {}
    


  return (
    <div>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>공지사항 글작성</h3>
        </HeaderDiv>

        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>아이디</h4> 
              <BButton onClick={()=>{}}>글쓰기</BButton>
            </div>
            <input id="mem_uid" type="text" maxLength="50" placeholder="ID를 입력하세요."
              style={{width:"100%",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleID(e.target.value)}}/>
           
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
             <h4>비밀번호</h4> 
            </div>              
            <input id="mem_pw" type="text" maxLength="50" placeholder="비밀번호를 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handlePW(e.target.value)}}/>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h4>비밀번호 재확인</h4> 
            </div>              
            <input id="mem_pw" type="text" maxLength="50" placeholder="비밀번호를 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handlePW(e.target.value)}}/>
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            
              <h4>이름</h4> 
            </div>              
            <input id="mem_name" type="text" maxLength="50" placeholder="이름을 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleName (e.target.value)}}/>
           
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h4>닉네임</h4> 
            </div>              
            <input id="mem_nickname" type="text" maxLength="50" placeholder="닉네임을 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleNickcame (e.target.value)}}/>
           
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h3>email</h3> 
            </div>              
            <input id="mem_email" type="text" maxLength="50" placeholder="email을 입력하세요."
              style={{width:"500px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleEmail (e.target.value)}}/>
            
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h3>tel</h3> 
            </div>              
            <input id="mem_tel" type="text" maxLength="50" placeholder="전화번호를 입력하세요."
              style={{width:"500px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleTel (e.target.value)}}/>
           
   

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h3>gender</h3> 
            </div>
            <input id="mem_gender" type="text" maxLength="50" placeholder="성별를 입력하세요.(1자리 숫자)"
              style={{width:"500px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleGender(e.target.value)}}/>
           
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h3>생일</h3> 
            </div>
            <input id="mem_birthday" type="text" maxLength="50" placeholder="생일 입력하세요."
              style={{width:"500px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleBirthday (e.target.value)}}/>
           
           <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h3>우편번호</h3> 
            </div>
            <input id="mem_zipcode" type="text" maxLength="50" placeholder="우편번호 입력"
              style={{width:"500px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onBlur={(e)=>{handleZipcode (e.target.value)}}/>
           
           <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h3>주소</h3> 
            </div>
            <input id="mem_addr" type="text" maxLength="50" placeholder="주소 입력" 
              style={{width:"350px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleAddr (e.target.value)}}/>
           <Button onClick={clickAddr} id="memaddrbtn"> 주소 검색</Button>

           <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h3>싱세주소</h3> 
            </div>
            <input id="mem_addr_dtl" type="text" maxLength="50" placeholder="상세주소 입력" readOnly={post.addr?false:true}
              style={{width:"350px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleAddrDtl (e.target.value)}}/>


{/* 
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h3>첨부파일</h3> 
            </div>                      
            <input id="file-input" ref={fileRef} type="file" maxLength="50" className="visuallyhidden" onChange={handleChange}/>            
            <br/>
          {/*   <button style={{height:'40px'}} onClick={handleClick}>파일선택</button>&nbsp; */}
            {/* <input id="bs_file" name='bs_file' type="text" maxLength="50" 
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} />
            <h3>상세내용</h3> <br/>  */}
         {/*    <hr style={{margin:'10px 0px 10px 0px'}}/> */}
            {/* <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} files={files} handleFiles={handleFiles}/> */}
            {/* <BoardFileInsert files={files}/> */}
           

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <BButton onClick={memberInsert}>회원가입</BButton>
          </div>
</div>

        </FormDiv>
      </ContainerDiv>
    </div>
  )
}

export default Signup

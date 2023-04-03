/* global daum */
import React, { useCallback, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { memberInsertDB } from '../../service/dbLogic'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle'

//회원가입 페이지 
const Signup = ({member}) => {// 컴포넌트 함수
	//useXXXX 훅(Hook)라 함 - 16.8버전 - 그전까지는 클래스(this이슈-신입개발자) 지원되던것을
	//함수형 프로그래밍에 대한 이점으로 훅을 지원하게 되었다 
	const navigate = useNavigate();
	const [mem_uid, setMemuid] = useState('')
	const [mem_pw, setMempw] = useState('')
	const [mem_name, setMemname] = useState('')
	const [mem_nickname, setMemnickname] = useState('')
	const [mem_email, setMememail] = useState('')
	const [mem_tel, setMemtel] = useState('')
	const [mem_gender, setMemgender] = useState('')
	const [mem_birthday, setMembirthday] = useState('')
	const [mem_zipcode, setMemzipcode] = useState('')
	const [mem_addr, setMemaddr] = useState('')
	const [mem_addrdtl, setMemaddrdtl] = useState('')
	const [post, setPost] = useState({
		zipcode:"",
		addr:"",
		addrDetail:""
	})
	//Post, @RequestBody, {} -> Map or VO -> 비동기 처리 -> Promise(resolve,reject)
	// async - await
	const memberInsert = async () => {
		const member = {
			mem_uid: mem_uid,
			mem_pw: mem_pw,
			mem_name: mem_name,
			mem_nickname: mem_nickname,
			mem_email: mem_email,
			mem_tel: mem_tel,
			mem_gender: mem_gender,
			mem_birthday: mem_birthday,
		}
		const res = await memberInsertDB(member)
		console.log(res+","+res.data)
		if(!res.data){
			console.log('회원가입에 실패하였습니다.')
		}
		else{
			console.log('회원가입 성공')
			//회원가입 성공시 로그인 화면으로 이동
			navigate("/login")
		}
	}
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
	const handleNickName = useCallback((e) => {
		setMemnickname(e)
	},[])	
	const handleEmail = useCallback((e) => {
		setMememail(e)
	},[])	
	const handleITel = useCallback((e) => {
		setMemtel(e)
	},[])	
	const handleGender = useCallback((e) => {
		setMemgender(e)
	},[])	
	const handleBithday = useCallback((e) => {
		setMembirthday(e)
	},[])	
	const handleZipcode = useCallback((e) => {
		setMemzipcode(e)
	},[])	
	const handleAddr = useCallback((e) => {
		setMemaddr(e)
	},[]) 
	const handleAddrDtl = useCallback((e) => {
		setMemaddrdtl(e)
	},[])	
	const clickAddr = (event) => {
		event.preventDefault()
		new daum.Postcode({
			oncomplete: function(data) {
				let addr=''
				if(data.userSelectedType === 'R'){
					addr = data.roadAddress;//도로명
				}
				else{
					addr = data.jibunAddress;//지번
				}
				console.log(data)//전체 주소정보 -한글+영어
				console.log(addr)//주소정보만
				//기존의 참조관계를 끊는다 - 
				setPost({ ...post, zipcode: data.zonecode, addr:addr}) //깊은복사
				document.querySelector("#mem_zipcode").value = data.zonecode //화면에 자동으로 입력처리
				document.querySelector("#mem_addr").value = addr //선택한 주소정보를 input 컴포넌트에 자동입력 처리
				document.querySelector("#mem_addr_dtl").focus() //addr이 입력되었을 때 커서 자동 이동처리
			}
		}).open();		
	}
	return (
		<>
			<ContainerDiv>
				<HeaderDiv>
				<h3 style={{marginLeft:"10px"}}>회원가입</h3>
				</HeaderDiv>
				<FormDiv>
					<div style={{width:"100%", maxWidth:"2000px"}}>
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>아이디</span> 
						</div>
						<input id="mem_uid" type="text" maxLength="50" placeholder="ID를 입력하세요."
						style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleID(e.target.value)}}/>

						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>비번</span> 
						</div>
						<input id="mem_pw" type="text" maxLength="50" placeholder="PW를 입력하세요."
						style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handlePW(e.target.value)}}/>
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>비번확인</span> 
						</div>
						<input id="mem_pw2" type="text" maxLength="50" placeholder="PW를 확인하세요."
						style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} />

						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>이름</span> 
						</div>              
						<input id="mem_name" type="text" maxLength="50" placeholder="이름을 입력하세요."
						style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleName(e.target.value)}}/>
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>닉네임</span> 
						</div>              
						<input id="mem_nickname" type="text" maxLength="50" placeholder="닉네임을 입력하세요."
						style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleNickName(e.target.value)}}/>
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>이메일</span> 
						</div>              
						<input id="mem_email" type="text" maxLength="50" placeholder="이메일을 입력하세요."
						style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleEmail(e.target.value)}}/>
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>전화번호</span> 
						</div>              
						<input id="mem_tel" type="text" maxLength="50" placeholder="전화번호 입력하세요."
						style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleITel(e.target.value)}}/>
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>성별</span> 
						</div>              
						<input id="mem_gender" type="text" maxLength="50" placeholder="성별 선택하세요."
						style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleGender(e.target.value)}}/>
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>생일</span> 
						</div>              
						<input id="mem_birthday" type="text" maxLength="50" placeholder="생일을 입력하세요."
						style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleBithday(e.target.value)}}/>
						
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>우편번호</span> 
						</div>              
						<input id="mem_zipcode" type="text" maxLength="50" placeholder="우편번호 입력"
						style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleZipcode(e.target.value)}}/>
						
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>주소</span> 
						</div>              
						<input id="mem_addr" type="text" maxLength="50" placeholder="주소를 입력하세요"
						style={{width:"350px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleAddr(e.target.value)}}/>
						<Button onClick={clickAddr}>주소검색</Button>

						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
						<span>상세주소</span> 
						</div>              
						<input id="mem_addr_dtl" type="text" maxLength="50" placeholder="상세주소를 입력하세요" readOnly={post.addr?false:true}
						style={{width:"350px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleAddrDtl(e.target.value)}}/>
						
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>	
						<BButton onClick={memberInsert}>가입</BButton>
						<hr style={{margin:'10px 0px 10px 0px'}}/>
						</div>
					</div>
				</FormDiv>
			</ContainerDiv>
		</>
	)
}

export default Signup

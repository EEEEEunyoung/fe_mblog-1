import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BlogHeader from '../include/BlogHeader';
import KakaoMap from '../kakao/KakaoMap';
import { ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle';

const HomePage = () => {
	const member = window.localStorage.getItem('member')
	console.log(JSON.parse(member))
	const jsonDoc = JSON.parse(member)
	//console.log(jsonDoc.mem_id + ' , '+ jsonDoc.mem_pw)
	const navigate = useNavigate()
	const handleLogin = () => {
		console.log('로그인 요청')
		navigate('/login')
	}

	const gotoGesipan =()=>{
		navigate('/qna/list')
		
	}


  return (
	<>
		<ContainerDiv>
			<BlogHeader />
			<HeaderDiv>
				<h1 style={{marginLeft:"10px"}}>터짐블로그</h1>
				<Button onClick={handleLogin}>로그인</Button>
				<Button onClick={gotoGesipan}>댓글형게시판</Button>
			</HeaderDiv>
			<FormDiv style={{textAlign: 'center'}}>
				<div>이벤트존</div>
				<hr style={{height:"2px"}} />
				<div>추천 수업존</div>
				<hr style={{height:"2px"}} />
				<div><KakaoMap /></div>
				<div>카카오맵존</div>
				<hr style={{height:"2px"}} />
			</FormDiv>
		</ContainerDiv>
	</>
  )
}

export default HomePage;
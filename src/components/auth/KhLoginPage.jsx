import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginEmail, loginGoogle } from '../../service/authLogic';
import { DividerDiv, DividerHr, DividerSpan, GoogleButton, LoginForm, MyH1, MyInput, MyLabel, MyP, PwEye, SubmitButton } from '../styles/FormStyle';
const KhLoginPage = ({authLogic}) => {
  const navigate = useNavigate() //a태그 사용하지 않기, Link-react-router-dom, 
  console.log('LoginPage');
  const auth  = authLogic.getUserAuth()
  const[submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  });
  const [tempUser, setTempUser] = useState({
    email: '',
    password: ''
  });
  const [passwordType, setPasswordType] = useState({
      type:'password',
      visible:false
  });
  useEffect(()=> {
    if(tempUser.email!==""&&tempUser.password!==""){ 
      setSubmitBtn({disabled:false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({disabled:true, bgColor: 'rgb(175, 210, 244)'});
    }
  },[tempUser]);
  const changeUser = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setTempUser({...tempUser, [id]: value});
  };
  const passwordView = (e) => {
    const id = e.currentTarget.id;
    if(id==="password") {
      if(!passwordType.visible) {
        setPasswordType({...passwordType, type: 'text', visible: true});
      } else {
        setPasswordType({...passwordType, type: 'password', visible: false});
      }
    }
  };
  const toggleHover = () => {
    if(submitBtn.hover){
      setSubmitBtn({...submitBtn, hover: false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({...submitBtn, hover: true, bgColor: 'rgb(58, 129, 200)'});
    }
  }
  const loginE = async () => {
    // 이메일 로그인 구현
	console.log(tempUser)
	try {
		const result = await loginEmail(auth, tempUser)
		console.log(result)
		console.log(result.user.uid)
		window.sessionStorage.setItem('userId', result.user.uid)
		window.localStorage.setItem('userId', result.user.uid)
		window.localStorage.setItem('member', JSON.stringify({mem_id:'test', mem_pw:'123'}))
		//현재 내가 바라보는 URL /login 
		//문제제기 - 세션스토리지가 유지되나요?
		navigate("/") //Route path="/" HomePage
		window.location.reload()
	} catch (error) {
		console.log(error+": 로그인 에러 입니다  ")
	}
  }
  const loginG = async () => {
    // 구글 로그인 구현
	try {
		const result = await loginGoogle(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider())
		console.log(result)
		navigate("/")
		window.location.reload()
	} catch (error) {
		console.log('로그인 오류 입니다.')
	}
  }
  return (
    <>
      <LoginForm>
        <MyH1>로그인</MyH1>
        <MyLabel htmlFor="email"> 이메일     
          <MyInput type="email" id="email" name="mem_email" placeholder="이메일를 입력해주세요." 
            onChange={(e)=>changeUser(e)}/>   
        </MyLabel>
        <MyLabel htmlFor="password"> 비밀번호
          <MyInput type={passwordType.type} autoComplete="off" id="password" name="mem_password" placeholder="비밀번호를 입력해주세요."
            onChange={(e)=>changeUser(e)}/>
          <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType.visible?"gray":"lightgray"}`}}>
            <PwEye className="fa fa-eye fa-lg"></PwEye>
          </div>
        </MyLabel>
        <SubmitButton type="button"  disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor}}  
          onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={()=>{loginE()}}>
          로그인
        </SubmitButton>
        <DividerDiv>
          <DividerHr />
          <DividerSpan>또는</DividerSpan>
        </DividerDiv>
        <GoogleButton type="button" onClick={()=>{loginG();}}>
          <i className= "fab fa-google-plus-g" style={{color: "red", fontSize: "18px"}}></i>&nbsp;&nbsp;Google 로그인
        </GoogleButton>
        <MyP style={{marginTop:"30px"}}>신규 사용자이신가요?&nbsp;<Link to="/auth/signup" className="text-decoration-none" style={{color: "blue"}}>계정 만들기</Link></MyP>
        <MyP>이메일를 잊으셨나요?&nbsp;<Link to="/auth/findEmail" className="text-decoration-none" style={{color: "blue"}}>이메일 찾기</Link></MyP>
        <MyP>비밀번호를 잊으셨나요?&nbsp;<Link to="/auth/resetPwd" className="text-decoration-none" style={{color: "blue"}}>비밀번호 변경</Link></MyP>
      </LoginForm>
    </>
  );
}
export default KhLoginPage;

/*
UserImpl {providerId: 'firebase', proactiveRefresh: ProactiveRefresh, reloadUserInfo: {…}, reloadListener: null, uid: 'y2YBZhMpeqWYD2L9vy13X73dEef2', …}
accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi6rmA7Iq57IiYIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDVBMjNlRFBGZ2xYbndTN2dUbm43bFphXzU2OHVDLWVpZk02dmRCPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2toLTIyMTEyOCIsImF1ZCI6ImtoLTIyMTEyOCIsImF1dGhfdGltZSI6MTY4MDA3NjIxNywidXNlcl9pZCI6InkyWUJaaE1wZXFXWUQyTDl2eTEzWDczZEVlZjIiLCJzdWIiOiJ5MllCWmhNcGVxV1lEMkw5dnkxM1g3M2RFZWYyIiwiaWF0IjoxNjgwMDc2MjE3LCJleHAiOjE2ODAwNzk4MTcsImVtYWlsIjoic2xhbG9tMDkxNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMjI3MDgwNzk5OTkzNTQxNzAyNCJdLCJlbWFpbCI6WyJzbGFsb20wOTE0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.UOmW12194oGCh9sy9ZZxVVwbnZqgGSXF6-QKDukw83IlPcZFDiv6P8dN4FBLhTFITWluwRiiAa2otJXmFIKiB7j6nT6gMH8pMApUgQpOIPI7ZNyKThlEmU2ezaDrfqh949dojJAIkaEOMr-gvgzQl8OJm9Zr59k3UG8wdmwRTZIml8Mll96sk4njAt7J1TU0a_l1w_CSUZgge8_aFiDAnXurec2i75_O7o1-LRId3kWOvchKboZw2oNsdPw05iXqeoPLpFsL-cAO6GjSvuMlwvP3iVS8zhBLZ-Y8N75p-48kIBGD8UWljmO0e1sgHRQ5urZqS7drU_9ohqUiyneGTQ"
auth: AuthImpl {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, config: {…}, currentUser: UserImpl, emulatorConfig: null, …}
displayName: "김승수"
email: "slalom0914@gmail.com"
emailVerified: true
isAnonymous: false
metadata: UserMetadata {createdAt: '1675811252258', lastLoginAt: '1680076181291', lastSignInTime: 'Wed, 29 Mar 2023 07:49:41 GMT', creationTime: 'Tue, 07 Feb 2023 23:07:32 GMT'}
phoneNumber: null
photoURL: "https://lh3.googleusercontent.com/a/AEdFTp5A23eDPFglXnwS7gTnn7lZa_568uC-eifM6vdB=s96-c"
proactiveRefresh: ProactiveRefresh {user: UserImpl, isRunning: false, timerId: null, errorBackoff: 30000}
providerData: Array(1)
0: {providerId: 'google.com', uid: '102270807999935417024', displayName: '김승수', email: 'slalom0914@gmail.com', phoneNumber: null, …}
length: 1
[[Prototype]]: Array(0)
providerId: "firebase"
reloadListener: null
reloadUserInfo: {localId: 'y2YBZhMpeqWYD2L9vy13X73dEef2', email: 'slalom0914@gmail.com', displayName: '김승수', photoUrl: 'https://lh3.googleusercontent.com/a/AEdFTp5A23eDPFglXnwS7gTnn7lZa_568uC-eifM6vdB=s96-c', emailVerified: true, …}
stsTokenManager: StsTokenManager {refreshToken: 'APJWN8eExWgvd2bXYXyq3ynTf-W7xmsXaZ6KXweIlyaipwAOCb…T5fbRsCgWFb7SXm9qU74SX7EXWSf1Eh_i_H7zkoJd31hMqDIw', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zj…75p-48kIBGD8UWljmO0e1sgHRQ5urZqS7drU_9ohqUiyneGTQ', expirationTime: 1680079817707}
tenantId: null
uid: "y2YBZhMpeqWYD2L9vy13X73dEef2"
*/
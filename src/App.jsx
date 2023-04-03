import { Route, Routes, useNavigate } from 'react-router-dom';
import KakaoRedirectHandler from './components/kakao/KakaoRedirectHandler';
import Profile from './components/kakao/Profile';
import MemberPage from './components/page/MemberPage';
import HomePage from './components/page/HomePage';
import DeptPage from './components/page/DeptPage';
import DeptDetail from './components/dept/DeptDetail';
import RepleBoardPage from './components/page/RepleBoardPage';
import Toast from './components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setToastMsg } from './redux/toastStatus/action';
import SignupPage from './components/auth/SignupPage';
import KhLoginPage from './components/auth/KhLoginPage';
import { onAuthChange } from './service/authLogic';
import { memberListDB } from './service/dbLogic';
import EmailVerifiedPage from './components/auth/EmailVerifiedPage';
import FindEmailPage from './components/auth/FindEmailPage';
import ResetPwdPage from './components/auth/ResetPwdPage';
import RepleBoardDetail from './components/repleboard/RepleBoardDetail';
import RepleBoardWriteForm from './components/repleboard/RepleBoardWriteForm';
import KhQnAUpdatePage from './components/repleboard/KhQnAUpdatePage';
import KhQnADetailPage from './components/repleboard/KhQnADetailPage';
import KhQnAListPage from './components/repleboard/KhQnAListPage';
import KhQnAWritePage from './components/repleboard/KhQnAWritePage';

function App({ authLogic, imageUploader }) {
  console.log('App')
  //화면을 전환시킬 때 - window.location.href 차이점 - 새로고침 요청발생 - 가상돔 사용하지 않음
  const navigate = useNavigate() //가상돔 사용됨
  const dispatch = useDispatch() //허브 -  action.type(switch-선택), action.payload(내용)
  const ssg = sessionStorage;
  const toastStatus = useSelector(state => state.toastStatus)//store에 값을 접근할 때
  useEffect (()=>{ //의존성 배열 - 의존성 배열에 있는 변수가 함수가 훅이 변할때 다시 호출 가능함
    console.log('effect')
    const asyncDB = async() => {//함수 선언 - memberListDB호출
      console.log('asyncDB')
      const auth = authLogic.getUserAuth()
      //현재 인증된 사용자 정보를 가져온다 
      const user = await onAuthChange(auth)
      console.log(user)
      //사용자가 있으면 - userId가 있다
      //구글 로그인으로 사용자 정보를 가지고 있을 때
      //user정보가 있으면 sessionStorage에 담는다 - email
      if(user){
        console.log('user정보가 있을 때')
        //세션스토리지에 이메일 주소가 등록됨 - 단 구글로그인이 되어있는 상태일때만
        ssg.setItem('email', user.email)
        const res = await memberListDB({mem_uid: user.uid, type: 'auth'})
        console.log(res.data)
        //오라클서버의 회원집합에 uid가 존재하면 - 세션스토리지에 값을 담자
        if(res.data!=0){//스프링 부트- RestMemberController - memberList - 1)0 , 2)[{mem_uid:sfsdfsfdsfssd}]
          const temp = JSON.stringify(res.data)
          const jsonDoc = JSON.parse(temp)
          ssg.setItem('name', jsonDoc[0].MEM_NAME)
          ssg.setItem('nickname', jsonDoc[0].MEM_NICKNAME)
          ssg.setItem('status', jsonDoc[0].MEM_STATUS)
          ssg.setItem('auth', jsonDoc[0].MEM_AUTH)
          ssg.setItem('no', jsonDoc[0].MEM_NO)
          //navigate("/")
          return //렌더링이 종료됨
        }
        //구글계정이 아닌 다른 계정으로  로그인을 시도했을 땐  user.emailVerified가 없다 - 그렇다면 undefined이겠지!
        if(!user.emailVerified){
          navigate('/auth/emailVerified')
        }
        //오라클서버의 회원집합에 uid가 존재하지 않으면 
        else {
          console.log("해당 구글 계정은 회원가입 대상입니다. 회원가입 부탁드립니다")
          navigate('/auth/signup')
        }
      }
      //사용자 정보가 없을 때
      else{
        console.log('user정보가 없을 때')
        if(sessionStorage.getItem('email')){
          //세션스토리지에 있는 값 모두 삭제하기
          sessionStorage.clear()
          window.location.reload()
        }
      }//end of else
    }
    asyncDB() //함수 호출하기
  },[dispatch])
  return (
    <>
      <div style={{height:'100vh'}}>
        {toastStatus.status && <Toast />}
        <Routes>
          <Route path='/login' exact={true} element={<KhLoginPage authLogic={authLogic}/>} />
          <Route path='/' exact={true} element={<HomePage />} />
          <Route path='/auth/signup' exact={true} element={<SignupPage authLogic={authLogic} />} />
          <Route path='/auth/emailVerified' exact={true} element={<EmailVerifiedPage authLogic={authLogic} />} />
          <Route path='/auth/findEmail' exact={true} element={<FindEmailPage />} />
          <Route path='/auth/resetPwd' exact={true} element={<ResetPwdPage authLogic={authLogic} />} />
          <Route path='/reple/board' exact={true} element={<RepleBoardPage  />} />
          <Route path='/reple/boarddetail/*'  element={<RepleBoardDetail  />} />
          <Route path='/reple/boardwrite' exact={true}  element={<RepleBoardWriteForm  />} />
          <Route path='/dept/:gubun' element={<DeptPage  imageUploader={imageUploader} />} />
          {/* 컴포넌트 함수를 호출하는 것이다 - 마운트 - return호출되었다 */}
          <Route path='/deptdetail/:deptno' element={<DeptDetail  imageUploader={imageUploader} />} />
          <Route path='/auth/kakao/callback' exact={true} element={<KakaoRedirectHandler />} />
          <Route path='/member' exact={true} element={<MemberPage imageUploader={imageUploader}/>} />
          <Route path='/profile' exact={true} element={<Profile />} />

 <Route path='/qna/list' element={<KhQnAListPage  />} />
 <Route path='/qna/detail/*'  element={<KhQnADetailPage  />} />
 <Route path='/qna/write' exact={true}  element={<KhQnAWritePage  />} />
 <Route path='/qna/update/:bno' exact={true}  element={<KhQnAUpdatePage  />} />
        


        </Routes>
      </div>
    </>
  );
}

export default App;

/*
UserImpl {providerId: 'firebase', proactiveRefresh: ProactiveRefresh, reloadUserInfo: {…}, reloadListener: null, uid: 'y2YBZhMpeqWYD2L9vy13X73dEef2', …}
accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi6rmA7Iq57IiYIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDVBMjNlRFBGZ2xYbndTN2dUbm43bFphXzU2OHVDLWVpZk02dmRCPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2toLTIyMTEyOCIsImF1ZCI6ImtoLTIyMTEyOCIsImF1dGhfdGltZSI6MTY4MDEzMjI4NiwidXNlcl9pZCI6InkyWUJaaE1wZXFXWUQyTDl2eTEzWDczZEVlZjIiLCJzdWIiOiJ5MllCWmhNcGVxV1lEMkw5dnkxM1g3M2RFZWYyIiwiaWF0IjoxNjgwMTMyMjg2LCJleHAiOjE2ODAxMzU4ODYsImVtYWlsIjoic2xhbG9tMDkxNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMjI3MDgwNzk5OTkzNTQxNzAyNCJdLCJlbWFpbCI6WyJzbGFsb20wOTE0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.DqPG9atRcOfomcaONxGUWHN5OawCWt1_1pZw3j4xGsWrTnycYQnDuz2pbC_Rj3dFdwzr4rsAI0Vm4JiT_RcdRXkaImx5K_4dSEBLIcFv6VdIvrDbsZI0igaqXjBToPXngxCJxk9LRiCiragfNrK94gkuU2ClOKVr-mYPiCXCaiBGWwcybhsgp1m1u34pW9r-kEUmfu9lbwL0e25PYucizEn3-bkVRcKU8lOV1e3n1vTijKx9t6s-VqzrjXHxRdyOZ1lc5j_B69on_7obAKzYVJO_XOFgKOXYvwCCpQ-D9muuN7AlIxnYdZqTzA-SZkQyZ5uVlTAivq4Q2dD2FHbBrg"
auth: AuthImpl {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, config: {…}, currentUser: UserImpl, emulatorConfig: null, …}
displayName: "김승수"
email: "slalom0914@gmail.com"
emailVerified: true
*/
import { Route, Routes, useNavigate, useResolvedPath } from 'react-router-dom';
import MemberPage from './page/MemberPage';
import KakaoRedirectHandler from './kakao/KakaoRedirectHandler';
import Profile from './kakao/Profile';
import HomePage from './page/HomePage';
import DeptPage from './page/DeptPage';
import DeptDetail from './components/dept/DeptDetail';
import RepleBoardPage from './page/RepleBoardPage';
import LoginPage from './components/auth/LoginPage';
import Toast from './components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setToastMsg } from './redux/toastStatus/action';
import SignupPage from './components/auth/SignupPage';
import Signup from './member/Signup'
import Prac from './member/Prac';
import KhLoginPage from './components/auth/KhLoginPage';
import { onAuthChange } from './service/authLogic';
import { jsonMemberListDB } from './service/dbLogic';
import EmailVerifiedPage from './components/auth/EmailVerifiedPage';
import FindEmailPage from './components/auth/FindEmailPage';
import ResetPwdPage from './components/auth/ResetPwdPage';

function App({authLogic, imageUploader}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const ssg = window.sessionStorage
  const toastStatus = useSelector(state=>state.toastStatus)
  useEffect(()=>{
    dispatch(setToastMsg('회원가입 하세요!'))
    const asyncDB=async()=>{
      const auth = authLogic.getUserAuth()
      //현재 인증 된 사용자 정보를 가져온다. 
      const user = await onAuthChange(auth)
      //사용자가 있으면 - userId 가 있다. 
      //구글 로그인으로 사용자 정보를 가지고 있을 때 
      //user정보가 있으면 sessionStorage에 담는다. - email 
      if(user){
        console.log('user정보가 있을 때')
        ssg.setItem('email', user.email)
        const res = await jsonMemberListDB({mem_uid: user.uid, type:'auth'})
        //오라클 서버의 회원집합에 uid가 존재하면 - 세션 스토리지에 값을 담자.  
        console.log(res.data)
        //오라클 서버의 회워집합에 uid가 존재하면 - 세션 스토리지에 값을 담자
        if(res.data!==0){  //스프링부트 - RestMemberController - memberList
          const temp = JSON.stringify(res.data)
          const jsonDoc = JSON.parse(temp)
        ssg.setItem('nickname', jsonDoc[0].MEM_NICKNAME)
        ssg.setItem('status', jsonDoc[0].MEM_STATUS)
        ssg.setItem('auth', jsonDoc[0].MEM_AUTH)
        ssg.setItem('no', jsonDoc[0].MEM_NO)
        navigate('/home')   
        return //랜더링 종료 
        }
        //구글 로그인을 했지만 false 일 때, 

        //r구글계정이 아닌 다른 계정으로 로그인을 시도했을 땐 suer.emailVerified가 없다 - 그렇다면 undefined 이겠지!
        if(!user.emailVerified){      
          navigate('./auth/emailVerified')
        }
        //if(){}
        //오라클 서버의 회원집합에 uid가 존재하지 않으면, 
      else{
        console.log('해당 구글 계정은 회원가입 대상입니다. 회원가입 부탁드립니다.')
      navigate('/auth/signup')
      }
      }
      //사용자 정보가 없을 때 
      else{
        console.log('user 정보가 없을 때')  //
        if(sessionStorage.getItem('email')){
          sessionStorage.clear()
          window.location.reload()
        }  
      } //end of else
    }
asyncDB()
  },[dispatch])
  return (
<>
<div style={{height:'100vh'}}>
  {toastStatus.status && <Toast/>}
<Routes>
    <Route path='/' exact={true} element={<LoginPage /> }/>
    <Route path='/home' exact={true} element={<HomePage /> }/>
    <Route path='/repleboard' element={<RepleBoardPage /> }/>
    <Route path='/dept/:gubun' element={<DeptPage imageUploader={imageUploader} /> }/>
    {/* 컴포넌트 함수를 호출하는 것이다 - 마운트 - return호출되었다 */}
    <Route path='/deptdetail/:deptno' element={<DeptDetail imageUploader={imageUploader} /> }/>
    <Route path='/auth/kakao/callback' exact={true} element={<KakaoRedirectHandler /> }/>
    <Route path='/member' exact={true} element={<MemberPage  imageUploader={imageUploader}/>} />
    <Route path='/profile' exact={true} element={<Profile />} />
    <Route path='/auth/signup' exact={true} element={<SignupPage authLogic={authLogic}/>} />
    <Route path='/signup' exact={true} element={<Signup />} />
    <Route path='/login/login' exact={true} element={<LoginPage />} />
    <Route path='/login' exact={true} element={<KhLoginPage authLogic={authLogic}/>} />
    <Route path='/prac' exact={true} element={<Prac />} />
    <Route path='/auth/emailVerified' exact={true} element={<EmailVerifiedPage  authLogic={authLogic} />} />
    <Route path='/auth/findEmail' exact={true} element={<FindEmailPage />} />
    <Route path='/auth/resetPwd' exact={true} element={<ResetPwdPage />} />

    </Routes>

</div>
    </>
  );
}

export default App;

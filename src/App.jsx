import { Route, Routes, useResolvedPath } from 'react-router-dom';
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

function App({authLogic, imageUploader}) {
  const dispatch = useDispatch()
  const toastStatus = useSelector(state=>state.toastStatus)
  useEffect(()=>{
    dispatch(setToastMsg('회원가입 하세요!'))
  },[])
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
    <Route path='/login' exact={true} element={<LoginPage />} />

    </Routes>

</div>
    </>
  );
}

export default App;

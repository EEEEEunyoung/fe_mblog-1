import { Route, Routes } from 'react-router-dom';
import MemberPage from './page/MemberPage';
import LoginPage from './components/auth/LoginPage';
import KakaoRedirectHandler from './kakao/KakaoRedirectHandler';
import Profile from './kakao/Profile';
import HomePage from './page/HomePage';
import DeptPage from './page/DeptPage';

function App({imageUploader}) {
  return (
<>
스프링부트와 리액트 연동하기 
<Routes>
    <Route path='/' exact={true} element={<LoginPage /> }/>
    <Route path='/home' exact={true} element={<HomePage /> }/>
    <Route path='/dept' exact={true} element={<DeptPage /> }/>
    <Route path='/auth/kakao/callback' exact={true} element={<KakaoRedirectHandler /> }/>
    <Route path='/member' exact={true} element={<MemberPage  imageUploader={imageUploader}/>} />
    <Route path='/profile' exact={true} element={<Profile />} />
    </Routes>

    </>
  );
}

export default App;

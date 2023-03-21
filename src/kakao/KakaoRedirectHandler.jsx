import axios from 'axios'
import qs from 'qs';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const KakaoRedirectHandler = () => {
    //const { Kakao } = window;        //카카오 객체를 global variable에 등록해 주는 코드임
    const navigate = useNavigate()
    //location.href 나 sendRedirect 대신 사용함
    //카카오 서버에서 돌려주는 URL 뒤에 쿼리스트링 가져오기 - mdn searchParams
    //서블릿 - request.getParameter("code"); ==>
    //http://localhost:3000/auth/kakao/callback
    //code=6lhoPcVhWmNQlvBOWZUQ7qA4b4ta63NXQLEpensnCiolDgAAAYcBe_y5
    let params = new URL(document.location).searchParams;
    let code = params.get("code"); // is the string "Jonathan Smith".
    const grant_type="authorization_code"
    const redirect_uri="http://localhost:3000/auth/kakao/callback"
    console.log(code)
    const getToken = async()=>{
        const payload = qs.stringify({
            grant_type:grant_type,
            client_id: process.env.REACT_APP_KAKAO_API_KEY,
            redirect_uri:redirect_uri,
            code:code
        })
        try{
            const res = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                payload
                )
                window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
                console.log(res.data.access_token);
                window.Kakao.Auth.setAccessToken(res.data.access_token);
               navigate("/profile");
            }catch(error){
                console.log(error)
        }
    }
    useEffect(()=>{
getToken()
    })
return (
    <div>
      {/*  
       루트컨텍스트--인증이 되면 / home 으로 가자 
      */}
      {code}
    </div>
  )
}

export default KakaoRedirectHandler

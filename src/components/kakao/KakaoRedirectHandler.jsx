import React, { useEffect } from 'react'
import qs from 'qs'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KakaoRedirectHandler = () => {
	//location.href나 sendRedirect대신 사용함
	const navigate = useNavigate() 
	//카카오 서버에서 돌려주는 URL뒤에 쿼리스트링가져오기 - mdn searchParams
	//서블릿 - request.getParameter("code");==> 2-q89JO0M3-7LkFyVPhDYzUh_CxXKpsNcZzuQQJWQIiVWEqGZnIxVAKzrZRAKhnHQJLxCworDKcAAAGHAZ_sHw
	//http://localhost:3000/auth/kakao/callback
	//?code=2-q89JO0M3-7LkFyVPhDYzUh_CxXKpsNcZzuQQJWQIiVWEqGZnIxVAKzrZRAKhnHQJLxCworDKcAAAGHAZ_sHw
	let params = new URL(document.location).searchParams;
	let code = params.get("code"); //2-q89JO0M3-7LkFyVPhDYzUh_CxXKpsNcZzuQQJWQIiVWEqGZnIxVAKzrZRAKhnHQJLxCworDKcAAAGHAZ_sHw
	console.log(code)
	const grant_type = "authorization_code"
	const redirect_uri  = "http://localhost:3000/auth/kakao/callback"
	const getToken = async () => {
		const payload = qs.stringify({
			grant_type: grant_type,
			client_id:process.env.REACT_APP_KAKAO_API_KEY,
			redirect_uri: redirect_uri,
			code : code,
		})
		try {
			const res = await axios.post(
				"https://kauth.kakao.com/oauth/token",
				payload
			)
			window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY)
			console.log(res.data.access_token)
			window.Kakao.Auth.setAccessToken(res.data.access_token);
			navigate("/profile")
		}catch(error){
			console.log(error)
		}
	}
	useEffect (()=>{
		getToken()
	})
  return (
	<>
		{/*아무런 의미 없는 화면이다 -  거쳐서 다른 화면으로 이동하니까 - 루트컨텍스트 - 인증이 되면  /home으로 가자*/}
		{/* 2-q89JO0M3-7LkFyVPhDYzUh_CxXKpsNcZzuQQJWQIiVWEqGZnIxVAKzrZRAKhnHQJLxCworDKcAAAGHAZ_sHw */}
		{code}
	</>
  )
}

export default KakaoRedirectHandler

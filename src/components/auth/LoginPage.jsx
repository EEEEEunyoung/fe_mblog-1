import React from 'react'
import Image from 'react-bootstrap/Image'
import BlogHeader from '../../include/BlogHeader'

const LoginPage = () => {
    const CLIENT_ID="a9148c630e6bf45828ba262cd86a663e"
    const REDIRECT_URL="http://localhost:3000/auth/kakao/callback"
    const KAKAO_AUTH_URL=`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`
  return (
    <div>
        <a href={KAKAO_AUTH_URL}>
        <img src='/images/kakao/kakao_login_large_wide.png' />
        </a>
    </div>
  )
}


export default LoginPage

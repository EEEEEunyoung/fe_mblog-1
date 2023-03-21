import React from 'react'
import { ContainerDiv, FormDiv, HeaderDiv } from '../components/styles/FormStyle'
import BlogHeader from '../include/BlogHeader'
import KakaoMap from '../kakao/KakaoMap'


const HomePage = () => {
  return (
    <>
        <ContainerDiv>
      <HeaderDiv>
      <h1 style={{maginLeft:"10px"}}>홈페이지</h1>     
       <BlogHeader />
      </HeaderDiv>

<FormDiv style={{}}>
<div>이벤트존</div>
<hr style={{height:"2px"}}/>
<div>추천수업존</div>
<hr style={{height:"2px"}}/>
<div><KakaoMap /></div>
<div>카카오맵존</div>
<hr style={{height:"2px"}}/>
</FormDiv>
        </ContainerDiv>

    </>
  )
}

export default HomePage

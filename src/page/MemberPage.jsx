import React, { useEffect, useState } from 'react'
import { jsonMemberListDB } from '../service/dbLogic';
import ImageUploader from '../service/imageUploader';

function MemberPage({imageUploader}) {
    const [member, setMember]=useState({});
    useEffect(()=>{
const memberList=async()=>{
    const res = await jsonMemberListDB(member);
    console.log(res.data);
}
memberList();
    },[])
//async는 비동기 처리시 사용함 

const imgChange = async(e)=>{
    console.log(e.target.files[0])
        //async가 붙은 함수 안에서만 await을 사용할 수 있음 - 파일 이 업로드 될 때 까지 
        const uploaded = await imageUploader.upload(e.target.files[0])
        //public_id - 선택한 이미지의 실제 아이디가 아닌 cloudinary에서 부여하는 아이디 값 
        //이 값으로 실제  이미지 링크 정보가 생성됨
        //format 은 선택한 파일의 확장자임
        //url 링크 이미지 URL정보
        console.log(`${uploaded.public_id}${uploaded.format}${uploaded.url}`)
        
    } 


  return (
    <>
회원관리 페이지 
<input type="file" name="mimg" id="mimg" onChange={imgChange} ></input>
    </>
)
}

export default MemberPage
/* global daum*/
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';



const Prac = () => {
  const[mem_zipcode,setZipcode] = useState("")
  const[mem_addr,setAddr] = useState("")
  const[mem_addr_dtl,setAddrDtl] = useState("")
  const[post,setPost] = useState({
    zipcode:'',
    addr:'',
    addrDetail:''
  })


  // const handleZipcode = useCallback((e) => {
  //   setZipcode(e)
  // },[])
  // const handleAddr = useCallback((e) => {
  //   setAddr(e)
  // },[])  
  // const handleAddrDtl = useCallback((e) => {
  //   setAddrDtl(e)
  // },[])



  const clickAddr =(e)=>{
    new daum.Postcode({
      oncomplete: function(data) {
        let addr=''
        if(data.userSelectedType==='R'){
          addr = data.roadAddress; // 도로명
        }
        else{
          addr= data.jibunAddress; // 도로명
        }
        console.log(data) //전체 주소정보 - 한글+영어
        console.log(addr)//주소정보만
        setPost({...post, zipcode: data.zonecode, addr:data.address}) //깊은복사
        document.querySelector("#mem_zipcode").value=data.zonecode  //화면에 자동으로 입력처리
        document.querySelector("#mem_addr").value=addr  //선택한 주소정보를 input 컴포넌트에 자동 입력 처리 
        document.querySelector("#mem_addr_dtl").focus()  
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
          // 예제를 참고하여 다양한 활용법을 확인해 보세요.
      }
  }).open();
  }
  return (
    <>
 <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h3>우편번호</h3> 
            </div>
            <input id="mem_zipcode" type="text" maxLength="50" placeholder="우편번호 입력"
              style={{width:"500px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}}/>
           
           <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h3>주소</h3> 
            </div>
            <input id="mem_addr" type="text" maxLength="50" placeholder="주소 입력" 
              style={{width:"350px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}}/>
           <Button onClick={clickAddr} id="memaddrbtn"> 주소 검색</Button>

           <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h3>상세주소</h3> 
            </div>
            <input id="mem_addr_dtl" type="text" maxLength="50" placeholder="상세주소 입력" readOnly={post.addr?false:true}
              style={{width:"350px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}}/>

    </>
  )
}

export default Prac

import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { qnaListDB } from '../../service/dbLogic';
import BlogFooter from '../include/BlogFooter';
import BlogHeader from '../include/BlogHeader';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle';
import KhMyFilter from './KhMyFilter';
import KhSearchBar from './KhSearchBar';

const KhQnAListPage = ({authLogic, bno}) => {
  //페이징 처리시에 현재 내가 바라보는 페이지 정보 담기
  let page = 1
  //화면 전환 시 필요한 훅
  const navigate = useNavigate();
  //오라클 서버에서 받아온 정보를 담기 
  const search = decodeURIComponent(useLocation().search);
  const [listBody,setListBody] = useState([]);
  //qna_[types] 구분 상수값 - 라벨
  const[types]= useState(['전체','일반','결제','양도','회원','수업']);
  //qna_type 상태관리 위해 선언
  const [tTitle, setTTitle] = useState('전체') 
  //함수 메모이제이션 해줌 - useCallback  -> useMemo는 값을 메모이제이션
  const handleTTitle = useCallback((element) => {
    //파라미터로 받은 값을 저장 - tTitle
    setTTitle(element);
  },[]);  //의존배열이 비었으므로 한 번 메모이제이션 된 함수 값을 계속 기억해둠


  useEffect(() => {
    const qnaList = async() =>{
      //콤보박스 내용 -> 제목, 내용, 작성자 중 하나
      //사용자가 입력한 키워드
//[0]-?condition=제목|내용|작성자
 //[1]-content=입력한값
      const condition = search.split('&').filter((item)=>{return item.match('condition')})[0]?.split('=')[1];
      //http://localhost:3000/qna/list?condition=제목|내용|작성자&content=입력한값
      const qna_type = search.split('&').filter((item)=>{return item.match('qna_type')})[0]?.split('=')[1];
      const content = search.split('&').filter((item)=>{return item.match('content')})[0]?.split('=')[1];
      //http://localhost:3000//qna/list?page=1&qna_type=수업
      console.log(qna_type);  //수업 저장됨
      console.log('컨디션'+condition)
      console.log('컨텐트'+content)
      setTTitle(qna_type||'전체');  //쿼리스트링이 없으면 그냥 전체가 담김
      const board = {     //get방식으로 조건검색 - params 속성에 들어갈 변수
        page: page,
        qna_type: qna_type,
        condition: condition,
        content:content    
      }
      const res = await qnaListDB(board);
      console.log(res.data);
      const list = [];
      const datas=res.data
      datas.forEach((item, index)=>{
        console.log(item)
        const obj={
          qna_bno:item.QNA_BNO,
          qna_type:item.QNA_TYPE,
          qna_title:item.QNA_TITLE,
          mem_name:item.MEM_NAME,
          qna_date:item.QNA_DATE,
          qna_hit:item.QNA_HIT,
          qna_secret:JSON.parse(item.QNA_SECRET),  //"false" -> false가 됨
          file:item.FILE_NAME,
          comment:item.COMM_NO
        }
list.push(obj)
      })
      setListBody(list);
    }
    qnaList();
  },[setListBody, setTTitle,  page, search]);
  //listItemsElements 클릭이벤트 처리시 사용
  const getAuth = (listItem) => {
    console.log(listItem);
    console.log(listItem.qna_secret);
if(listItem.qna_secret===false){
  navigate(`qna/detail?${listItem.qna_bno}`)
}else{
console.log('권한이 없습니다. 비공개입니다. ')
    }
  }


  
  const listHeaders = ["글번호","분류","제목", "작성자", "등록일", "조회수"];
  const HeaderWd = ["8%","8%","50%", "12%", "12%", "10%"];


  const listHeadersElements = listHeaders.map((listHeader, index) => 
  listHeader==='제목'?
    <th key={index} style={{width:HeaderWd[index], paddingLeft:"40px"}}>{listHeader}</th>
    :
    <th key={index} style={{width:HeaderWd[index],textAlign: 'center'}}>{listHeader}</th>
  )

  const listItemsElements = listBody.map((listItem, index) => {
    console.log(listItem);
    return (
      <tr key={index} onClick={()=>{getAuth(listItem)}}>
        { Object.keys(listItem).map((key, index) => (
          key==='secret'||key==='no'||key==='file'||key==='comment'? null
          :
          key==='date'?
          <td key={index} style={{fontSize:'15px', textAlign: 'center'}}>{listItem[key]}</td>
          :
          key==='title'?
          <td key={index}>            
            {isNaN(listItem.file)&&<span><i style={{width:"15px", height:"15px"}} className={"fas fa-file-lines"}></i></span>}
            {!isNaN(listItem.file)&&<span><i style={{width:"15px", height:"15px"}} className={"fas fa-image"}></i></span>}
            &nbsp;&nbsp;{listItem[key]}
            {listItem.comment?<span style={{fontWeight:"bold"}}>&nbsp;&nbsp;[답변완료]</span>:<span>&nbsp;&nbsp;[미답변]</span>}
            {listItem.secret&&<span>&nbsp;&nbsp;<i className="fas fa-lock"></i></span>}</td>
          :
          <td key={index} style={{textAlign: 'center'}}>{listItem[key]}</td>
        ))}  
      </tr>
    )
  })



  return (
    <>
      <BlogHeader authLogic={authLogic}/>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>QnA 게시판</h3>
        </HeaderDiv>
        <FormDiv>
          <div>
            <div style={{display:"flex", justifyContent:"space-between", height:"40px"}}>
              <KhMyFilter types={types} type={true} id={"qna_type"} title={tTitle} handleTitle={handleTTitle}/>
              {
                sessionStorage.getItem('auth')==='teacher'&&
                <BButton style={{width:"80px", height:"38px"}} onClick={()=>{navigate(`/qna/write`)}}>글쓰기</BButton>
              }
            </div>
            <Table responsive hover style={{minWidth:"800px"}}>
              <thead>
                <tr>
                  {listHeadersElements}
                </tr>
              </thead>
              <tbody>
                {listItemsElements}
              </tbody>
            </Table>
          </div>
          <div style={{margin:"10px", display:"flex",flexDirection:"column" ,alignItems:"center" , justifyContent:"center" , width:"100%"}}>
            {/* <MyPagination page={page} path={'/qna/list'}/> */}
            <KhSearchBar />
          </div>
        </FormDiv>
      </ContainerDiv>
      <BlogFooter />	
    </>
  );
};

export default KhQnAListPage;
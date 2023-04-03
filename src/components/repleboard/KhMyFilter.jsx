import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { qnaListDB } from '../../service/dbLogic';
const KhMyFilter = ({types, type, id, title, handleTitle}) => {
  console.log('id:' + id);//qna_type
  console.log('types:'+ types)
  console.log(type)
  const navigate = useNavigate();

  const location = useLocation();
  const gubun = useParams();
  const [boardList, setReplBoradList] = useState([])
  console.log(gubun)
  
	const reactSearch = () => {
		const gubun = document.querySelector("#gubun").value
		//조건검색에 필요한 문자열 담기
		const asyncDB = async () => {
			const res = await qnaListDB({gubun})
			console.log(res.data)
			if(res.data){
				setReplBoradList(res.data)
			}
		}
		asyncDB()
	}

  
  const setPath = (oldItem, newItem, key) => {
    console.log(location.pathname)
    console.log(oldItem)
    console.log(newItem)
    console.log(key)
    let path= '?qna_type=' + newItem;
    return path;
  }
  return (
    <DropdownButton   id="gubun" variant="" title={title} style={{border: '1px solid lightgray', borderRadius:'5px', height:'38px'}}>
      { 
        types.map((element, index)=>(
          <Dropdown.Item as="button" key={index} onClick={()=>{
            console.log(element[index])
            console.log("dd")
            if(type){ 
              navigate(setPath(title,element,id)); 
            }
            handleTitle(element); 
          }}>
            {element}
          </Dropdown.Item>
        )) 
      }
    </DropdownButton>
  );
};
export default KhMyFilter;
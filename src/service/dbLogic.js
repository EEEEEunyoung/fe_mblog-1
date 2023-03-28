import axios from "axios";

export const jsonMemberListDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url:"http://localhost:8000/member/memberList",
        params: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};


export const deptListDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8000/dept/deptList",
        params: dept, //쿼리스트링 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};



export const deptDeleteDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method:"get",   //@RequestBody - 
        url: "http://localhost:8000/dept/deptDelete",
        params:dept,  //post방식으로 전송시 반드시 data 속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};







export const uploadImageDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_Servlet230216_IP + "board3/imageUpload.st3",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};


export const deptInsertDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method:"post",   //@RequestBody - 
        url: "http://localhost:8000/dept/deptInsert",
        data:dept,  //post방식으로 전송시 반드시 data 속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};


export const deptUpdateDB = (dept) => {
  return new Promise((resolve, reject) => {
    console.log(dept)
    try {
      const response = axios({
        method:"post",   //@RequestBody - 
        url: "http://localhost:8000/dept/deptUpdate",
        data:dept,  //post방식으로 전송시 반드시 data 속성으로 파라미터 줄 것
      });
      resolve(response);  //요청처리가 성공했을 때
    } catch (error) {
      reject(error);     //요청 처리 실패 했을 때
    }
  });
};






export const boardInsertDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_Servlet230216_IP + "board3/boardInsert.st3",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};


export const memberInsertDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method:"post",   //@RequestBody - 
        url: "http://localhost:8000/member/memberInsert",
        data:member,  //post방식으로 전송시 반드시 data 속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};








/* rafce 단축키 - arrow function export default*/

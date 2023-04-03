<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	//스크립틀릿이라고 읽음
	String mem_id = request.getParameter("mem_id");
	out.print("사용자가 입력한 아이디 ===>"+mem_id);
	String mem_pw = request.getParameter("mem_pw");
	out.print("사용자가 입력한 비번 ===>"+mem_pw);
	String mem_name = request.getParameter("mem_name");
	out.print("사용자가 입력한 이름 ===>"+mem_name);
	out.print("<br />");
%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
회원가입
</body>
</html>
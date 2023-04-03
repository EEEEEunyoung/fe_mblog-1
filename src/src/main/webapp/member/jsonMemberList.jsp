<%@ page language="java" contentType="application/json; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.sql.*, java.util.*, com.util.DBConnectionMgr"%>
<%@ page import="com.google.gson.Gson"%>
<%
	//스크립틀릿
	//out.print("jsonMemberList페이지");
	DBConnectionMgr 	dbMgr 	= new DBConnectionMgr();
	Connection 				con 		= null;
	PreparedStatement pstmt   = null;
	ResultSet 				rs			 = null;
	List<Map<String,Object>> memList = null;
	StringBuilder sql = new StringBuilder();
	sql.append("SELECT mem_no, mem_id, mem_name FROM member");
	try {
		//물리적으로 떨어져 있는 오라클 서버에 연결통로
		con = dbMgr.getConnection();
		//연결통로를 통해서 select문을 가져가고 오라클서버에게 요청하는 객체로딩
		pstmt = con.prepareStatement(sql.toString());
		//오라클서버의 커서를 조작할 객체로딩
		rs = pstmt.executeQuery();
		memList = new ArrayList<>();
		Map<String,Object> rmap = null;
		while(rs.next()) {
			rmap = new HashMap<>();
			rmap.put("mem_no", rs.getInt("mem_no"));
			rmap.put("mem_id", rs.getString("mem_id"));
			rmap.put("mem_name", rs.getString("mem_name"));
			memList.add(rmap);
		}
		//System.out.println(memList);
	} catch (Exception e) {
		e.printStackTrace();
	} finally {
		//사용한 자원을 반납하기 - 명시적으로 반납할것 - 실행시점을 당기기 위해 - 튜닝팀의 권장사항
		dbMgr.freeConnection(con, pstmt, rs);
	}
	Gson g = new Gson();
	String temp=null;
	temp = g.toJson(memList);
	out.print(temp);
%>
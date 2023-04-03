function first(param){
	console.log(param) //[Function 이름없션]
	param()
}

function second(){
	console.log(2)
}

first(second)
//https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures -클로저
//순서대로 꼭 처리가 되어야 할땐
function func1(){//outter함수 - 클로저
	let num = 0 //선언된 변수
	return () =>{//반환형이 함수인 경우임
		return ++num //요기서 사용가능함
	}
}

let account = func1()//account함수가 생성된 후에도 상위함수인 func1의 변수 num에 접근가능함
console.log(account) //괄호가 없으면 [Function]
console.log(account()) //괄호가 없으면 [Function]

function one(){
	console.log(1)
}
function two(){
	console.log(2)
}
one()
two()



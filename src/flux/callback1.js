function first(param){
    console.log(param)
    param()
}

function second(){
    console.log(2)
}

first(second)

function func1(){ //outter 함수 - 클로저
    let num = 0; //선언된 변수
    return function func2(){ //반환형이 함수인 경우임
        return ++num // 요기서 사용 가능함
    }
}

let account = func1() //account함수가 생성된 후에도 상위함수인 func1의 변수 num에 접근 가능함
console.log(account())
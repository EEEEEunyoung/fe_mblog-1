let global=-99;

function func1(){
    let num = 0 
    return num
}

function func2(num){
    num=num+1
    return num
}
//관전 포인트는 num의 값이 바뀌지 않는다 - 불변성 - 리액트 컨벤션
function func3(){
    let num =0
    global = num+1
    return global
}

console.log(func1())
console.log(func2(2))
console.log(global)
console.log(func3())
console.log(global)

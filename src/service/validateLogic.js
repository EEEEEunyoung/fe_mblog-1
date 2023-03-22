export const validateDname=(e)=>{
    const name = e.target.value; //input onChange
    const han = /^[가-힣]+$/;
    const eng=/^[a-zA-Z]+$/;
    if(name.length===0){
        return " ";
    }else if(han.test(name)||eng.test(name)){     //test의 리턴 타입은 불리언 
        return"";
    }else{
        return "부서명은 영어 또는 한글로만 가능합니다."
        }
    };

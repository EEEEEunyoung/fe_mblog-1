
import { decrease, increase } from "./actions.js";
import { reducer } from "./reducer.js";
import { createStore } from "./redux.js";

//사용 - 함수 호출 - store 생성하기 - index.js - 리액트 - 왜?index.js인가? 생성한 store안에 모든 전역상태값을 넣어서 관리하고 싶다.(initializeState)
//app.js에 있는 코드가 리액트 컴포넌트에 써야하는 코드임
//문제제기 - app.js 하나에 모두 있을 때는 파라미터에 reducer(구:worker)파라미터로 넘겨야 함
const store = createStore(reducer);//index.js에서 생성할 것임 - props 대신 중앙에서 즉시 한번에 가져다 사용
store.subscribe(()=>{//구독발행 모델-함수 호출
//getState리액트에서 useSelector(state =>state.userAuth) 상태값을 store에서 읽어들일때 사용함
   console.log(store.getState())//변경된 상태값 찍기-리액트 컴포넌트가 마운트 될 때 찍기
})


store.dispatch(increase());//시그널 주기 - action - 리액트 const dispatch = useDispatch()
store.dispatch(increase());
store.dispatch(decrease());

//action -store - dispatch - view
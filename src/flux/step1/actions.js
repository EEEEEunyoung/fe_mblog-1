import { DECREASE, INCREASE, RESET } from "./action-type.js";
import { actionCreator } from "./redux.js";
//store.dispatch(increase()); - dispatch는 action을 store에 전달하는 허브
//store에 들어있는 상태값을 꺼내는 것이 getState - useSelector
export const increase =  actionCreator(INCREASE);
export const decrease =  actionCreator(DECREASE);
export const reset =  actionCreator(RESET);

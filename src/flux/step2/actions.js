import { DECREASE, INCREASE, RESET, SET_FALSE, SET_MSG } from "./action-type.js";
import { actionCreator } from "./redux.js";
//store.dispatch(increase()); - dispatch는 action을 store에 전달하는 허브
//store에 들어있는 상태값을 꺼내는 것이 getState - useSelector
export const increase = actionCreator(INCREASE);
export const decrease = actionCreator(DECREASE);
export const reset = actionCreator(RESET);
export const setToastMsg = (msg) => {
  return {
    type: SET_MSG,
    msg: msg,
    bool: true,
  };
};
export const setToastFalse = () => {
  return {
    type: SET_FALSE,
    msg: '',
    bool: false,
  };
};

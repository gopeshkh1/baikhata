import { combineReducers, createStore } from "redux";
import sales from "./salesReducer";
import stocks from "./stocksReducer";

// export default saleReducer;
export default combineReducers({ sales, stocks });

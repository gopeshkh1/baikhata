import { combineReducers, createStore } from "redux";
import sales from "./salesReducer";
import stocks from "./stocksReducer";
import formdata from "./formDataReducer";

// export default saleReducer;
export default combineReducers({ sales, stocks, formdata });

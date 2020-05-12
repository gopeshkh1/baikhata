import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

let initialValues = { sales: [] };
const middleware = [thunk];

export default createStore(
  rootReducer,
  initialValues,
  composeWithDevTools(applyMiddleware(...middleware))
);

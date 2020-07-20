import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

let initialValues = { sales: [], stocks: [], formdata: {} };
const middleware = [thunk];

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25
});

export default createStore(
  rootReducer,
  initialValues,
  composeEnhancers(applyMiddleware(...middleware))
);

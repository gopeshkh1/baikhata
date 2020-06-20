import { FETCH_STOCKS } from "../actions/types";

function stockReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_STOCKS:
      return [...payload];
    default:
      return state;
  }
}

export default stockReducer;

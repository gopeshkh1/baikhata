import { CHANGE_FORM_DATA, CLEAR_FORM_DATA } from "../actions/types";

function stockReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_FORM_DATA:
      return {};
    case CHANGE_FORM_DATA:
      return { ...state, [payload.name]: payload.value };
    default:
      return state;
  }
}

export default stockReducer;

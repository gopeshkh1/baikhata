import { CHANGE_FORM_DATA, CLEAR_FORM_DATA } from "./types";

export const clearFormData = () => dispatch => {
  dispatch({ type: CLEAR_FORM_DATA, payload: {} });
};

export const changeFormData = payload => dispatch => {
  dispatch({ type: CHANGE_FORM_DATA, payload: payload });
};

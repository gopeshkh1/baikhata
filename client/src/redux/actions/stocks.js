import { FETCH_STOCKS } from "./types";
import axios from "axios";

export const fetchStocks = payload => dispatch => {
  try {
    axios
      .get(`/api/stocks/getStocks/${payload.year}/${payload.month}`)
      .then(res => dispatch({ type: FETCH_STOCKS, payload: res.data }));
  } catch (err) {}
};

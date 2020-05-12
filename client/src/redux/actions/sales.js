import { ADD_SALE_ENTRY, EDIT_SALE_ENTRY, FETCH_SALE_DATA } from "./types";
import axios from "axios";

export const addSaleEntry = (payload) => (dispatch) => {
  try {
    axios
      .post("/api/sales/addSaleInfo", payload)
      .then((res) => dispatch({ type: ADD_SALE_ENTRY, payload: res.data }));
  } catch (err) {}
};

export const editSaleEntry = (payload) => async (dispatch) => {
  console.log("edit sale");
  try {
    var res = await axios.put("/api/sales/editEntry", payload);
    if (res.data.status === "success") {
      dispatch({ type: EDIT_SALE_ENTRY, payload });
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchSaleData = () => async (dispatch) => {
  console.log("fetchdata");
  try {
    var res = await axios.get("/api/sales/fetchSaleData");
    dispatch({ type: FETCH_SALE_DATA, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

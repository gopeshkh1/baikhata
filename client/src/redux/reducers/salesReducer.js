import {
  ADD_SALE_ENTRY,
  FETCH_SALE_DATA,
  EDIT_SALE_ENTRY,
} from "../actions/types";

function saleReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_SALE_ENTRY:
      return [...state, payload];

    case FETCH_SALE_DATA:
      return [...payload];

    case EDIT_SALE_ENTRY:
      return [
        ...state.map((row) => {
          const { colId, subColId, rowId, subRowId, newValue } = payload;
          if (row.id === rowId) {
            const newRow = { ...row };
            if (subColId !== null) {
              newRow[colId] = newRow[colId].map((subrow) =>
                subrow.id === subRowId
                  ? { ...subrow, [subColId]: newValue }
                  : subrow
              );
            } else {
              newRow[colId] = newValue;
            }
            return newRow;
          }
          return row;
        }),
      ];

    default:
      return state;
  }
}

export default saleReducer;

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Typography,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TablePagination,
  Paper,
  Card,
  CardHeader,
  Grid,
  CardContent,
  Toolbar,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import DisplayCard from "./DisplayCard";
import ToolBar from "../ToolBar";

function DisplayTable(props) {
  const [state, setState] = useState({
    filters: {
      dealer_name: "",
      sales_type: "sell",
    },
    rows: [],
  });

  useEffect(() => {
    console.log("rows updated...");
    onFilterList();
  }, [props.rows]);

  function onFilterList(target) {
    const filters = state.filters;
    var newRows = props.rows;

    if (target) {
      const { name, value } = target;
      filters[name] = value;
    }

    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        switch (key) {
          case "sales_type":
            newRows = newRows.filter(
              (row) => row.sales_type === filters.sales_type
            );

          case "dealer_name":
            newRows = newRows.filter((row) =>
              row.dealer_name.startsWith(filters.dealer_name)
            );
            break;

          default:
            break;
        }
      }
    }

    setState({ ...state, filters, rows: newRows });
  }

  return (
    <div>
      <ToolBar onFilterList={onFilterList} />
      <br />
      <Grid container spacing={3}>
        {state.rows.map((row) => (
          <Grid key={row.id} item xs={6}>
            <DisplayCard row={row} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

// DisplayTable.propTypes = {
//   rows: PropTypes.arrayOf(
//     PropTypes.shape({
//       bill_no: PropTypes.string.isRequired,
//       dealer_name: PropTypes.string.isRequired,
//       product_type: PropTypes.string.isRequired,
//       product_name: PropTypes.string.isRequired,
//       quantity: PropTypes.number.isRequired,
//       quintals: PropTypes.number.isRequired,
//       rate: PropTypes.number.isRequired,
//       other_expenses: PropTypes.object,
//       total: PropTypes.number.isRequired,
//     })
//   ),
// };

const mapStateToProps = (state) => ({
  rows: state.sales,
});

export default connect(mapStateToProps, null)(DisplayTable);

import React from "react";
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
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import DisplayCard from "./DisplayCard";

function DisplayTable(props) {
  return (
    <div>
      <Grid container spacing={3}>
        {props.rows.map((row) => (
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

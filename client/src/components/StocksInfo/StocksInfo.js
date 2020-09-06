import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Typography,
  AppBar,
  Input
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import axios, { CancelToken } from "axios";
import Toolbar from "./Toolbar";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

function StockInfo() {
  const cancelToken = React.useRef(null);
  const [state, setState] = useState({
    tableData: {},
    headIndexes: []
  });

  const updateOnDateChange = async ({ year, month }) => {
    const daysInMonth = getDaysInMonth(year, month);
    let headIndexes = [];
    for (var i = 0; i < daysInMonth; i++) {
      headIndexes.push(i);
    }
    const tableData = await fetchStocks(year, month);
    setState(state => ({
      ...state,
      headIndexes,
      tableData
    }));
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const fetchStocks = async (yy, mm) => {
    const values = await axios.get(`/api/stocks/getMonthlyStocks/${yy}/${mm}`);
    return values.data;
  };

  return (
    <>
      <Toolbar
        onChangeYYMM={updateOnDateChange}
        selectedYYMM={state.selectedYYMM}
      />
      <TableContainer component={Paper} style={{ minHeight: 600 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              {state.headIndexes.map(headindex => (
                <StyledTableCell key={headindex}>
                  {headindex + 1}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(state.tableData).map(key => {
              var result = [<TableCell key={key}>{key}</TableCell>];

              const values = state.tableData[key];

              state.headIndexes.forEach(index => {
                let valuetoPush = values[index + 1] ? values[index + 1] : "X";
                result = [
                  ...result,
                  <TableCell key={`${key}:${index}`}>{valuetoPush}</TableCell>
                ];
              });
              return <TableRow key={key}>{result}</TableRow>;
            })}
          </TableBody>
        </Table>
        {Object.keys(state.tableData).length === 0 && (
          <Typography>No stocks available</Typography>
        )}
      </TableContainer>
    </>
  );
}

export default StockInfo;

import React, { useState, useEffect } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import {
  AppBar,
  Select,
  MenuItem,
  TextField,
  Grid,
  Toolbar,
  Typography,
  Button,
  FormControl,
  NativeSelect,
  InputLabel
} from "@material-ui/core";

import { AutoComplete } from "../CompMap/CstmComp/CstmComp";

const month = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12"
};

const getTodayInYYMMDD = () => {
  var [month, date, year] = new Date()
    .toLocaleDateString()
    .split("/")
    .map(value => (value.length === 1 ? `0${value}` : value));
  return { year, month, date };
};

export default function CustomToolBar(props) {
  const classes = makeStyles(theme => ({
    search: {
      width: 100,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      marginRight: 20,
      marginLeft: 20,
      paddingLeft: 5
    }
  }))();

  const [yymm, setYYMM] = useState({ ...getTodayInYYMMDD() });

  // useEffect(() => {
  //   const { year, month } = getTodayInYYMM();
  //   setYYMM({ year, month });
  // }, []);
  useEffect(() => {
    onSubmit();
  }, []);

  const onChange = e => {
    const { name, value } = e.target;
    setYYMM(state => ({ ...state, [name]: value }));
    // props.onChange({ name, value });
  };

  const onSubmit = e => {
    props.onChangeYYMM({ ...yymm });
  };

  return (
    <AppBar position="relative">
      <Toolbar style={{ backgroundColor: "#2e4f85", height: 40 }}>
        <Typography>Year:</Typography>
        <div className={classes.search}>
          <TextField defaultValue={yymm.year} name="year" onChange={onChange} />
        </div>
        <Typography>Month:</Typography>
        <div className={classes.search}>
          <FormControl>
            <NativeSelect
              value={yymm.month}
              onChange={onChange}
              inputProps={{
                name: "month"
              }}
            >
              {Object.keys(month).map(key => (
                <option key={key} value={month[key]}>
                  {key}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
        <Button variant="contained" onClick={onSubmit}>
          Search
        </Button>
      </Toolbar>
    </AppBar>
  );
}

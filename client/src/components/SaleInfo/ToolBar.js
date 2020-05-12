import React, { useState } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import {
  AppBar,
  Select,
  MenuItem,
  TextField,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

export default function ToolBar() {
  const classes = makeStyles((theme) => ({
    search: {
      width: 240,
      backgroundColor: fade(theme.palette.common.white, 0.15),
    },

    widthTransition: {
      transition: theme.transitions.create("width"),
      "&:hover, &:focus": {
        width: 270,
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
    },
    searchIcon: {
      padding: theme.spacing(1, 1, 1, 1),
      height: "100%",
      position: "absolute",
    },
    inputRoot: {
      paddingLeft: 35,
      color: "inherit",
    },

    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus ,&:hover": {
          width: "25ch",
        },
      },
    },
  }))();

  const [state, setState] = useState({
    entrytype: "sell",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setState({ ...state, [name]: value });
  };
  return (
    <AppBar position="relative">
      <Toolbar style={{ backgroundColor: "#2e4f85" }}>
        <Grid container justify="space-between">
          <Grid item xs={4}>
            <div className={classes.search}>
              <Typography display="inline" style={{ padding: 10 }}>
                Select sales type
              </Typography>
              <Select
                name="sales_type"
                value={state.entrytype}
                onChange={onChange}
              >
                <MenuItem value="sell">Sell</MenuItem>
                <MenuItem value="buy">Buy</MenuItem>
              </Select>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={`${classes.search} ${classes.widthTransition}`}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <TextField
                placeholder="Search Dealer"
                name="dealer_name"
                style={{ paddingLeft: 30, width: "88%" }}
                onChange={onChange}
              />
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

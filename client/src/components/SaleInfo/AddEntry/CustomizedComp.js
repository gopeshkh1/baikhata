import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuList,
  MenuItem,
  TextField,
  Menu,
  InputBase,
  Input,
  Grid,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";

import EntryMapComp from "./EntryMapComp";

import { v4 as uuidv4 } from "uuid";

export function AutoComplete() {
  const menuValues = [
    { id: "value1", label: "Value 1" },
    { id: "value2", label: "Value 2" },
    { id: "value3", label: "Value 3" },
    { id: "value4", label: "Value 4" },
  ];

  const [state, setState] = useState({
    selectedValue: "",
    menuOpen: false,
  });

  function onTextAreaChange(e) {
    setState({ ...state, menuOpen: true });
  }

  function onBlur(e) {
    setState({ ...state, menuOpen: false });
  }

  return (
    <React.Fragment>
      <FormControl onBlur={onBlur}>
        <TextField onFocus={onTextAreaChange} />
        {state.menuOpen && (
          <Paper>
            <MenuList>
              {menuValues.map((value) => (
                <MenuItem key={value.id} value={value.id}>
                  {value.label}
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        )}
      </FormControl>
    </React.Fragment>
  );
}

export function AddMultiEntry(props) {
  const [state, setState] = useState([]);
  const [components, setComponentState] = useState({});

  function setUpperCheck(values) {
    const { id, componentID, error, required_check } = values;
    setComponentState((prevState) => ({
      ...prevState,
      [id]: { componentID, error, required_check },
    }));
  }

  function onClickAdd(e) {
    const values = [...state];
    const id = uuidv4();
    const value_to_insert = { id };

    values.push(value_to_insert);
    setState([...values]);
  }

  function onClickRemove(id, e) {
    var values = [...state];
    values = values.filter((value) => value.id !== id);
    setState([...values]);

    if (id in components) {
      const component = components[id];

      if (component.error) {
        console.log("error change:", props.id);
        props.setError(component.componentID);
      }
      if (component.required_check) {
        console.log("require check change:", props.id);
        props.setRequiredCheck(component.componentID);
      }
    }
  }

  function onChange(index, e) {
    var { value, name } = e;
    var values = [...state];
    values[index][name] = value;
    setState([...values]);
    props.onChange({ name: props.id, value: values });
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography variant="h6" color="secondary">
          {props.label.toUpperCase()} :
        </Typography>
      </Grid>

      {state.map((row, index) => (
        <React.Fragment key={row.id}>
          <Grid item>
            <Typography color="primary">
              {props.subLabelPrefix} {index + 1}:
            </Typography>
          </Grid>
          <Grid item>
            <Form
              setError={props.setError}
              setUpperCheck={setUpperCheck}
              onChange={onChange.bind(this, index)}
              id={row.id}
              columns={props.subcolumns}
              setRequiredCheck={props.setRequiredCheck}
            />
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              onClick={onClickRemove.bind(this, row.id)}
            >
              Remove
            </Button>
          </Grid>
        </React.Fragment>
      ))}

      <Grid item>
        <Button variant="contained" color="primary" onClick={onClickAdd}>
          Add A Entry
        </Button>
      </Grid>
    </Grid>
  );
}

export function Form(props) {
  const [state, setState] = useState({ componentID: Date.now() });
  const [checker, setChecker] = useState({
    error: 0,
    required_check: 0,
    req_update: null,
    error_update: null,
  });

  function setUpperCheck() {
    props.setUpperCheck({
      id: props.id,
      componentID: state.componentID,
      error: checker.error,
      required_check: checker.required_check,
    });
  }

  function setRequiredCheck(subComponentID) {
    setChecker((prevState) => {
      const required_check = prevState.required_check ^ subComponentID;
      var req_update = null ? false : prevState.req_update;
      if (required_check === 0 || prevState.required_check === 0)
        req_update = !req_update;

      return { ...prevState, required_check, req_update };
    });
  }

  useEffect(() => {
    if (checker.req_update !== null) {
      props.setRequiredCheck(state.componentID);
      setUpperCheck();
    }
  }, [checker.req_update]);

  function setError(subComponentID) {
    setChecker((prevState) => {
      const error = prevState.error ^ subComponentID;
      var error_update = null ? false : prevState.error_update;
      if (error === 0 || prevState.error === 0) error_update = !error_update;

      return { ...prevState, error, error_update };
    });
  }

  useEffect(() => {
    if (checker.error_update !== null) {
      props.setError(state.componentID);
      setUpperCheck();
    }
  }, [checker.error_update]);

  function onTextAreaChange(e) {
    const { name, value } = e;
    setState((prevState) => ({ ...prevState, [name]: value }));
    props.onChange({ name, value });
  }

  return (
    <Grid container spacing={2} direction="column">
      {props.columns.map((column, index) => (
        <Grid key={index} spacing={3} item container>
          {column.map((subcol) => (
            <Grid
              key={subcol.id}
              item
              xs={subcol.gridProp.xs}
              style={{ minWidth: 150 }}
            >
              <EntryMapComp
                setError={setError}
                setRequiredCheck={setRequiredCheck}
                {...subcol}
                onTextAreaChange={onTextAreaChange}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}

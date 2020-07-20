import React, { useState, useEffect } from "react";
import {
  FLOAT,
  INT,
  STRING,
  DATE,
  SELECT,
  AUTOCOMPLETE,
  MULTIENTRY,
  LABEL
} from "../CompType";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography
} from "@material-ui/core";

const dataFormatter = {
  int: value => (value === "" ? 0 : parseInt(value)),
  float: value => (value === "" ? 0 : parseFloat(value))
};

const startDate = Date.now();

const dataTypeErrorChecking = {
  int: value => isNaN(value) || Number(value) % 1 !== 0,
  float: value => isNaN(value)
};

function AddSingleEntry(props) {
  var [mm, dd, yy] = new Date()
    .toLocaleDateString()
    .split("/")
    .map(value => (value.length === 1 ? `0${value}` : value));
  const todayDate = `${yy}-${mm}-${dd}`;

  const [state, setState] = useState({
    value: getInitialValue(props),
    error: false,
    required_check: false,
    componentID: Date.now() - startDate
  });

  var [__init, setInit] = useState(true);

  function requiredCheck(value) {
    var required_check = false;
    if (props.isRequired !== undefined && props.isRequired && value === "") {
      required_check = true;
    }
    return required_check;
  }

  useEffect(() => {
    var value = getInitialValue(props);
    onTextAreaChange(props.type, { target: { value, name: props.id } });
  }, []);

  function getInitialValue(props) {
    var value = props.defaultValue;
    if (!value) {
      switch (props.type) {
        case STRING:
          value = "";
          break;
        case INT:
          value = 0;
          break;
        case FLOAT:
          value = 0;
          break;
        case DATE:
          value = todayDate;
          break;
        case SELECT:
          value = props.list[0].id;
          break;

        default:
          value = 0;
      }
    }
    return value;
  }

  function onTextAreaChange(type, e) {
    var { value, name } = e.target;

    const error = __init ? false : errorChecker(type, value);
    var required_check = requiredCheck(value);

    if (__init) setInit(false);
    if (!error && dataFormatter[type]) {
      value = dataFormatter[type](value);
    }

    if (required_check !== state.required_check) {
      console.log("required check change:", props.id);
      props.setRequiredCheck(state.componentID);
    }

    if (state.error !== error) {
      props.setError(state.componentID);
    }
    setState({ ...state, value, error, required_check });
    props.onTextAreaChange({ name, value });
  }

  function errorChecker(type, value) {
    const isError = dataTypeErrorChecking[type]
      ? dataTypeErrorChecking[type](value)
      : false;
    return isError;
  }

  switch (props.type) {
    case FLOAT:
    case INT:
    case STRING:
      return (
        <TextField
          name={props.id}
          label={`${props.label} ${props.isRequired ? "*" : ""}`}
          error={state.error}
          placeholder={`${state.value}`}
          fullWidth
          onChange={onTextAreaChange.bind(this, props.type)}
        />
      );

    case SELECT:
      return (
        <FormControl fullWidth>
          <InputLabel>{props.label}</InputLabel>
          <Select
            name={props.id}
            value={state.value}
            onChange={onTextAreaChange.bind(this, props.type)}
          >
            {props.list.map(listItem => (
              <MenuItem key={listItem.id} value={listItem.id}>
                {listItem.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case DATE:
      return (
        <TextField
          name={props.id}
          label={props.label}
          value={state.value}
          onChange={onTextAreaChange.bind(this, props.type)}
          fullWidth
          type="date"
        />
      );
  }
}
export default AddSingleEntry;

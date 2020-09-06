import {
  FormControl,
  Paper,
  MenuItem,
  MenuList,
  TextField,
  List,
  Popover,
  Typography,
  Menu,
  Grow,
  Zoom
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

import React, { useState, useEffect, useRef } from "react";

export default function CustomAutoComplete(props) {
  const menuValues = [
    { id: "value1", label: "Value 1" },
    { id: "value2", label: "Value 2" },
    { id: "value3", label: "Value 3" },
    { id: "value4", label: "Value 4" }
  ];
  const defaultProps = {
    options: props.autoSelectOptions ? props.autoSelectOptions : menuValues,
    getOptionLabel: option => option.label
  };

  const [state, setState] = useState({
    selectedValue: ""
  });

  function onTextAreaChange(e) {
    // console.log(result);
    // console.log(textInput.current.value);
  }
  return (
    <React.Fragment>
      {
        // <FormControl ref={textInput}>
        //   // <TextField onChange={onTextAreaChange} />
        //   //{" "}
        // </FormControl>
      }
      <Autocomplete
        {...defaultProps}
        id="clear-on-escape"
        clearOnEscape
        renderInput={params => <TextField {...params} label={props.label} />}
      />
      {
        // <Zoom in={state.menuOpen}>
        //   <MenuList variant="menu">
        //     {menuValues.map(value => (
        //       <MenuItem key={value.id} value={value.id}>
        //         {value.label}
        //       </MenuItem>
        //     ))}
        //   </MenuList>
        // </Zoom>
      }
    </React.Fragment>
  );
}

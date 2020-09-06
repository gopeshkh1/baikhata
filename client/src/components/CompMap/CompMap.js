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
} from "./CompType";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography
} from "@material-ui/core";

import {
  AddMultiEntry,
  AutoComplete,
  Label,
  AddSingleEntry
} from "./CstmComp/CstmComp";

function EntryMapComp(props) {
  switch (props.type) {
    case FLOAT:
    case INT:
    case STRING:
    case SELECT:
    case DATE:
      return <AddSingleEntry {...props} />;

    case MULTIENTRY:
      return <AddMultiEntry {...props} onChange={props.onTextAreaChange} />;

    case LABEL:
      return <Label {...props} />;

    case AUTOCOMPLETE:
      return <AutoComplete {...props} />;

    default:
      return <div></div>;
  }
}

export default EntryMapComp;

import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import CompMap from "../CompMap";

export default function Form(props) {
  const [state, setState] = useState({ componentID: Date.now() });
  const [checker, setChecker] = useState({
    error: 0,
    required_check: 0,
    req_update: null,
    error_update: null
  });

  function setUpperCheck() {
    props.setUpperCheck({
      id: props.id,
      componentID: state.componentID,
      error: checker.error,
      required_check: checker.required_check
    });
  }

  function setRequiredCheck(subComponentID) {
    setChecker(prevState => {
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
    setChecker(prevState => {
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
    setState(prevState => ({ ...prevState, [name]: value }));
    props.onChange({ name, value });
  }

  return (
    <Grid container spacing={2} direction="column">
      {props.columns.map((column, index) => (
        <Grid key={index} spacing={3} item container>
          {column.map(subcol => (
            <Grid
              key={subcol.id}
              item
              xs={subcol.gridProp.xs}
              style={{ minWidth: 150 }}
            >
              <CompMap
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

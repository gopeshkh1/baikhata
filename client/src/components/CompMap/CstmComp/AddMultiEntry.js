import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
// import { v4 as uuidv4 } from "uuid";
import Form from "./Form";

export default function AddMultiEntry(props) {
  const [state, setState] = useState([]);
  const [components, setComponentState] = useState({});

  function setUpperCheck(values) {
    const { id, componentID, error, required_check } = values;
    setComponentState(prevState => ({
      ...prevState,
      [id]: { componentID, error, required_check }
    }));
  }

  function onClickAdd(e) {
    const values = [...state];
    // const id = uuidv4();
    const id = Date.now();
    const value_to_insert = { id };

    values.push(value_to_insert);
    setState([...values]);
  }

  function onClickRemove(id, e) {
    var values = [...state];
    values = values.filter(value => value.id !== id);
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
  }

  useEffect(() => {
    props.onChange({ name: props.id, value: state });
  }, [state]);

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

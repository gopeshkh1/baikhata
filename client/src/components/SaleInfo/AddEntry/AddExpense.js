import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography, Grid } from "@material-ui/core";

import PropTypes from "prop-types";
const TYPE = "other_expenses";

const dataFormatter = {
  int: (value) => (value === "" ? 0 : parseInt(value)),
};

const dataTypeErrorChecking = {
  int: (value) => isNaN(value) || Number(value) % 1 !== 0,
};

export default function AddExpense(props) {
  const { index, id } = props;
  const [state, setState] = React.useState({
    expense_type: "",
    expense_amt: 0,
  });

  const [errorFields, setErrorField] = React.useState({
    expense_amt: false,
  });

  function onTextAreaChange(e) {
    const values = { ...state };
    const name = e.target.name;

    let value = e.target.value;
    if (name === "expense_amt") {
      if (dataTypeErrorChecking["int"](value)) {
        setErrorField({ [name]: true });
        return;
      }
      setErrorField({ [name]: false });
      value = dataFormatter["int"](value);
      const prevTotalValue = values["expense_amt"];
      const newTotalValue = value;
      props.updateTotal(prevTotalValue, newTotalValue);
    }
    values[e.target.name] = value;

    props.onChange({
      type: TYPE,
      index,
      value: { id, ...values },
    });

    setState({ ...values });
  }

  function onRemoveClick() {
    let total = state["expense_amt"];
    props.updateTotal(total, 0);
    props.onRemoveClick({ type: TYPE, id, total });
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Typography color="primary">Expense {index + 1}:</Typography>
        </Grid>

        <Grid item container>
          <Grid item xs={4}>
            <TextField
              name="expense_type"
              label="Expense Type"
              onChange={onTextAreaChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="expense_amt"
              label="Expense amount"
              onChange={onTextAreaChange}
              error={errorFields["expense_amt"]}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              color="secondary"
              variant="contained"
              onClick={onRemoveClick}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

AddExpense.propType = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  updateTotal: PropTypes.func.isRequired,
};

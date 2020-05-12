import React from "react";
import { Button, TextField, Typography, Grid } from "@material-ui/core";

import PropTypes from "prop-types";

const TYPE = "products";

const dataType = {
  quantity: "int",
  quintals: "float",
  rate: "int",
};

const dataFormatter = {
  int: (value) => (value === "" ? 0 : parseInt(value)),
  float: (value) => (value === "" ? 0 : parseFloat(value)),
};

const dataTypeErrorChecking = {
  int: (value) => isNaN(value) || Number(value) % 1 !== 0,
  float: (value) => isNaN(value),
};

export default function AddProduct(props) {
  const { index, id } = props;
  const [state, setState] = React.useState({
    product_type: "",
    product_name: "",
    quantity: 0,
    rate: 0,
    quintals: 0,
  });

  const [errorFields, setErrorField] = React.useState({
    quantity: false,
    rate: false,
    quintals: false,
  });

  function onTextAreaChange(e) {
    const values = { ...state };
    const name = e.target.name;
    const prevTotalValue = values["rate"] * values["quintals"];

    let value = e.target.value;
    const data_type = dataType[name];

    if (data_type === undefined || !dataTypeErrorChecking[data_type](value)) {
      if (data_type !== undefined)
        setErrorField({ ...errorFields, [name]: false });

      value = data_type ? dataFormatter[data_type](value) : value;
      values[e.target.name] = value;

      const newTotalValue = values["rate"] * values["quintals"];
      if (name === "quintals" || name === "rate") {
        props.updateTotal(prevTotalValue, newTotalValue);
      }

      props.onChange({
        type: TYPE,
        index,
        value: { id, ...values },
      });

      setState({ ...values });
    } else {
      setErrorField({ ...errorFields, [name]: true });
    }
  }

  function onRemoveClick() {
    let total = state["rate"] * state["quintals"];
    props.updateTotal(total, 0);
    props.onRemoveClick({ type: TYPE, id, total });
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Typography color="primary">Product {index + 1}:</Typography>
        </Grid>

        <Grid item container>
          <Grid item xs={4}>
            <TextField
              name="product_type"
              label="Product Type"
              onChange={onTextAreaChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="product_name"
              label="Product Name"
              onChange={onTextAreaChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="quantity"
              label="Quantity(katti)"
              error={errorFields["quantity"]}
              onChange={onTextAreaChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="quintals"
              label="Quintals"
              error={errorFields["quintals"]}
              onChange={onTextAreaChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="rate"
              label="Rate(per quintal)"
              error={errorFields["rate"]}
              onChange={onTextAreaChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="total"
              label="Rate*quintal"
              disabled
              value={state["rate"] * state["quintals"]}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Button color="secondary" variant="contained" onClick={onRemoveClick}>
            Remove
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

AddProduct.propType = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  updateTotal: PropTypes.func.isRequired,
};

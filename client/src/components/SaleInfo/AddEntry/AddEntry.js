import React from "react";
import { addSaleEntry } from "../../../redux/actions/sales";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Input,
  Grid,
} from "@material-ui/core";

import AddProduct from "./AddProduct";
import AddExpense from "./AddExpense";
import { v4 as uuidv4 } from "uuid";
import PropType from "prop-types";

function AddEntry(props) {
  var [mm, dd, yy] = new Date()
    .toLocaleDateString()
    .split("/")
    .map((value) => (value.length === 1 ? `0${value}` : value));
  const todayDate = `${yy}-${mm}-${dd}`;
  console.log(todayDate);

  const [state, setState] = React.useState({
    bill_no: "",
    date_of_purchase: todayDate,
    dealer_name: "",
    products: [],
    other_expenses: [],
    total: 0,
    entrytype: "sell",
  });

  function textAreaChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setState({ ...state, [name]: value });
  }

  function onAddMultipleButtonClick(e) {
    const name = e.currentTarget.name;
    const values = state;
    const id = uuidv4();
    const value_to_insert = { id };

    values[name].push(value_to_insert);
    setState({ ...values });
  }

  function onMultiTextAreaChange({ type, index, value }) {
    const values = [...state[type]];
    values[index] = value;
    setState({ ...state, [type]: values });
  }

  function onMultiRemoveClick({ type, id }) {
    let values = [...state[type]];
    values = values.filter((value) => value.id !== id);
    setState({ ...state, [type]: values });
  }

  function onAddClick() {
    const data = { ...state };
    props.addSaleEntry(data);
    props.onClose();
  }

  function updateTotal(prevTotalValue, newTotalValue) {
    state["total"] = state["total"] - prevTotalValue + newTotalValue;
    setState({ ...state });
  }

  return (
    <Dialog maxWidth="md" open={true} onClose={props.onClose}>
      <DialogContent>
        <Grid container spacing={2} direction="column">
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Select Entry type</InputLabel>
              <Select
                name="entrytype"
                value={state.entrytype}
                onChange={textAreaChange}
              >
                <MenuItem value={"sell"}>Sell</MenuItem>
                <MenuItem value={"buy"}>Buy</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {state.entrytype === "buy" && (
            <Grid item xs={4} container>
              <TextField
                name="incoming_date"
                label="Incoming date"
                defaultValue={todayDate}
                fullWidth
                type="date"
              />
            </Grid>
          )}

          <Grid item xs={4} container>
            <TextField
              name="dealer_name"
              fullWidth
              label="Dealer Name"
              fullWidth
            />
          </Grid>

          <Grid item container spacing={3}>
            <Grid item xs={4}>
              <TextField
                name="bill_no"
                label="Bill No"
                fullWidth
                onChange={textAreaChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="date_of_purchase"
                label="Date of purchase"
                type="date"
                fullWidth
                defaultValue={state["date_of_purchase"]}
                onChange={textAreaChange}
              />
            </Grid>
          </Grid>

          {/*---------Adding products---------*/}
          <Grid item>
            <Typography variant="h6" color="secondary">
              PRODUCTS:
            </Typography>
          </Grid>
          <Grid item container spacing={3}>
            {state.products.map(({ id, ...values }, index) => (
              <Grid item container key={id}>
                <AddProduct
                  index={index}
                  id={id}
                  values={{ ...values }}
                  onChange={onMultiTextAreaChange}
                  onRemoveClick={onMultiRemoveClick}
                  updateTotal={updateTotal}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              name="products"
              onClick={onAddMultipleButtonClick}
            >
              Add a Product
            </Button>
          </Grid>

          {/*-------------Adding expenses------------ */}

          <Grid item>
            <Typography variant="h6" color="secondary">
              OTHER EXPENSES:
            </Typography>
          </Grid>

          <Grid item container spacing={3}>
            {state.other_expenses.map(({ id, ...values }, index) => (
              <Grid item container key={id}>
                <AddExpense
                  index={index}
                  id={id}
                  values={{ ...values }}
                  onChange={onMultiTextAreaChange}
                  onRemoveClick={onMultiRemoveClick}
                  updateTotal={updateTotal}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              name="other_expenses"
              onClick={onAddMultipleButtonClick}
            >
              Add Expense:
            </Button>
          </Grid>

          {/*-------------Total value---------- */}

          <Grid item>
            <TextField
              name="total"
              label="Total"
              disabled
              value={state.total}
            />
          </Grid>
          <Grid item>
            <TextField
              name="amt_paid"
              label="Amount Paid"
              onChange={textAreaChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={onAddClick}>Add the entry</Button>
      </DialogActions>
    </Dialog>
  );
}

AddEntry.propType = {
  addSaleEntry: PropType.func,
};

const mapDispatchToProps = {
  addSaleEntry,
};

export default connect(null, mapDispatchToProps)(AddEntry);

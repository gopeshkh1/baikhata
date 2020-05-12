import React, { useState } from "react";
import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  Grid,
  Box,
  IconButton,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { EditOutlined, SaveOutlined, CancelOutlined } from "@material-ui/icons";
import { connect } from "react-redux";
import { editSaleEntry } from "../../../redux/actions/sales";

const columns = [
  { id: "date_of_purchase", label: "Date of Purchase", type: "date" },
  {
    id: "products",
    label: "Products",
    subcolumns: [
      { id: "product_type", label: "Type", type: "text" },
      { id: "product_name", label: "Name", type: "text" },
      { id: "quantity", label: "Katti", type: "text" },
      { id: "quintals", label: "Quintals", type: "text" },
      { id: "rate", label: "Rate", type: "text" },
    ],
  },
  {
    id: "other_expenses",
    label: "Other expenses",
    subcolumns: [
      { id: "expense_type", label: "Type" },
      { id: "expense_amt", label: "Amount" },
    ],
  },
  { id: "total", label: "Total" },
  { id: "amt_paid", label: "Amount Paid" },
];

function DisplayCard(props) {
  const { row } = props;

  const classes = makeStyles((theme) => ({
    root: {
      display: "grid",
      gridGap: 5,
    },
  }))();

  function onEdit(values, newValue) {
    props.editSaleEntry({ ...values, newValue });
  }

  return (
    <>
      <Card>
        <CardHeader
          style={{ backgroundColor: "rgb(66, 122, 116, 0.8)", color: "white" }}
          title={`Dealer Name :${row.dealer_name}`}
          subheader={
            <Typography color="textPrimary">
              Bill Number : {row.bill_no}
            </Typography>
          }
        />
        <CardContent className={classes.root}>
          {columns.map(({ id: colId, label: colLabel, subcolumns, type }) =>
            subcolumns === undefined ? (
              <KeyValueText
                key={colId}
                label={colLabel}
                value={row[colId]}
                onEdit={onEdit.bind(this, {
                  subRowId: null,
                  subColId: null,
                  colId,
                  rowId: row.id,
                })}
                type={type}
                color="primary"
                editable
              />
            ) : (
              <React.Fragment key={colId}>
                <Typography color="primary" variant="h6">
                  {colLabel}
                </Typography>
                {row[colId].map((subRow, index) => (
                  <Box key={subRow.id} ml={3}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography color="secondary">
                          {colId === "products" ? "Product" : "Expense"}{" "}
                          {index + 1}:
                        </Typography>
                      </Grid>
                      <Grid container item xs={10}>
                        {subcolumns.map(
                          ({ id: subColId, label: subColLabel, type }) => (
                            <Grid key={subColId} item xs={4}>
                              <KeyValueText
                                label={subColLabel}
                                value={subRow[subColId]}
                                color="secondary"
                                type={type}
                                onEdit={onEdit.bind(this, {
                                  subRowId: subRow.id,
                                  subColId,
                                  colId,
                                  rowId: row.id,
                                })}
                                editable
                              />
                            </Grid>
                          )
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </React.Fragment>
            )
          )}
        </CardContent>
      </Card>
    </>
  );
}

function KeyValueText(props) {
  const { label, value } = props;

  const classes = makeStyles({
    root: {
      display: "flex",
      flexDirection: "row",
    },
    header: {
      color: (props) => (props.color === "primary" ? "blue" : "brown"),
    },
    body: {
      padding: (props) => (props.color === "primary" ? 5 : 1),
    },
    hiddenButton: {
      display: "inline",
      "&:hover": {
        color: "black",
      },
      color: "white",
    },
  })(props);

  const [state, setState] = useState({
    editOpen: false,
    newValue: value,
  });

  function toggleEdit() {
    setState({ ...state, editOpen: !state.editOpen });
  }

  function onTextAreaChange(e) {
    setState({ ...state, newValue: e.target.value });
  }

  function onSave() {
    props.onEdit(state["newValue"]);
    toggleEdit();
  }

  return (
    <div className={classes.root}>
      <Typography
        className={classes.header}
        variant={props.color === "secondary" ? "body1" : "h6"}
      >
        {label}:
      </Typography>
      {state.editOpen ? (
        <>
          <TextField
            type={props.type}
            onChange={onTextAreaChange}
            defaultValue={state["newValue"]}
          />
          <IconButton onClick={onSave} size="small">
            <SaveOutlined />
          </IconButton>
          <IconButton onClick={toggleEdit} size="small">
            <CancelOutlined />
          </IconButton>
        </>
      ) : (
        <>
          <Typography className={classes.body}>
            {props.type === "date" ? new Date(value).toDateString() : value}{" "}
          </Typography>{" "}
          {props.editable && (
            <IconButton
              onClick={toggleEdit}
              size="small"
              className={classes.hiddenButton}
            >
              <EditOutlined />
            </IconButton>
          )}
        </>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  editSaleEntry,
};
export default connect(null, mapDispatchToProps)(DisplayCard);

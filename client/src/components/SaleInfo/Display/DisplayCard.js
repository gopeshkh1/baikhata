import React, { useState } from "react";
import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  Grid,
  Box,
  Button,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { editSaleEntry } from "../../../redux/actions/sales";
import { rows } from "./DisplayMap";
import EditableLabel from "../../CompMap/CstmComp/EditableLabel";
import { MULTIENTRY } from "../../CompMap/CompType";
import { ExpandMore, ExpandLess, AddCircleOutline } from "@material-ui/icons";

function DisplayCard(props) {
  const { row: valueRow } = props;

  const [expand, setExpand] = useState({});

  const classes = makeStyles((theme) => ({
    root: {
      display: "grid",
      gridGap: 5,
    },
    hiddenButton: {
      display: "inline",
      "&:hover": {
        color: "black",
      },
      color: "white",
    },
  }))();

  function expandClick(elementId) {
    setExpand((prevState) => {
      var value = true;
      if (elementId in prevState) {
        value = !prevState[elementId];
      }

      return { ...prevState, [elementId]: value };
    });
  }

  function onEdit(values, newValue) {
    props.editSaleEntry({ ...values, newValue });
  }

  return (
    <>
      <Card>
        <CardHeader
          style={{ backgroundColor: "rgb(66, 122, 116, 0.8)", color: "white" }}
          title={`Dealer Name :${valueRow.dealer_name}`}
          subheader={
            <Typography color="textPrimary">
              Bill Number : {valueRow.bill_no}
            </Typography>
          }
        />
        <CardContent className={classes.root}>
          <Grid container spacing={2} direction="column">
            {rows.map((row, rowIndex) => (
              <Grid key={rowIndex} spacing={3} item container>
                {row.map((column) => (
                  <Grid key={column.id} item xs={column.gridProp.xs}>
                    {column.type !== MULTIENTRY ? (
                      <EditableLabel
                        value={valueRow[column.id]}
                        onEdit={onEdit.bind(this, {
                          subRowId: null,
                          subColId: null,
                          colId: column.id,
                          rowId: valueRow.id,
                        })}
                        columnProp={{ ...column }}
                        color="primary"
                      />
                    ) : (
                      <>
                        <Grid container item>
                          <Grid item>
                            <Typography color="primary" variant="h6">
                              {column.label}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <IconButton
                              onClick={expandClick.bind(this, column.id)}
                              size="small"
                            >
                              {expand[column.id] ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </IconButton>
                            <IconButton
                              className={classes.hiddenButton}
                              size="small"
                              columns={column.subcolumns}
                            >
                              <AddCircleOutline />
                            </IconButton>
                          </Grid>
                        </Grid>

                        {expand[column.id] &&
                          valueRow[column.id].map(
                            (subValRow, subValRowIndex) => (
                              <Box key={subValRowIndex} ml={3}>
                                <Grid container>
                                  <Grid item xs={1}>
                                    <Typography color="secondary">
                                      {column.subLabelPrefix}
                                      {subValRowIndex + 1}:
                                    </Typography>
                                  </Grid>
                                  <Grid container item xs={11}>
                                    {column.subcolumns.map((subColRow) =>
                                      subColRow.map((subcolumn) => (
                                        <Grid
                                          key={subcolumn.id}
                                          item
                                          {...subcolumn.gridProp}
                                        >
                                          <EditableLabel
                                            value={subValRow[subcolumn.id]}
                                            color="secondary"
                                            columnProp={{ ...subcolumn }}
                                            onEdit={onEdit.bind(this, {
                                              subRowId: subValRow.id,
                                              subColId: subcolumn.id,
                                              colId: column.id,
                                              rowId: valueRow.id,
                                            })}
                                          />
                                        </Grid>
                                      ))
                                    )}
                                  </Grid>
                                </Grid>
                              </Box>
                            )
                          )}
                      </>
                    )}
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

const mapDispatchToProps = {
  editSaleEntry,
};
export default connect(null, mapDispatchToProps)(DisplayCard);

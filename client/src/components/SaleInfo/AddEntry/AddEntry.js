import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
  Button
} from "@material-ui/core";
import { rows } from "./EntryMap";
import EntryMapComp from "../../CompMap/CompMap";
import { addSaleEntry } from "../../../redux/actions/sales";
import { changeFormData, clearFormData } from "../../../redux/actions/formdata";
import { connect } from "react-redux";
import axios from "axios";

function AddEntry(props) {
  const [state, setState] = useState({
    id: Date.now(),
    loaded: false
  });
  const [error, changeError] = useState(0);
  const [required_check, changeRequiredCheck] = useState(0);

  function onAddClick() {
    // const data = { ...state };
    const data = { id: Date.now(), ...props.formdata };
    props.addSaleEntry(data);
    props.clearFormData();
    props.onClose();
  }

  useEffect(() => {
    fetchRecentStocks();
  }, []);

  const fetchRecentStocks = () => {
    axios.get("/api/stocks/getRecentStock").then(result => {
      const recentStocks = result.data;
      const autoSelectOptions = Object.keys(recentStocks).map(key => {
        const product = key.split("+++");
        return { id: key, label: `Product:${product[0]}, Rate: ${product[1]}` };
      });
      const newRows = addRecentStocksToCol({
        autoSelectOptions,
        recentStocks
      });
      setState(state => ({ ...state, rows: newRows, loaded: true }));
      console.log(newRows);
      // props.changeFormData({ name: "recentStocks", value: result.data });
    });
  };

  const addRecentStocksToCol = ({ autoSelectOptions, recentStocks }) => {
    const newRows = rows.map(row =>
      row.map(column => {
        if (column.id === "products") {
          column.subcolumns = column.subcolumns.map(subrow =>
            subrow.map(subcol => {
              if (subcol.id === "product_name") {
                subcol = { ...subcol, autoSelectOptions };
              }
              if (subcol.id === "quintals") {
                subcol = { ...subcol, recentStocks };
              }
              // console.log(subcol);
              return subcol;
            })
          );
        }
        return column;
      })
    );
    return newRows;
  };

  function setError(componentID) {
    changeError(state => state ^ componentID);
  }

  function setRequiredCheck(componentID) {
    changeRequiredCheck(state => state ^ componentID);
  }

  function onTextAreaChange(e) {
    setState(state => ({ ...state, [e.name]: e.value }));
  }

  return (
    <Dialog maxWidth="md" open={true} onClose={props.onClose}>
      <DialogContent>
        <Grid container spacing={2} direction="column">
          {/*state.rows &&
            (() => {
              console.log(state.rows);
            })()*/}
          {state.rows &&
            state.rows.map((row, index) => (
              <Grid key={index} spacing={3} item container>
                {row.map(column => {
                  // console.log(column.gridProp);
                  const { visibleOn } = column;
                  if (visibleOn && state[visibleOn.id] !== visibleOn.value) {
                    return null;
                  } else {
                    return (
                      <Grid key={column.id} item xs={column.gridProp.xs}>
                        <EntryMapComp
                          {...column}
                          setError={setError}
                          setRequiredCheck={setRequiredCheck}
                          onTextAreaChange={props.changeFormData}
                        />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            ))}
        </Grid>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "beige" }}>
        <Button onClick={props.onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={onAddClick}
          disabled={error !== 0 || required_check !== 0}
          color="primary"
        >
          Add the entry
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  formdata: state.formdata
});

const mapDispatchToProps = {
  addSaleEntry,
  changeFormData,
  clearFormData
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);

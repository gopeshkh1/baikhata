import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
  Button
} from "@material-ui/core";
import { columns } from "./EntryMap";
import EntryMapComp from "../../CompMap/CompMap";
import { addSaleEntry } from "../../../redux/actions/sales";
import { changeFormData, clearFormData } from "../../../redux/actions/formdata";
import { connect } from "react-redux";

function AddEntry(props) {
  const [state, setState] = useState({ id: Date.now() });
  const [error, changeError] = useState(0);
  const [required_check, changeRequiredCheck] = useState(0);

  function onAddClick() {
    // const data = { ...state };
    const data = { id: Date.now(), ...props.formdata };
    props.addSaleEntry(data);
    props.clearFormData();
    props.onClose();
  }

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
          {columns.map((column, index) => (
            <Grid key={index} spacing={3} item container>
              {column.map(subcol => {
                const { visibleOn } = subcol;
                if (visibleOn && state[visibleOn.id] !== visibleOn.value) {
                  return null;
                } else {
                  return (
                    <Grid key={subcol.id} item xs={subcol.gridProp.xs}>
                      <EntryMapComp
                        {...subcol}
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

import React, { useState } from "react";
import { connect } from "react-redux";
import { Add } from "@material-ui/icons";

//testing

function StockTable() {
  const toggleDialog = () => {
    setState({ ...state, openAdd: !state.openAdd });
  };

  return (
    <div>
      <DisplayTable />
      <Fab
        variant="extended"
        color="primary"
        style={{ position: "fixed", right: 50, bottom: 50 }}
        onClick={toggleDialog}
      >
        <Add />
        Add Entry
      </Fab>
      {state.openAdd && <AddEntry onClose={toggleDialog} />}
    </div>
  );
}

const mapStateToProps = state => ({
  rows: state.stocks
});

export default connect(mapStateToProps, null)(StockTable);

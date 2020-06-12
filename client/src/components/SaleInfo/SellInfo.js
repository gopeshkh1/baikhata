import React, { useState } from "react";
import { Fab } from "@material-ui/core";
import AddEntry from "./AddEntry/AddEntry";
import DisplayTable from "./Display/DisplayTable";
import { Add } from "@material-ui/icons";

export default function SellInfo() {
  const [state, setState] = useState({
    openAdd: false,
  });

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

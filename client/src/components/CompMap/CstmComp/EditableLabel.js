import React, { useState } from "react";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { EditOutlined, SaveOutlined, CancelOutlined } from "@material-ui/icons";
import CompMap from "../CompMap";

export default function EditableLabel(props) {
  const { columnProp, value } = props;

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

  const [checker, setChecker] = useState({
    require_check: 0,
    error: 0,
  });

  function changeChecker(type, componentID) {
    setChecker({ ...checker, [type]: checker[type] ^ componentID });
  }

  const toggleEdit = () => {
    setState({ ...state, editOpen: !state.editOpen });
  };

  // function toggleEdit() {
  //   setState({ ...state, editOpen: !state.editOpen });
  // }

  function onTextAreaChange(e) {
    setState({ ...state, newValue: e.value });
  }

  function onSave() {
    props.onEdit(state.newValue);
    toggleEdit();
  }

  return (
    <div className={classes.root}>
      {state.editOpen ? (
        <>
          <CompMap
            {...columnProp}
            onTextAreaChange={onTextAreaChange}
            setError={changeChecker.bind(this, "error")}
            setRequireCheck={changeChecker.bind(this, "require_check")}
            defaultValue={state["newValue"]}
          />
          <IconButton
            onClick={onSave}
            disabled={checker.error !== 0 || checker.require_check !== 0}
            size="small"
          >
            <SaveOutlined />
          </IconButton>
          <IconButton onClick={toggleEdit} size="small">
            <CancelOutlined />
          </IconButton>
        </>
      ) : (
        <>
          <Typography
            className={classes.header}
            variant={props.color === "secondary" ? "body1" : "h6"}
          >
            {columnProp.label}:
          </Typography>
          <Typography className={classes.body}>
            {columnProp.type === "date"
              ? new Date(value).toDateString()
              : value}
          </Typography>{" "}
          {/* {columnProp.editable && ( */}
          <IconButton
            onClick={toggleEdit}
            size="small"
            className={classes.hiddenButton}
          >
            <EditOutlined />
          </IconButton>
          {/* )} */}
        </>
      )}
    </div>
  );
}

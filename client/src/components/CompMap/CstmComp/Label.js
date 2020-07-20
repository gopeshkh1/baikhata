import React, { useState, useEffect } from "react";
import { Typography, TextField } from "@material-ui/core";
import { changeFormData } from "../../../redux/actions/formdata";
import { connect } from "react-redux";

function Label(props) {
  const value = props.calculation(props.formdata);

  useEffect(() => {
    console.log(value);
    props.changeFormData({ name: props.id, value: value });
  }, [value]);

  return (
    <Typography component="div">
      <Typography display="inline" variant="h6" color="primary">
        {props.label}
      </Typography>
      :{value}
    </Typography>
  );
}

const mapStateToProps = state => ({
  formdata: state.formdata
});

const mapDispatchToProps = {
  changeFormData
};

export default connect(mapStateToProps, mapDispatchToProps)(Label);

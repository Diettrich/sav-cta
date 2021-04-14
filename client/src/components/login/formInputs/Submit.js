import React, { Component } from "react";
import Button from "@material-ui/core/Button";

const Submit = ({ title }) => {
  return (
    <Button type="submit" variant="contained" className="btn-primary">
      {title}
    </Button>
  );
};

export default Submit;

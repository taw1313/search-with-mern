import React from "react";

export const FormBtn = props => (
  <button {...props} type="button" className="btn btn-primary">
    {props.children}
  </button>
);

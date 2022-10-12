import React from "react";
import { Field, ErrorMessage } from "formik";
import _ from "lodash";

export const Input = ({ className, label, ...rest }) => {
  return (
    <div className={className}>
      <label htmlFor={_.camelCase(label)}>{label}</label>
      <Field id={_.camelCase(label)} name={_.camelCase(label)} />
      <ErrorMessage
        render={(msg) => <p className="errors">{msg}</p>}
        name={_.camelCase(label)}
      />
    </div>
  );
};

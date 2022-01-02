import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import Airtable from "airtable";

export const Signup = () => {
  const base = new Airtable({
    apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
  }).base(process.env.REACT_APP_AIRTABLE_BASE);
  const validate = Yup.object({
    Name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    // lastName: Yup.string()
    //   .max(20, "Must be 20 characters or less")
    //   .required("Required"),
    // Email: Yup.string().email("Email is invalid").required("Email is required"),
    // password: Yup.string()
    //   .min(6, "Password must be at least 6 charaters")
    //   .required("Password is required"),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Password must match")
    //   .required("Confirm password is required"),
  });

  const airtableFields = [];
  return (
    <Formik
      initialValues={{
        Name: "",
        Email: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
        airtableFields.push({ fields: values });
        console.log(airtableFields);

        base("Website Submissions").create(
          airtableFields,
          function (err, records) {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      }}
    >
      {(formik) => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
          <Form>
            <TextField label="First Name" name="Name" type="text" />
            {/* <TextField label="last Name" name="lastName" type="text" /> */}
            <TextField label="Email" name="Email" type="email" />
            {/* <TextField label="password" name="password" type="password" />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            /> */}
            <button className="btn btn-dark mt-3" type="submit">
              Register
            </button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">
              Reset
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

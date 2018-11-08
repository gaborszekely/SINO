import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

// REGULAR JSX FORMAT
// const Formik = ({ values, handleChange, handleSubmit }) => {

// FORMIK FORMAT
const Formik = ({ values, errors, touched, isSubmitting }) => {
  return (
    <div>
      <h2> Formik Form </h2>

      {/* FORMIK FORM ELEMENTS */}
      <Form>
        <div>
          {touched.email && errors.email && <p>{errors.email}</p>}
          <Field type="email" name="email" placeholder="Email..." />
        </div>
        <div>
          {touched.password && errors.password && <p>{errors.password}</p>}
          <Field type="password" name="password" placeholder="Password..." />
        </div>
        <br />
        <label>
          <Field
            type="checkbox"
            name="newsletter"
            checked={values.newsletter}
          />
          Join Our Newsletter!
        </label>
        <br />
        <Field component="select" name="edu_status">
          <option value="grad">Medical Graduate</option>
          <option value="md">M.D. Student</option>
          <option value="pa">Physician's Assistant</option>
          <option value="np">Nurse Practitioner</option>
        </Field>
        <br />
        <button disabled={isSubmitting} type="submit">
          Submit
        </button>
      </Form>

      {/* REGULAR JSX ELEMENTS */}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email..."
        />
        <br />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password..."
        />
        <br />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email not valid.")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
});

const FormikForm = withFormik({
  mapPropsToValues({ email, password, newsletter, edu_status }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || true,
      edu_status: edu_status || "grad"
    };
  },
  validationSchema,
  handleSubmit(values, { setErrors, resetForm, setSubmitting }) {
    // Simulate asynchronous request
    setTimeout(() => {
      if (values.email === "gabe@test.io") {
        setErrors({ email: "Email address is already taken!" });
        setSubmitting(false);
      } else {
        resetForm();
        setSubmitting(false);
        console.log(values);
      }
    }, 2000);
  }
})(Formik);

export default FormikForm;

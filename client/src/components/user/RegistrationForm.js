import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import Loader from "../Loader";

// FORMIK FORMAT
const Formik = ({ values, errors, touched, isSubmitting }) => {
  let isLoading = false;
  return (
    <div>
      <h2>Gegister User</h2>

      <Form>
        <div className="regRow">
          <Field
            type="email"
            name="email"
            className="regInput"
            placeholder="Email..."
          />
          {touched.email && errors.email && <span>{errors.email}</span>}
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
        <div className="regRow">
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
          {isLoading && errors.email && <Loader />}
        </div>
      </Form>
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

const RegistrationForm = withFormik({
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

export default RegistrationForm;

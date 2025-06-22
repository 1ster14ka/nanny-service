import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "../RegisterForm/RegisterForm.module.css";
import { IoMdClose } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import * as Yup from "yup";
import { useState } from "react";

const LoginForm = ({ onClose }) => {
  const [openEye, setOpenEye] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const FeedbackSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email!").required("Required"),
    password: Yup.string()
      .min(6, "Too Short")
      .max(20, "Too Long")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <div className="login">
      <div className={css.btnCloseModal}>
        <button className={css.svgClose} onClick={onClose}>
          <IoMdClose className={css.btnCloseIcon} />
        </button>
      </div>
      <div className={css.wrappRegistration}>
        <h2 className={css.titleRegistration}>Login</h2>
        <p className={css.subtitleRegistration}>
          Thank you for your interest in our platform! In order to login, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <Field
            type="email"
            name="email"
            className={css.inputModal}
            placeholder="Email"
          />
          <ErrorMessage
            name="email"
            component="div"
            className={css.errorMessage}
          />
          <div className={css.passwordWrapper}>
            <div className={css.test}>
              <Field
                type={openEye ? "text" : "password"}
                name="password"
                className={css.inputModal}
                placeholder="Password"
              />

              <button
                type="button"
                className={css.togglePassword}
                onClick={() => {
                  setOpenEye(!openEye);
                }}
              >
                {!openEye ? (
                  <FaRegEyeSlash className={css.eyeIcon} />
                ) : (
                  <FaRegEye className={css.eyeIcon} />
                )}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={css.errorMessage}
            />
          </div>
          <button type="submit" className={css.btnSubmit}>
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;

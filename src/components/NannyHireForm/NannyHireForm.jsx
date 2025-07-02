import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoMdClose } from "react-icons/io";
import css from "./NannyHireForm.module.css";

const validationSchema = Yup.object({
  address: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "Must be a valid Ukrainian phone (+380...)")
    .required("Required"),
  childAge: Yup.number()
    .min(0.1, "Too young")
    .max(18, "Too old")
    .required("Required"),
  time: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  parentName: Yup.string().required("Required"),
  comment: Yup.string().max(300, "Too long"),
  meetingTime: Yup.string().required("Select meeting time"),
});

const initialValues = {
  address: "",
  phone: "+380",
  childAge: "",
  time: "",
  email: "",
  parentName: "",
  comment: "",
  meetingTime: "",
};

const NannyHireForm = ({ naniesInfo, onClose }) => {
  const handleSubmit = (values, { resetForm }) => {
    console.log("Form values:", values);
    resetForm();
  };
  return (
    <div className={css.containerForm}>
      <button className={css.svgClose} onClick={onClose}>
        <IoMdClose className={css.btnCloseIcon} />
      </button>
      <h2 className={css.title}>Make an appointment with a babysister</h2>
      <h3 className={css.subtitle}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </h3>
      <div className={css.wrappNany}>
        <img src={naniesInfo[0]} alt={naniesInfo[1]} className={css.img} />
        <div>
          <p className={css.nany}>Nanny</p>
          <p className={css.nanyName}>{naniesInfo[1]}</p>
        </div>
      </div>
      <div className={css.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={css.form}>
              <div className={css.row}>
                <div className={css.fieldWrapper}>
                  <Field
                    name="address"
                    placeholder="Address"
                    className={css.formInput}
                  />

                  {touched.address && errors.address && (
                    <div className={css.error}>{errors.address}</div>
                  )}
                </div>
                <div className={css.fieldWrapper}>
                  <Field
                    name="phone"
                    placeholder="+380"
                    className={css.formInput}
                  />
                  {touched.phone && errors.phone && (
                    <div className={css.error}>{errors.phone}</div>
                  )}
                </div>
              </div>

              <div className={css.row}>
                <div className={css.fieldWrapper}>
                  <Field
                    name="childAge"
                    placeholder="Child's age"
                    className={css.formInput}
                  />
                  {touched.childAge && errors.childAge && (
                    <div className={css.error}>{errors.childAge}</div>
                  )}
                </div>
                <div className={css.fieldWrapper}>
                  <Field
                    name="time"
                    placeholder="00:00"
                    className={css.formInput}
                  />
                  {touched.time && errors.time && (
                    <div className={css.error}>{errors.time}</div>
                  )}
                </div>
              </div>

              <Field
                name="email"
                placeholder="Email"
                className={css.fullWidth}
              />
              {touched.email && errors.email && (
                <div className={css.error}>{errors.email}</div>
              )}

              <Field
                name="parentName"
                placeholder="Father's or mother's name"
                className={css.fullWidth}
              />
              {touched.parentName && errors.parentName && (
                <div className={css.error}>{errors.parentName}</div>
              )}

              <Field
                name="comment"
                as="textarea"
                placeholder="Comment"
                className={css.comment}
              />
              {touched.comment && errors.comment && (
                <div className={css.error}>{errors.comment}</div>
              )}

              <button type="submit" className={css.submitBtn}>
                Send Request
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NannyHireForm;

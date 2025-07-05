import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoMdClose } from "react-icons/io";
import css from "./NannyHireForm.module.css";
import { useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { toast } from "react-toastify";

const timeOptions = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

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
});

const initialValues = {
  address: "",
  phone: "+380",
  childAge: "",
  time: "",
  email: "",
  parentName: "",
  comment: "",
};

const NannyHireForm = ({ naniesInfo = [], onClose }) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const handleSubmit = (values, { resetForm }) => {
    toast.success(
      `Appointment with ${naniesInfo[1] || "nanny"} at ${
        values.time
      } confirmed!`
    );
    resetForm();
    onClose();
  };

  const hasNannyInfo = naniesInfo && naniesInfo.length >= 2;
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
      {hasNannyInfo && (
        <div className={css.wrappNany}>
          <img src={naniesInfo[0]} alt={naniesInfo[1]} className={css.img} />
          <div>
            <p className={css.nany}>Nanny</p>
            <p className={css.nanyName}>{naniesInfo[1]}</p>
          </div>
        </div>
      )}
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
                  <Field name="time">
                    {({ field, form }) => (
                      <div className={css.customTimePicker}>
                        <input
                          type="text"
                          placeholder="00:00"
                          value={selectedTime || field.value}
                          readOnly
                          onClick={() => setShowTimePicker(!showTimePicker)}
                          className={css.formInput}
                        />
                        <MdOutlineWatchLater className={css.watchIcon} />
                        {showTimePicker && (
                          <div className={css.timeDropdown}>
                            <p className={css.timeTitle}>Meeting time</p>
                            <ul className={css.timeList}>
                              {timeOptions.map((time) => (
                                <li
                                  key={time}
                                  className={css.timeItem}
                                  onClick={() => {
                                    form.setFieldValue("time", time);
                                    setSelectedTime(time);
                                    setShowTimePicker(false);
                                  }}
                                >
                                  {time}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
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
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NannyHireForm;

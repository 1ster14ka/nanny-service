import css from "../RegisterForm/RegisterForm.module.css";
import { IoMdClose } from "react-icons/io";

const LoginForm = ({ onClose }) => {
  return (
    <div className="login">
      <div className={css.btnCloseModal}>
        <button className={css.svgClose}>
          <IoMdClose className={css.btnCloseIcon} onClick={onClose} />
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
      <form className={css.form}>
        <input
          type="email"
          className={css.inputModal}
          placeholder="Email"
          name="email"
        />
        <div className={css.passwordWrapper}>
          <input
            type="password"
            className={css.inputModal}
            placeholder="Password"
            name="password"
          />
          <button type="button" className={css.togglePassword}>
            {/* <svg
              className="eye eye-open"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M14.9499 14.95C13.5254 16.0358 11.7908 16.6374 9.99992 16.6667C4.16659 16.6667 0.833252 10 0.833252 10C1.86983 8.06825 3.30753 6.38051 5.04992 5.05M8.24992 3.53333C8.82353 3.39907 9.41081 3.33195 9.99992 3.33333C15.8333 3.33333 19.1666 10 19.1666 10C18.6607 10.9463 18.0575 11.8373 17.3666 12.6583M11.7666 11.7667C11.5377 12.0123 11.2617 12.2093 10.955 12.3459C10.6484 12.4826 10.3173 12.556 9.98166 12.562C9.64599 12.5679 9.31256 12.5061 9.00126 12.3804C8.68997 12.2547 8.40719 12.0675 8.16979 11.8301C7.9324 11.5927 7.74525 11.31 7.61951 10.9987C7.49377 10.6874 7.43202 10.3539 7.43795 10.0183C7.44387 9.68258 7.51734 9.35154 7.65398 9.04487C7.79062 8.73821 7.98763 8.46221 8.23325 8.23333"
                stroke="#11101C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M0.833252 0.833313L19.1666 19.1666"
                stroke="#11101C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg> */}
            {/* <svg
              className="eye eye-closed"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_31_2517)">
                <path
                  d="M0.833313 10C0.833313 10 4.16665 3.33337 9.99998 3.33337C15.8333 3.33337 19.1666 10 19.1666 10C19.1666 10 15.8333 16.6667 9.99998 16.6667C4.16665 16.6667 0.833313 10 0.833313 10Z"
                  stroke="#11101C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                  stroke="#11101C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_31_2517">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg> */}
          </button>
        </div>

        <button type="submit" className={css.btnSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

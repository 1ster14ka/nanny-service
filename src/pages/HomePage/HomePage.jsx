import css from "./HomePage.module.css";
import { MdArrowOutward } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

const HomePage = () => {
  return (
    <div className={css.mainContainer}>
      <div className={css.wrappTitle}>
        <h1 className={css.title}>Make Life Easier for the Family:</h1>
        <h2 className={css.subtitle}>
          Find Babysitters Online for All Occasions
        </h2>
        <button className={css.btnNanny}>
          Get started <MdArrowOutward className={css.iconArrow} />
        </button>
      </div>
      {/* <button className={css.btnNanny}>
        Get started <MdArrowOutward className={css.iconArrow} />
      </button> */}

      <div className={css.wrappInfo}>
        <div className={css.wrappIconCheckMark}>
          <IoMdCheckmark className={css.iconCheckMark} />
        </div>
        <div>
          <p className={css.infoText}>Experienced nannies</p>
          <p className={css.infoNum}>15,000</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

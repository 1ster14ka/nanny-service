import { useEffect, useState } from "react";
import { fetchNannies } from "../../js/listNannies";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import css from "./Nannies.module.css";
import { getAge } from "../../js/getAge";

const Nannies = () => {
  const [nanny, setNanny] = useState([]);
  const [isOpenComment, setIsOpenComment] = useState(null);

  useEffect(() => {
    const loadNanny = async () => {
      const data = await fetchNannies();
      setNanny(data);
    };

    loadNanny();
  }, []);
  console.log(nanny);

  return (
    <div className={css.container}>
      <div>Filters</div>
      <ul className={css.listNanny}>
        {nanny.map(
          ({
            id,
            name,
            birthday,
            experience,
            kids_age,
            characters,
            education,
            about,
            location,
            rating,
            price_per_hour,
            avatar_url,
            reviews,
          }) => (
            <li key={id} className={css.cardNanny}>
              <div className={css.wrappImg}>
                <GoDotFill className={css.dot} />
                <img src={avatar_url} alt={name} className={css.imgNanny} />
              </div>
              <div className={css.wrappNannyInfo}>
                <div>
                  <p className={css.textNanny}>Nanny</p>
                  <p className={css.nameNanny}>{name}</p>
                </div>
                <div className={css.wrappLocation}>
                  <p>
                    <IoLocationOutline />
                    {location}
                  </p>
                  <p>
                    <IoIosStar className={css.iconRating} />
                    {rating}
                  </p>
                  <p>
                    Price / 1 hour: <span>{price_per_hour}$</span>
                  </p>
                </div>
                <div className={css.wrappCharacteristicNanny}>
                  <p className={css.characteristicNanny}>
                    Age:{" "}
                    <span className={css.characteristicNannySpan}>
                      {getAge(birthday)}
                    </span>
                  </p>
                  <p className={css.characteristicNanny}>
                    Experience:{" "}
                    <span className={css.characteristicNannySpan}>
                      {experience}
                    </span>
                  </p>
                  <p className={css.characteristicNanny}>
                    Kids age:{" "}
                    <span className={css.characteristicNannySpan}>
                      {kids_age}
                    </span>
                  </p>
                  <p className={css.characteristicNanny}>
                    Characters:
                    <span className={css.characteristicNannySpan}>
                      {characters
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(", ")}
                    </span>
                  </p>
                  <p className={css.characteristicNanny}>
                    Education:{" "}
                    <span className={css.characteristicNannySpan}>
                      {education}
                    </span>
                  </p>
                </div>
                <p className={css.aboutNanny}>{about}</p>
                {isOpenComment === id ? (
                  <>
                    <ul className={css.reviewsList}>
                      {reviews.map((comment, index) => (
                        <li key={index} className={css.reviewItem}>
                          <div className={css.reviewHeader}>
                            <div className={css.avatarPlaceholder}>👤</div>
                            <div>
                              <p className={css.reviewerName}>
                                {comment.reviewer}
                              </p>
                              <p className={css.reviewRating}>
                                ⭐ {comment.rating}
                              </p>
                            </div>
                          </div>
                          <p className={css.reviewText}>{comment.comment}</p>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={css.btnReadMore}
                      onClick={() => setIsOpenComment(null)}
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <button
                    className={css.btnReadMore}
                    onClick={() => setIsOpenComment(id)}
                  >
                    Read more
                  </button>
                )}
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Nannies;

import { useEffect, useState } from "react";
import css from "../Nannies/Nannies.module.css";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { MdOutlineFavorite, MdFavoriteBorder } from "react-icons/md";
import { getAge } from "../../js/getAge";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import { useModal } from "../../js/ModalContext.jsx";
import { useAuth } from "../../hooks/auth.jsx";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState("all");
  const [visibleCount, setVisibleCount] = useState(3);
  const [isOpenComment, setIsOpenComment] = useState(null);
  const [nanniesInfo, setNanniesInfo] = useState([]);
  const { handleOpen } = useModal();
  const user = useAuth();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (nanny) => {
    const isFavorite = favorites.some((item) => item.id === nanny.id);
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((item) => item.id !== nanny.id);
    } else {
      updatedFavorites = [...favorites, nanny];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const filteredFavorites = () => {
    let filtered = [...favorites];

    switch (selected) {
      case "lt-10":
        filtered = filtered.filter((n) => n.price_per_hour < 10);
        break;
      case "gt-10":
        filtered = filtered.filter((n) => n.price_per_hour >= 10);
        break;
      case "popular":
        filtered = filtered.filter((n) => n.rating >= 4);
        break;
      case "not-popular":
        filtered = filtered.filter((n) => n.rating < 4);
        break;
      case "all":
      default:
        break;
    }

    if (selected === "a-z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selected === "z-a") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  const visibleFavorites = filteredFavorites().slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className={css.container}>
      <ul className={css.listNanny}>
        <li>
          <DropdownFilter selected={selected} setSelected={setSelected} />
        </li>

        {visibleFavorites.length === 0 && (
          <p className={css.emptyMessage}>
            No favorites found for this filter.
          </p>
        )}

        {visibleFavorites.map(
          ({
            id,
            name,
            avatar_url,
            location,
            rating,
            price_per_hour,
            birthday,
            experience,
            kids_age,
            characters,
            education,
            about,
            reviews,
          }) => (
            <li key={id} className={css.cardNanny}>
              <div className={css.wrappImg}>
                <GoDotFill className={css.dot} />
                <img src={avatar_url} alt={name} className={css.imgNanny} />
              </div>
              <div className={css.wrappNannyInfo}>
                <div className={css.wrappTest}>
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
                    <button
                      onClick={() => {
                        if (user) {
                          toggleFavorite({
                            id,
                            name,
                            avatar_url,
                            location,
                            rating,
                            price_per_hour,
                            birthday,
                            experience,
                            kids_age,
                            characters,
                            education,
                            about,
                            reviews,
                          });
                        } else {
                          handleOpen("login");
                        }
                      }}
                    >
                      {favorites.some((item) => item.id === id) ? (
                        <MdOutlineFavorite className={css.iconFavorite} />
                      ) : (
                        <MdFavoriteBorder className={css.iconFavorite} />
                      )}
                    </button>
                  </div>
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
                    Characters:{" "}
                    <span className={css.characteristicNannySpan}>
                      {characters
                        .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
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
                      {(reviews || []).map(
                        ({ comment, rating, reviewer }, index) => (
                          <li key={index} className={css.reviewItem}>
                            <div className={css.reviewHeader}>
                              <div className={css.avatarPlaceholder}>
                                {reviewer[0]}
                              </div>
                              <div>
                                <p className={css.reviewerName}>{reviewer}</p>
                                <p className={css.reviewRating}>
                                  <IoIosStar className={css.iconRating} />{" "}
                                  {rating}
                                </p>
                              </div>
                            </div>
                            <p className={css.reviewText}>{comment}</p>
                          </li>
                        )
                      )}
                    </ul>
                    <button
                      className={css.btnMakeForm}
                      onClick={() => {
                        if (user) {
                          setNanniesInfo([avatar_url, name]);
                          handleOpen("appointment", [
                            avatar_url,
                            name,
                            reviews,
                          ]);
                        } else {
                          handleOpen("login");
                        }
                      }}
                    >
                      Make an appointment
                    </button>
                  </>
                ) : (
                  <button
                    className={css.btnReadMore}
                    onClick={() => {
                      setIsOpenComment(id);
                      setNanniesInfo([avatar_url, name]);
                    }}
                  >
                    Read more
                  </button>
                )}
              </div>
            </li>
          )
        )}
      </ul>

      {visibleCount < filteredFavorites().length && (
        <button onClick={handleLoadMore} className={css.btnLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default Favorites;

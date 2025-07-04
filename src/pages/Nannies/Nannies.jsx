import { useEffect, useRef, useState } from "react";
import { fetchNannies } from "../../js/listNannies";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import css from "./Nannies.module.css";
import { getAge } from "../../js/getAge";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import { useModal } from "../../js/ModalContext.jsx";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { useAuth } from "../../hooks/auth.jsx";
import Loader from "../../components/Loader/Loader.jsx";

const Nannies = () => {
  const { handleOpen } = useModal();
  const [loading, setLoading] = useState(false);

  const [isOpenComment, setIsOpenComment] = useState(null);
  const [selected, setSelected] = useState("all");
  const [naniesInfo, setNanniesInfo] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const [nannies, setNannies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const user = useAuth();

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

  const isNannyFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  const lastRef = useRef(null);
  const loadMore = async () => {
    const { data, lastValue } = await fetchNannies(selected, lastRef.current);
    lastRef.current = lastValue;

    if (data.length === 0) {
      setHasMore(false);
      return;
    }
    setNannies((prev) => [...prev, ...data]);
    if (data.length < 3) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const loadNanny = async () => {
      try {
        setLoading(true);
        setHasMore(true);
        setNannies([]);
        lastRef.current = null;

        const { data, lastValue } = await fetchNannies(selected, null);
        lastRef.current = lastValue;
        setNannies(data);

        if (data.length < 3) {
          setHasMore(false);
        }
      } catch (error) {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    loadNanny();
  }, [selected, user]);

  return (
    <>
      <div className={css.container}>
        {loading ? (
          <Loader />
        ) : (
          <ul className={css.listNanny}>
            <li>
              <DropdownFilter selected={selected} setSelected={setSelected} />
            </li>
            {nannies.map(
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
                          Price / 1 hour: <span> {price_per_hour}$</span>
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
                          {user && isNannyFavorite(id) ? (
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
                        Characters:
                        <span className={css.characteristicNannySpan}>
                          {characters
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
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
                          {reviews.map(
                            ({ comment, rating, reviewer }, index) => (
                              <li key={index} className={css.reviewItem}>
                                <div className={css.reviewHeader}>
                                  <div className={css.avatarPlaceholder}>
                                    {reviewer[0]}
                                  </div>
                                  <div>
                                    <p className={css.reviewerName}>
                                      {reviewer}
                                    </p>
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
                            if (user && user.user) {
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

            {hasMore && (
              <button onClick={loadMore} className={css.btnLoadMore}>
                Load more
              </button>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Nannies;

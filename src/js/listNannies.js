import {
  endBefore,
  get,
  getDatabase,
  limitToFirst,
  limitToLast,
  orderByChild,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";

const fetchNannies = async (order, lastValue = null) => {
  const db = getDatabase();
  const nanniesRef = ref(db, "nannies");

  let orderField = "name";
  let needsReverse = false;

  switch (order) {
    case "a-z":
      orderField = "name";
      break;
    case "z-a":
      orderField = "name";
      needsReverse = true;
      break;
    case "lt-10":
      orderField = "sort_price";
      break;
    case "gt-10":
      orderField = "sort_price";
      needsReverse = true;
      break;
    case "popular":
      orderField = "sort_rating";
      needsReverse = true;
      break;
    case "not-popular":
      orderField = "sort_rating";
      break;
    case "all":
    default:
      orderField = null;
      break;
  }
  let nanniesQuery;

  if (orderField) {
    if (needsReverse) {
      nanniesQuery = lastValue
        ? query(
            nanniesRef,
            orderByChild(orderField),
            endBefore(lastValue),
            limitToLast(3)
          )
        : query(nanniesRef, orderByChild(orderField), limitToLast(3));
    } else {
      nanniesQuery = lastValue
        ? query(
            nanniesRef,
            orderByChild(orderField),
            startAfter(lastValue),
            limitToFirst(3)
          )
        : query(nanniesRef, orderByChild(orderField), limitToFirst(3));
    }
  } else {
    nanniesQuery = lastValue
      ? query(nanniesRef, orderByKey(), startAfter(lastValue), limitToFirst(3))
      : query(nanniesRef, orderByKey(), limitToFirst(3));
  }

  try {
    const snapshot = await get(nanniesQuery);
    if (!snapshot.exists()) return { data: [], lastValue: null };

    const result = [];
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();

      if (
        (order === "popular" || order === "not-popular") &&
        typeof data.sort_rating !== "string"
      )
        return;

      result.push({
        id: childSnapshot.key,
        ...data,
      });
    });

    const data = needsReverse ? result.reverse() : result;

    let newLastValue = null;
    if (data.length > 0) {
      const lastItem = data[data.length - 1];
      newLastValue =
        order === "all"
          ? lastItem.id
          : order === "lt-10" || order === "gt-10"
          ? lastItem.sort_price
          : order === "popular" || order === "not-popular"
          ? lastItem.sort_rating
          : lastItem.name;
    }

    return {
      data,
      lastValue: newLastValue,
    };
  } catch (e) {
    return { data: [], lastValue: null };
  }
};

export { fetchNannies };

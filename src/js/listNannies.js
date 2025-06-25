import { child, get, getDatabase, ref } from "firebase/database";

const fetchNannies = async () => {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, "nannies"));

  if (snapshot.exists()) {
    const data = snapshot.val();
    const nanniesList = Object.entries(data).map(([id, nanny]) => ({
      id,
      ...nanny,
    }));
    return nanniesList;
  } else {
    console.log("Нет данных");
    return [];
  }
};

export { fetchNannies };

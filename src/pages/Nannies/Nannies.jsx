import { useEffect, useState } from "react";
import { fetchNannies } from "../../js/listNannies";

const Nannies = () => {
  const [nanny, setNanny] = useState(null);

  useEffect(() => {
    const loadNanny = async () => {
      const data = await fetchNannies();
      setNanny(data);
    };

    loadNanny();
  }, []);
  console.log(nanny);

  return (
    <div>
      <h2>Hello world</h2>
    </div>
  );
};

export default Nannies;

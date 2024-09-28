import axios from "axios";
import { useEffect, useState } from "react";

import MoviesList from "./MoviesList";

const Popular = ({ title, tv }) => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const { data } = await axios.get(tv ? "/tv" : "/movies");
        setPopular(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPopular();
  }, []);

  return (
    <div
      className="flex flex-col items-start mt-3 px-10 font-body-text
      h-full
    max-md:px-5
    "
    >
      <h1 className="text-4xl font-bold text-white font-headline max-lg:text-3xl max-md:text-2xl max-sm:text-xl ">
        {title}
      </h1>
      <MoviesList popular={popular} tv={tv ? true : false} />
    </div>
  );
};

export default Popular;

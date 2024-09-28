import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./Logo";
import MoviesList from "./MoviesList";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
const Hero = () => {
  const [bgImage, setBgImage] = useState("");
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBgImage = async () => {
      try {
        const { data } = await axios.get("/background");
        setBgImage(`https://image.tmdb.org/t/p/original${data}`);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBgImage();
  }, []);

  const fetchMovies = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post("/recommend", { text: query });
      setMovies(data);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching movie recommendations.");
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search input to avoid sending too many requests
  const debouncedFetchMovies = debounce(fetchMovies, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      debouncedFetchMovies(search);
    }
  };

  return (
    <div
      className={`relative max-w-full  bg-cover bg-center scrollbar-hide w-full h-screen flex items-center justify-center overflow-hidden `}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-background bg-opacity-80 flex flex-col items-start justify-start scrollbar-hide">
        <Logo />

        <div className="flex flex-col items-start justify-center gap-4 mt-36 max-lg:mt-24 px-10 max-md:gap-4 max-md:px-5 max-md:py-10 max-sm:py-5  max-sm:gap-2">
          <h1 className="text-primary font-heading text-6xl max-md:text-4xl max-sm:text-3xl font-bold">
            Find Your Perfect Movie Match.
          </h1>

          <p className="text-secondary text-2xl font-body-text w-2/4 max-lg:text-xl max-sm:w-full">
            Looking for a movie that suits your mood? Just tell us what you're
            in the mood for, and we'll find the perfect film for you.
          </p>

          <form
            className="flex items-start space-x-4 gap-2 max-md:space-x-0 max-md:space-y-4 pt-5 w-3/4 flex-wrap max-sm:w-full scrollbar-hide"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Describe the type of movie you're looking for..."
              className="bg-background text-primary font-body-text text-xl w-2/4 max-md:w-full max-md:text-lg px-4 py-3 rounded-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-accent-teal text-primary font-body-text text-xl px-4 py-3 rounded-lg hover:bg-accent-dark-teal max-md:w-full max-md:text-lg max-md:px-6 transition duration-300"
              type="submit"
              disabled={loading} // Disable button while loading
            >
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              {loading ? "Searching..." : "Find My Movie"}
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="w-full scrollbar-hide ">
            <MoviesList popular={movies} title={"Recommended Movies"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

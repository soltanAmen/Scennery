import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const MoviesList = ({ popular, tv }) => {
  return (
    <div
      className="flex scrollbar-hide w-full space-x-4 py-4   mt-8
        max-md:mt-4

        "
      style={{ scrollBehavior: "smooth" }}
    >
      {popular.map((movie) => (
        <Link
          to={tv ? `/tv/${movie.id}` : `/movie/${movie.id}`}
          key={movie.id}
          className="flex-shrink-0 w-80  flex flex-col items-start   max-lg:w-60   max-md:w-52   max-sm:w-44 "
        >
          <div className=" relative w-full h-full  rounded-lg overflow-hidden ">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover rounded-lg   hover:transform hover:scale-105 transition-all duration-300 "
            />
          </div>

          <h1
            className="text-white mt-2 text-2xl  line-clamp-1
              font-headline

            max-lg:text-xl
            max-md:text-lg
            max-sm:text-base

            "
          >
            {movie.title}
          </h1>
          <div className="stars flex items-center mt-2">
            {Array.from({ length: Math.floor(movie.vote_average / 2) }).map(
              (_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="text-accent-orange text-xl"
                />
              )
            )}
            {Array.from({
              length: 5 - Math.floor(movie.vote_average / 2),
            }).map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStarRegular}
                className="text-accent-orange text-xl"
              />
            ))}

            <p
              className="text-secondary ml-2 text-lg
  max-md:text-base
  max-sm:text-sm
  "
            >
              {movie.vote_average.toFixed(1)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MoviesList;

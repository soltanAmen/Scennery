import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Popular } from "../components";

import { FaStar, FaUser } from "react-icons/fa";
import { BiTimeFive, BiCalendar, BiCameraMovie } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";

import axios from "axios";
import Logo from "../components/Logo";

const SingleMovie = ({ tv }) => {
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [Photos, setPhotos] = useState(null);
  const [cast, setCast] = useState(null);
  const [popular, setPopular] = useState([]);
  const [director, setDirector] = useState(null);
  const [showBigImage, setShowBigImage] = useState(null);
  const [showTrailer, setShowTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [chosenSection, setChosenSection] = useState("overview");
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(tv ? `/tv/${id}` : `/movie/${id}`);

      setMovie(data);
      setVideo(data.videos);
      setPhotos(data.images);
      setCast(data.cast);
      setDirector(data.director);

      setLoading(false);
    };
    fetchMovie();
  }, [id]);
  useEffect(() => {
    document.title = movie?.title || "Movie";
  }, [movie?.title]);

  useEffect(() => {
    const returnToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    returnToTop();
  }, [id]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background ">
        <div className="animate-logo">
          <Logo />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center  font-body-text bg-background
      overflow-hidden  
        

    ${(showBigImage || showTrailer) && "fixed overflow-hidden"}
     `}
    >
      <div
        className="bg-cover  bg-no-repeat bg-center  flex items-center justify-center h-[80%] w-full"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path})`,
        }}
      >
        <div className="bg-background pb-10 bg-opacity-80  top-0  bottom-0  left-0  right-0   w-full  h-full   flex flex-col justify-start items-start">
          <Logo />
          <div
            className="flex flex-col items-start justify-center space-y-4 px-16
            mt-10
        max-md:px-5
        max-md:space-y-2
        max-md:space-x-0
        animate-fade-in max-sm:px-4 max-sm:space-y-2 max-sm:space-x-0
         w-full h-fit"
          >
            <h1 className="text-primary font-heading text-6xl max-md:text-4xl max-sm:text-3xl ">
              {movie?.title}
            </h1>
            <div className="flex items-start  flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <BiCalendar className="text-accent-teal text-2xl" />
                <p
                  className="text-secondary text-xl font-body-text
                max-md:text-lg
                max-sm:text-md

                "
                >
                  {movie?.release_date}
                </p>
              </div>
              <div className="flex items-center space-x-2 ">
                <BiTimeFive className="text-accent-teal text-2xl" />
                <p
                  className="text-secondary text-xl font-body-text
                "
                >
                  {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <FaStar className="text-accent-teal text-2xl" />
                <p className="text-secondary text-xl font-body-text">
                  {movie?.vote_average}
                </p>
              </div>
            </div>
            <p
              className="text-secondary text-2xl font-body-text w-2/4 max-lg:text-xl  max-sm:w-full
            max-md:text-lg
            max-md:line-clamp-6
            max-sm:line-clamp-4
            max-sm:text-base


            "
            >
              {movie?.overview}
            </p>
            <button
              onClick={() => {
                const trailer = video?.find(
                  (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                );
                setShowTrailer(trailer);
              }}
              className="flex items-center bg-accent-teal text-primary font-body-text text-xl px-4 py-3 rounded-lg hover:bg-accent-dark-teal  max-md:text-lg max-md:px-6 transition duration-300"
            >
              <FaPlay className="mr-2" />
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
      <div
        className="section-nav flex items-center space-x-4 my-10
      

     text-3xl 
      max-md:text-xl
      max-sm:text-lg
      max-sm:space-x-2

      
      "
      >
        <button
          onClick={() => setChosenSection("overview")}
          className={` font-body-text uppercase ${
            chosenSection === "overview" ? "text-accent-teal" : "text-secondary"
          }`}
        >
          Overview
          <hr
            className={
              chosenSection === "overview"
                ? "border-accent-teal border-2 w-full transition-all duration-300"
                : "w-0"
            }
          />
        </button>
        <button
          onClick={() => setChosenSection("cast")}
          className={` font-body-text uppercase ${
            chosenSection === "cast" ? "text-accent-teal" : "text-secondary"
          }`}
        >
          Cast
          <hr
            className={
              chosenSection === "cast"
                ? "border-accent-teal border-2 w-full  transition-all duration-300"
                : "w-0"
            }
          />
        </button>
        <button
          onClick={() => setChosenSection("photos")}
          className={`uppercase font-body-text ${
            chosenSection === "photos" ? "text-accent-teal" : "text-secondary"
          }`}
        >
          Photos
          <hr
            className={
              chosenSection === "photos"
                ? "border-accent-teal border-2 w-full  transition-all duration-300"
                : "w-0"
            }
          />
        </button>
        <button
          onClick={() => setChosenSection("videos")}
          className={` uppercase font-body-text ${
            chosenSection === "videos" ? "text-accent-teal" : "text-secondary"
          }`}
        >
          Videos
          <hr
            className={
              chosenSection === "videos"
                ? "border-accent-teal border-2 w-full  transition-all duration-300"
                : "w-0"
            }
          />
        </button>
      </div>
      {showTrailer && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center"
          onClick={() => setShowTrailer(null)}
        >
          <iframe
            src={`https://www.youtube.com/embed/${showTrailer?.key}`}
            title={showTrailer?.name}
            className="rounded-lg"
            width="80%"
            height="65%"
          ></iframe>
        </div>
      )}

      {showBigImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setShowBigImage(null)}
        >
          <img
            src={showBigImage}
            alt="big"
            className="w-3/4
          rounded-lg
          "
          />
        </div>
      )}
      {chosenSection === "cast" && (
        <div
          className="grid grid-cols-4 gap-4 px-16 max-md:px-5
            
        max-md:grid-cols-2
        max-sm:grid-cols-1
        my-10
        "
        >
          {cast?.map((person) => (
            <div key={person.id} className="flex flex-col items-center">
              <div
                className="relative  overflow-hidden
                w-full h-full  rounded-lg
                min-h-[500px]
                "
              >
                {person.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                    alt={person.name}
                    className="w-full h-full object-cover "
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <FaUser className="text-4xl text-primary" />
                  </div>
                )}
              </div>
              <p className="text-secondary text-xl font-body-text mt-4">
                {person.name}
              </p>

              <p className="text-secondary text-xl font-body-text">
                {person.character}
              </p>
            </div>
          ))}
        </div>
      )}
      {chosenSection === "overview" && (
        <div className="flex flex-col items-center px-16 max-md:px-5 max-md:flex-col gap-10 my-10">
          <div className="flex  items-center px-16 max-md:px-5 max-md:flex-col gap-10 my-10">
            <div className="  w-1/4  max-md:w-full">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                alt={movie?.title}
                className="rounded-lg
              max-md:w-full
              
              "
              />
            </div>
            <div className="flex flex-col items-start w-1/2 max-md:w-full">
              <h1 className="text-primary font-heading text-3xl max-md:text-2xl max-sm:text-xl ">
                Storyline
              </h1>
              <p
                className="text-secondary text-xl font-body-text max-lg:text-xl max-md:text-lg   mt-4 
              max-sm:text-base
              max-sm:line-clamp-4
              max-md:line-clamp-6

              "
              >
                {movie?.overview}
              </p>

              <div className="details flex items-start justify-start  mt-4 flex-wrap gap-3 w-full">
                <div className="flex items-center space-x-2">
                  <BiCameraMovie className="text-accent-teal text-2xl" />
                  <p className="text-secondary text-xl font-body-text">
                    {director?.name}
                  </p>
                </div>
                {movie?.budget > 0 && (
                  <div className=" budget flex items-center space-x-2">
                    <p className="text-secondary text-xl font-body-text">
                      Budget:{" "}
                      {Math.floor(movie?.budget / 1000000).toLocaleString()} M $
                    </p>
                  </div>
                )}
                {movie?.revenue > 0 && (
                  <div className="revenue flex items-center space-x-2 gap-3">
                    <p className="text-secondary text-xl font-body-text">
                      Revenue:{" "}
                      {Math.floor(movie?.revenue / 1000000).toLocaleString()} M
                      $
                    </p>
                  </div>
                )}
              </div>
              {movie.genres && (
                <div className="genres-list flex items-center space-x-2 mt-4">
                  <p className="text-secondary text-xl font-body-text">
                    Genres:{" "}
                  </p>
                  {movie?.genres.map((genre) => (
                    <p
                      key={genre.id}
                      className="text-secondary text-xl font-body-text"
                    >
                      {genre.name},
                    </p>
                  ))}
                </div>
              )}
              {movie?.production_companies && (
                <div className="production-companies flex items-start space-x-2 mt-4 flex-wrap justify-start">
                  <p className="text-secondary text-xl font-body-text">
                    Production Companies:{" "}
                  </p>
                  {movie?.production_companies.map((company) => (
                    <p
                      key={company.id}
                      className="text-secondary text-xl font-body-text"
                    >
                      {company.name},
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {chosenSection === "photos" && (
        <div className="flex flex-col items-start px-16 max-md:px-5 max-md:flex-col gap-10 my-10 font-bold">
          <h3 className="text-primary font-heading text-3xl max-md:text-2xl max-sm:text-xl ">
            Backdrop
          </h3>
          <div
            className="grid grid-cols-4 gap-4 
            z-0
          max-md:grid-cols-2
          max-sm:grid-cols-1
          
          "
          >
            {Photos?.backdrops.slice(0, 10).map((photo) => (
              <div
                key={photo.file_path}
                className="relative w-full h-full rounded-lg overflow-hidden"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${photo.file_path}`}
                  alt={photo.file_path}
                  className="w-full h-full object-cover rounded-lg"
                  onClick={() =>
                    setShowBigImage(
                      `https://image.tmdb.org/t/p/original/${photo.file_path}`
                    )
                  }
                />
              </div>
            ))}
          </div>
          <h3 className="text-primary font-heading text-3xl max-md:text-2xl max-sm:text-xl  ">
            Posters
          </h3>
          <div
            className="grid grid-cols-4 gap-4
          max-md:grid-cols-2
          max-sm:grid-cols-1
      
          "
          >
            {Photos?.posters.slice(0, 10).map((photo) => (
              <div
                key={photo.file_path}
                className="relative w-full h-full rounded-lg overflow-hidden"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${photo.file_path}`}
                  alt={photo.file_path}
                  className="w-full h-full object-cover rounded-lg"
                  onClick={() =>
                    setShowBigImage(
                      `https://image.tmdb.org/t/p/original/${photo.file_path}`
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {chosenSection === "videos" && (
        <div
          className="
        grid grid-cols-4 gap-4 px-16 max-md:px-5
        max-md:grid-cols-2
        max-sm:grid-cols-1
        my-10
        "
        >
          {" "}
          {video?.slice(0, 12).map((video) => (
            <iframe
              key={video.key}
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              className="rounded-lg w-full"
            ></iframe>
          ))}
        </div>
      )}
      <hr className="w-full border-secondary" />
      <h1 className="text-4xl font-bold pt-5 text-white font-headline max-lg:text-3xl max-md:text-2xl max-sm:text-xl ">
        You might also like
      </h1>
      <div className="flex flex-col items-start mt-10 font-body-text    w-full scrollbar-hide">
        <Popular popular={popular} tv={tv} />
      </div>
    </div>
  );
};

export default SingleMovie;

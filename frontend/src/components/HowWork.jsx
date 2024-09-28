import {
  faComment,
  faWandMagicSparkles,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const HowWork = () => {
  return (
    <div
      className="flex flex-col items-start mt-10 px-10 font-body-text
      my-10
    max-md:px-5
       
    "
    >
      <h1 className="text-4xl font-bold text-white font-headline max-lg:text-3xl max-md:text-2xl max-sm:text-xl ">
        How It Works
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-8 m-auto">
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faComment}
            className="text-6xl text-accent-teal
            max-sm:text-4xl
            max-md:text-5xl
            

            "
          />
          <h1
            className="text-white mt-2 text-3xl
            text-center

          max-sm:text-lg
          max-md:text-xl
          max-lg:text-2xl

          "
          >
            Tell us what you want to watch.
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faWandMagicSparkles}
            className="text-6xl text-accent-teal
            max-sm:text-4xl
            max-md:text-5xl
            

            "
          />
          <h1
            className="text-white mt-2 text-3xl
text-center
          max-sm:text-lg
          max-md:text-xl
          max-lg:text-2xl

          "
          >
            Get tailored recommendations.
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faPlay}
            className="text-6xl text-accent-teal
            max-sm:text-4xl
            max-md:text-5xl
            

            "
          />
          <h1
            className="text-white mt-2 text-3xl
text-center
          max-sm:text-lg
          max-md:text-xl
          max-lg:text-2xl

          "
          >
            Enjoy your perfect movie night!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HowWork;

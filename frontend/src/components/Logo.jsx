import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link
      to="/"
      className="flex flex-col items-center font-headline font-bold  text-primary 
      py-5
    px-10
    max-md:px-5
    "
    >
      <h1
        className="
      text-4xl
        max-md:text-3xl
        max-sm:text-2xl
      "
      >
        🎬Scenery
      </h1>
    </Link>
  );
};

export default Logo;

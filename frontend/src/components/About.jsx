const About = () => {
  return (
    <div
      className="bg-background flex flex-col items-start justify-center gap-4 
    px-10 max-md:px-5
    "
    >
      <h1 className="text-4xl font-bold text-white font-headline max-lg:text-3xl max-md:text-2xl max-sm:text-xl ">
        {" "}
        About Us
      </h1>
      <p
        className="text-secondary text-2xl font-body-text w-2/4 max-lg:text-lg  max-sm:w-full
      max-md:text-base
      max-sm:text-sm
      "
      >
        Scenery is designed for movie lovers who want quick, personalized
        recommendations. We make it easy to find the right film for any mood or
        occasion.
      </p>
    </div>
  );
};

export default About;

const Footer = () => {
  return (
    <div className="bg-background flex items-center justify-center h-24">
      <div className="flex items-center justify-center space-x-4">
        <a href="#" className="text-white font-body-text text-lg">
          Privacy Policy
        </a>
        <a href="#" className="text-white font-body-text text-lg">
          Terms of Service
        </a>
      </div>
      <p className="text-white font-body-text text-lg">
        © 2021 Scenery. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

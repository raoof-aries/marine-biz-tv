import React from "react";
import {
  HeroSection,
  AboutSection,
  FeaturedContentSection,
  ContactSection,
} from "../../components";

const Home = () => {
  return (
    <>
      <div className="bg-animation">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <HeroSection />
      <AboutSection />
      <FeaturedContentSection />
      <ContactSection />
    </>
  );
};

export default Home;

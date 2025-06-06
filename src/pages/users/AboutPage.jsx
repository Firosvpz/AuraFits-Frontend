import React from "react";
import About from "../../components/users/about/About";
import Footer from "../../layouts/footer/Footer";
import Navbar from "../../components/users/navbar/Navbar";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <About />
      <Footer />
    </>
  );
};

export default AboutPage;

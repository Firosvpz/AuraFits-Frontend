import React from "react";
import Navbar from "../../components/users/navbar/Navbar";
import MainContent from "../../components/users/main/MainContent";
import About from "../../components/users/about/About";
import Trainers from "../../components/users/trainers/Trainers";
import Membership from "../../components/users/membership/Membership";
import Footer from "../../layouts/footer/Footer";
import Facilities from "../../components/users/fecilities/Fecilities";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <MainContent />
      <About />
      <Trainers />
      <Facilities />
      <Membership />
      <Footer />
    </>
  );
};

export default HomePage;

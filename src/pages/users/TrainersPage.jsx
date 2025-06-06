import React from "react";
import Navbar from "../../components/users/navbar/Navbar";
import Trainers from "../../components/users/trainers/Trainers";
import Footer from "../../layouts/footer/Footer";

const TrainersPage = () => {
  return (
    <>
      <Navbar />
      <Trainers />
      <Footer />
    </>
  );
};

export default TrainersPage;

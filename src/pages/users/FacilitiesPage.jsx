import React from "react";
import Navbar from "../../components/users/navbar/Navbar";
import Facilities from "../../components/users/fecilities/Fecilities";
import Footer from "../../layouts/footer/Footer";
import ChatBot from "react-chatbotify"
import { flow } from "../../constants/user/chatbotApi"
import { settings } from "../../constants/user/chatboatSettings"
const FacilitiesPage = () => {
  return (
    <>
      <Navbar />
      <Facilities />
       <ChatBot
        flow={flow}
        settings={settings}
        className="chatbot-container"
      />
      <Footer />
    </>
  );
};

export default FacilitiesPage;

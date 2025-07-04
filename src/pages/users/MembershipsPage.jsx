import React from "react";
import Navbar from "../../components/users/navbar/Navbar";
import Membership from "../../components/users/membership/Membership";
import Footer from "../../layouts/footer/Footer";
import ChatBot from "react-chatbotify"
import { flow } from "../../constants/user/chatbotApi"
import { settings } from "../../constants/user/chatboatSettings"
const MembershipsPage = () => {
  return (
    <>
      <Navbar />
      <Membership />
        <ChatBot
        flow={flow}
        settings={settings}
        className="chatbot-container"
      />
      <Footer />
    </>
  );
};

export default MembershipsPage;

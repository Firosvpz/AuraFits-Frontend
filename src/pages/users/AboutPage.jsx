import React from "react";
import About from "../../components/users/about/About";
import Footer from "../../layouts/footer/Footer";
import Navbar from "../../components/users/navbar/Navbar";
import ChatBot from "react-chatbotify"
import { flow } from "../../constants/user/chatbotApi"
import { settings } from "../../constants/user/chatboatSettings"
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <About />
       <ChatBot
        flow={flow}
        settings={settings}
        className="chatbot-container"
      />
      <Footer />
    </>
  );
};

export default AboutPage;

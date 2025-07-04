import Navbar from "../../components/users/navbar/Navbar"
import MainContent from "../../components/users/main/MainContent"
import About from "../../components/users/about/About"
import Trainers from "../../components/users/trainers/Trainers"
import Membership from "../../components/users/membership/Membership"
import Footer from "../../layouts/footer/Footer"
import Facilities from "../../components/users/fecilities/Fecilities"
import Achievements from "../../components/users/achivements/Achievements"
import ChatBot from "react-chatbotify"
import { flow } from "../../constants/user/chatbotApi"
import { settings } from "../../constants/user/chatboatSettings"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <MainContent />
      <Achievements />
      <About />
      <Trainers />
      <Facilities />
      <Membership />
      <ChatBot
        flow={flow}
        settings={settings}
        className="chatbot-container"
      />
      <Footer />
    </>
  )
}

export default HomePage

import React from 'react'
import Navbar from '../../components/users/navbar/Navbar'
import Contacts from '../../components/users/contacts/Contacts'
import Footer from '../../layouts/footer/Footer'
import ChatBot from "react-chatbotify"
import { flow } from "../../constants/user/chatbotApi"
import { settings } from "../../constants/user/chatboatSettings"
const ContactPage = () => {
  return (
   <>
   <Navbar/>
   <Contacts/>
    <ChatBot
        flow={flow}
        settings={settings}
        className="chatbot-container"
      />
   <Footer/>
   </>
  )
}

export default ContactPage
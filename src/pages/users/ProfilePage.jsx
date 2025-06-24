import React from 'react'
import UserProfile from '../../components/users/profile/UserProfile'
import Navbar from '../../components/users/navbar/Navbar'
import Footer from '../../layouts/footer/Footer'

const ProfilePage = () => {
  return (
    <>
    <Navbar/>
     <UserProfile/>
     <Footer/>
    </>
  )
}

export default ProfilePage
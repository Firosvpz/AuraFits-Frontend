import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import MainContent from '../../components/main/MainContent'
import About from '../../components/about/About'
import Trainers from '../../components/trainers/Trainers'
import Membership from '../../components/membership/Membership'
import Footer from '../../layouts/footer/Footer'

const HomePage = () => {
    return (
        <>
            <Navbar/>
            <MainContent/>
            <About/>
            <Trainers/>
            <Membership/>
            <Footer/>
        </>
    )
}

export default HomePage
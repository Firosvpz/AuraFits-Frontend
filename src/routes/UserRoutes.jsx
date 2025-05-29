import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/users/HomePage'
import AboutPage from '../pages/users/AboutPage'
import TrainersPage from '../pages/users/TrainersPage'
import MembershipsPage from '../pages/users/MembershipsPage'

const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/trainers" element={<TrainersPage />} />
                <Route path="/memberships" element={<MembershipsPage />} />

            </Routes>
        </>
    )
}

export default UserRoutes 
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/users/HomePage";
import AboutPage from "../pages/users/AboutPage";
import TrainersPage from "../pages/users/TrainersPage";
import MembershipsPage from "../pages/users/MembershipsPage";
import FacilitiesPage from "../pages/users/FacilitiesPage";
import ContactsPage from "../pages/users/ContactsPage";
import ProfilePage from "../pages/users/ProfilePage";
import { ProtectedRoutes } from "./ProtectedRoutes";

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/trainers" element={<TrainersPage />} />
        <Route path="/memberships" element={<MembershipsPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/profile" element={<ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>} />
      </Routes>
    </>
  );
};

export default UserRoutes;

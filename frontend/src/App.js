import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './index.css'; // This line is essential

// Existing component imports
import WelcomeScreen from "./components/WelcomeScreen";
import StudentLogin from "./components/StudentLogin";
import ProviderLogin from "./components/ProviderLogin";
import CreateStudentAccount from "./components/CreateStudentAccount";
import CreateProviderAccount from "./components/CreateProviderAccount";
import ProviderDashboard from "./components/ProviderDashboard";
import StudentDashboard from "./components/StudentDashboard";
import BoardingList from "./components/BoardingList";
import BoardingDetails from "./components/BoardingDetails";
import RentItemsPage from "./components/RentItemsPage";
import RentItemDetails from "./components/RentItemDetails";
import TaxiList from "./components/TaxiList";
import TaxiDetails from "./components/TaxiDetails";

import MediList from "./components/MediList";    
import MediDetails from "./components/MediDetails"; 
import MediSelect from "./components/MediSelect";
import ShopSelect from "./components/ShopSelect";
import ShopList from "./components/ShopList";
import ShopDetails from "./components/ShopDetails";
import SkillList from "./components/SkillList";
import SkillDetails from "./components/SkillDetails";

// ✅ New Imports for Rent Feature (Add this section only if missing)
import ProductList from "./components/ProductList";
import RentItems from "./components/RentItems"; 
import Testing from "./components/testing";

function App() {
  return (
    <div>
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/provider-login" element={<ProviderLogin />} />
        <Route path="/create-student-account" element={<CreateStudentAccount />} />
        <Route path="/create-provider-account" element={<CreateProviderAccount />} />
        <Route path="/go-provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/go-student-dashboard" element={<StudentDashboard />} />
        <Route path="/boarding-list" element={<BoardingList />} />
        <Route path="/boarding-details/:id" element={<BoardingDetails />} />
        <Route path="/rent-items" element={<RentItemsPage />} />
        {/* ✅ Updated path to match navigation */}
        <Route path="/rent-item/:id" element={<RentItemDetails />} />
        <Route path="/taxi-list" element={<TaxiList />} />
        <Route path="/taxi-details/:id" element={<TaxiDetails />} />

        <Route path="/testing" element={<Testing />} />
        <Route path="/medi-select" element={<MediSelect />} />
        <Route path="/medi-list" element={<MediList />} />
        <Route path="/medi-details/:id" element={<MediDetails />} />
        <Route path="/shop-select" element={<ShopSelect />} />
        <Route path="/shop-list" element={<ShopList />} />
        <Route path="/shop-details/:id" element={<ShopDetails />} />
        <Route path="/skill-list" element={<SkillList />} />
        <Route path="/skill-details/:id" element={<SkillDetails />} />
      </Routes>
    </div>
  );
}

export default App;

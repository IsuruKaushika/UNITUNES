import React from "react";
import { Routes, Route, Link } from "react-router-dom";

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

// ✅ New Imports for Rent Feature (Add this section only if missing)
import ProductList from "./components/ProductList";
import RentItems from "./components/RentItems"; // make sure the file name is RentItems.js
// No need to route these separately unless required individually

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
        <Route path="/rent-details/:id" element={<RentItemDetails />} />
        <Route path="/taxi-list" element={<TaxiList />} />
        <Route path="/taxi-details/:id" element={<TaxiDetails />} />
        <Route path="/medi-list" element={<MediList />} />
        <Route path="/medi-details/:id" element={<MediDetails />} />
        {/* ✅ No changes to your route structure – just supporting files needed */}
      </Routes>
    </div>
  );
}

export default App;

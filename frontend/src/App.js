import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import StudentLogin from "./components/StudentLogin";
import ProviderLogin from "./components/ProviderLogin";
import CreateStudentAccount from "./components/CreateStudentAccount";
import CreateProviderAccount from "./components/CreateProviderAccount";
import ProviderDashboard from "./components/ProviderDashboard";
import StudentDashboard from "./components/StudentDashboard";
import BoardingList from "./components/BoardingList";
import BoardingDetails from "./components/BoardingDetails";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/provider-login" element={<ProviderLogin />} />
        <Route path="/create-student-account" element={<CreateStudentAccount />} />
        <Route path="/create-provider-account" element={<CreateProviderAccount />} />
        <Route path="/go-provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/go-student-dashboard" element={<StudentDashboard />} />
        <Route path="/boarding-list" element={<BoardingList />}/>
        <Route path="/boarding-details/:id" element={<BoardingDetails />}  />

      </Routes>
    </div>
  );
}

export default App;

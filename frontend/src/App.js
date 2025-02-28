import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import StudentLogin from "./components/StudentLogin";
import ProfessionalLogin from "./components/ProfessionalLogin";
import CreateStudentAccount from "./components/CreateStudentAccount";
import CreateProfessionalAccount from "./components/CreateProfessionalAccount";
import ProfessionalDashboard from "./components/ProfDashboard";
import StudentDashboard from "./components/StudentDashboard";
import BoardingList from "./components/BoardingList";
import BoardingDetails from "./components/BoardingDetails";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/professional-login" element={<ProfessionalLogin />} />
        <Route path="/create-student-account" element={<CreateStudentAccount />} />
        <Route path="/create-professional-account" element={<CreateProfessionalAccount />} />
        <Route path="/go-professional-dashboard" element={<ProfessionalDashboard />} />
        <Route path="/go-student-dashboard" element={<StudentDashboard />} />
        <Route path="/boarding-list" element={<BoardingList />}/>
        <Route path="/boarding-details/:id" element={<BoardingDetails />}  />

      </Routes>
    </div>
  );
}

export default App;

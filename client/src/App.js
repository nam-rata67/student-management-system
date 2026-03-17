import { BrowserRouter,Routes, Route } from "react-router-dom";

import GuestLayout from "./components/guestLayout/GuestLayout";
import Home from "./components/guestLayout/Home";
import Login from "./components/guestLayout/Login";
import Register from "./components/guestLayout/Register";

import AdminLayout from "./components/adminLayout/AdminLayout";
import AdminDashboard from "./components/adminLayout/AdminDashboard";

import StudentLayout from "./components/studentLayout/StudentLayout";
import StudentDashboard from "./components/studentLayout/StudentDashboard";
import StudentProfile from "./components/studentLayout/StudentProfile";

import StudentHome from "./components/studentLayout/StudentHome";
import ChangePassword from "./components/guestLayout/ChangePassword";
import ForgotPassword from "./components/guestLayout/ForgotPassword";
import AdminChangePassword from "./components/adminLayout/AdminChangePassword";
import AdminNotices from "./components/adminLayout/AdminNotice";
import StudentNotices from "./components/studentLayout/StudentNotices";
import AdminSettings from "./components/adminLayout/AdminSettings";
import AdminStudentRecord from "./components/adminLayout/AdminStudentRecord";
import AdminNotes from "./components/adminLayout/AdminNotes";
import StudentNotes from "./components/studentLayout/StudentNotes";
import AdminProfile from "./components/adminLayout/AdminProfile";
import AuthSuccess from "./components/guestLayout/AuthSuccess";
import AdminDoubt from "./components/adminLayout/AdminDoubt";
import StudentDoubt from "./components/studentLayout/StudentDoubt";




function App() {
  return (
    <Routes>

      {/* GUEST */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
      </Route>

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
       <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
         <Route path="student-record" element={<AdminStudentRecord />} />
         <Route path="notes" element={<AdminNotes />} /> {/* ✅ ADMIN NOTES */}
          <Route path="profile" element={<AdminProfile/>} />

            <Route path="notices" element={<AdminNotices />} />   {/* ✅ ADD THIS */}
            <Route path="/admin/doubts" element={<AdminDoubt />} />
         <Route path="change-password" element={<AdminChangePassword />} />  {/* admin password page */}
           <Route path="settings" element={<AdminSettings />} />
       
      </Route>

      {/* STUDENT */}
      <Route path="/user" element={<StudentLayout />}>
       <Route index element={<StudentHome/>} />
     
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
          <Route path="notices" element={<StudentNotices />} />   {/* ✅ ADD THIS */}
           <Route path="notes" element={<StudentNotes />} /> {/* ✅ STUDENT NOTES */}
           <Route path="doubts" element={<StudentDoubt />} />
       
         <Route path="change-password" element={<ChangePassword/>} />
      
       
      </Route>

    </Routes>
  );
}

export default App;
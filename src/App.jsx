import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Components/Login/LoginForm";
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";
import Dashboard2 from "./Layouts/Dashboard/Dashboard";
import AddUserForm from "./Layouts/Dashboard/AddUserForm";
import Register from "./Layouts/Dashboard/Register";
import MemberTable from "./Layouts/Dashboard/MemberRegistrationTable";
import AttendanceTracking from "./Layouts/Dashboard/Attendance";
import CountriesOverview from "./Layouts/Dashboard/CountriesOverview";
import Configuration from "./Layouts/Dashboard/Configuration";
import PrivateRoute from "./utils/PrivateRoute";
import UserTable from "./Layouts/Dashboard/UserTable";
import ForgotPassword from "./features/auth/Components/Login/ForgotPasswordForm";
import PersonalInfo from "./Layouts/profiles/Profile";
import Contact from "./Layouts/profiles/Contact";
import Educationwork from "./Layouts/profiles/education-work";
import Family from "./Layouts/profiles/Family";
import Spiritualjourney from "./Layouts/profiles/Spiritual-journey";
import Welfare from "./Layouts/profiles/Welfare";

function App() {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* ✅ FULLSCREEN PROFILE (NO SIDEBAR) */}
    <Route
  path="/profile"
  element={
    <PrivateRoute>
      <PersonalInfo />
    </PrivateRoute>
  }
>
  <Route path="contact" element={<Contact />} />
  <Route path="membership" element={<Family />} />
  <Route path="education" element={<Educationwork />} />
  <Route path="skills" element={<Spiritualjourney />} />
  <Route path="welfare" element={<Welfare />} />
</Route>


    {/* ✅ DASHBOARD (WITH SIDEBAR) */}
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }
    >
      <Route index element={<Dashboard2 />} />

      {/* <Route path="contact" element={<Contact />} />
      <Route path="membership" element={<Family />} />
      <Route path="skills" element={<Spiritualjourney />} />
      <Route path="education" element={<Educationwork />} />
      <Route path="welfare" element={<Welfare />} /> */}

      <Route path="add-user" element={<AddUserForm />} />
      <Route path="user-table" element={<UserTable />} />
      <Route path="register" element={<Register />} />
      <Route path="members" element={<MemberTable />} />
      <Route path="attendance" element={<AttendanceTracking />} />
      <Route path="countries" element={<CountriesOverview />} />
      <Route path="configuration" element={<Configuration />} />
    </Route>
  </Routes>
</Router>

  );
}

export default App;

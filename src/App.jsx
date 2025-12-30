import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./features/auth/Components/Login/LoginForm";
import ForgotPassword from "./features/auth/Components/Login/ForgotPasswordForm";

// Utils
import PrivateRoute from "./utils/PrivateRoute";

// Dashboard
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";
import Dashboard2 from "./Layouts/Dashboard/Dashboard";
import AddUserForm from "./Layouts/Dashboard/AddUserForm";
import Register from "./Layouts/Dashboard/Register";
import MemberTable from "./Layouts/Dashboard/MemberRegistrationTable";
import AttendanceTracking from "./Layouts/Dashboard/Attendance";
import CountriesOverview from "./Layouts/Dashboard/CountriesOverview";
import Configuration from "./Layouts/Dashboard/Configuration";
import UserTable from "./Layouts/Dashboard/UserTable";

// Profile (FULLSCREEN)
import ProfileLayout from "./Layouts/profiles/ProfileLayout";
import Contact from "./Layouts/profiles/Contact";
import EducationWork from "./Layouts/profiles/education-work";
import Membership from "./Layouts/profiles/Membership";
import Skills from "./Layouts/profiles/Skills";
import Welfare from "./Layouts/profiles/Welfare";
import PersonalInfo from "./Layouts/profiles/PersonalInfo";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔁 Redirect root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔐 Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 👤 PROFILE (FULL SCREEN — NO SIDEBAR) */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<PersonalInfo />} />
          <Route path="contact" element={<Contact />} />
          <Route path="membership" element={<Membership />} />
          <Route path="education" element={<EducationWork />} />
          <Route path="skills" element={<Skills />} />
          <Route path="welfare" element={<Welfare />} />
        </Route>

        {/* 📊 DASHBOARD (WITH SIDEBAR) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard2 />} />
          <Route path="add-user" element={<AddUserForm />} />
          <Route path="user-table" element={<UserTable />} />
          <Route path="register" element={<Register />} />
          <Route path="members" element={<MemberTable />} />
          <Route path="attendance" element={<AttendanceTracking />} />
          <Route path="countries" element={<CountriesOverview />} />
          <Route path="configuration" element={<Configuration />} />
        </Route>

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ForgotPassword from "./features/auth/Components/Login/ForgotPasswordForm";
import Login from "./features/auth/Components/Login/LoginForm";
import AttendanceTracking from "./Layouts/Dashboard/attendance/Attendance";
import Configuration from "./Layouts/Dashboard/configuration/Configuration";
import CountriesOverview from "./Layouts/Dashboard/countries/CountriesOverview";
import Dashboard2 from "./Layouts/Dashboard/dashboard-layouts/Dashboard";
import DashboardLayout from "./Layouts/Dashboard/dashboard-layouts/DashboardLayout";
import MemberTable from "./Layouts/Dashboard/members/MemberRegistrationTable";
import Register from "./Layouts/Dashboard/members/register";
import AddUserForm from "./Layouts/Dashboard/users/AddUserForm";
import UserTable from "./Layouts/Dashboard/users/UserTable";
import Contact from "./Layouts/profiles/Contact";
import EducationWork from "./Layouts/profiles/education-work";
import Membership from "./Layouts/profiles/Membership";
import PersonalInfo from "./Layouts/profiles/PersonalInfo";
import ProfileLayout from "./Layouts/profiles/ProfileLayout";
import Skills from "./Layouts/profiles/Skills";
import Welfare from "./Layouts/profiles/Welfare";
import PageNotFound from "./page-not-found/PageNotFound";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔁 ROOT REDIRECT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔐 AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 👤 PROFILE (NO SIDEBAR) */}
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

        {/* 📊 DASHBOARD */}
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

        {/* ❌ 404 (ALWAYS LAST) */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

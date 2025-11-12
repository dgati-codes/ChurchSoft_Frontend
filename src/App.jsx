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

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* Default dashboard content */}
          <Route index element={<Dashboard2 />} />

          {/* USERS DROPDOWN */}
          <Route path="add-user" element={<AddUserForm />} />
          <Route path="user-table" element={<UserTable />} />

          {/* MEMBERS DROPDOWN */}
          <Route path="register" element={<Register />} />
          <Route path="members" element={<MemberTable />} />

          {/* OTHER ROUTES */}
          <Route path="attendance" element={<AttendanceTracking />} />
          <Route path="countries" element={<CountriesOverview />} />
          <Route path="configuration" element={<Configuration />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

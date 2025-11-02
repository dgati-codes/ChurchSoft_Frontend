import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Components/Login/LoginForm";
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";
import Dashboard2 from "./Layouts/Dashboard/Dashboard";
import AddUserForm from "./Layouts/Dashboard/AddUserForm";
import Register from "./Layouts/Dashboard/register";
import MemberTable from "./Layouts/Dashboard/MemberRegistrationTable";
import AttendanceTracking from "./Layouts/Dashboard/Attendance";
import CountriesOverview from "./Layouts/Dashboard/CountriesOverview";
import Configuration from "./Layouts/Dashboard/Configuration";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
  return (
    <Router>
      <Routes>
        {/* Default route -> Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
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
          <Route index element={<Dashboard2 />} />
          <Route path="add-user" element={<AddUserForm />} />
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

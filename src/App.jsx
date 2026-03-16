import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ROLES } from "./context/AuthContext";
import ForgotPassword from "./features/auth/Components/Login/ForgotPasswordForm";
import Login from "./features/auth/Components/Login/LoginForm";
import AttendanceTracking from "./Layouts/Dashboard/attendance/Attendance";
import Configuration from "./Layouts/Dashboard/configuration/Configuration";
import CountriesOverview from "./Layouts/Dashboard/countries/CountriesOverview";
import Dashboard from "./Layouts/Dashboard/Dashboard";
import DashboardLayout from "./Layouts/DashboardLayout";
import IncompleteAndNewRegister from "./Layouts/Dashboard/members/member-registration/IncompleteAndNewRegister";
import MemberTable from "./Layouts/Dashboard/members/MemberRegistrationTable";
import AddUserForm from "./Layouts/Dashboard/users/AddUserForm";
import UserTable from "./Layouts/Dashboard/users/UserTable";
import Contact from "./Layouts/profiles/member-profile/Contact";
import EducationWork from "./Layouts/profiles/member-profile/education-work";
import Membership from "./Layouts/profiles/member-profile/Membership";
import PersonalInfo from "./Layouts/profiles/member-profile/PersonalInfo";
import ProfileLayout from "./Layouts/profiles/member-profile/ProfileLayout";
import Skills from "./Layouts/profiles/member-profile/Skills";
import Welfare from "./Layouts/profiles/member-profile/Welfare";
import UserProfile from "./Layouts/profiles/user-profile/UserProfile";
import PageNotFound from "./page-not-found/PageNotFound";
import PrivateRoute from "./utils/PrivateRoute";
import EditMemberModal from "./Layouts/Dashboard/members/EditMember";
import { Toaster } from "react-hot-toast";
import Register from "./Layouts/Dashboard/members/member-registration/register";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {/*  ROOT REDIRECT */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/*  AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/user_profile" element={<UserProfile />} />
          <Route
            path="/memberProfile"
            element={
              <PrivateRoute>
                <ProfileLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<PersonalInfo />} />
            <Route path="memberProfile-contact" element={<Contact />} />
            <Route path="memberProfile-membership" element={<Membership />} />
            <Route path="memberProfile-education" element={<EducationWork />} />
            <Route path="memberProfile-skills" element={<Skills />} />
            <Route path="memberProfile-welfare" element={<Welfare />} />
          </Route>
          <Route path="editMemberModal" element={<EditMemberModal />} />
          {/*  DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="add-user"
              element={
                <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.PASTOR]}>
                  <AddUserForm />
                </PrivateRoute>
              }
            />
            <Route
              path="user-table"
              element={
                <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.PASTOR]}>
                  <UserTable />
                </PrivateRoute>
              }
            />
            <Route
              path="members"
              element={
                <PrivateRoute
                  allowedRoles={[
                    ROLES.ADMIN,
                    ROLES.PASTOR,
                    ROLES.ELDER,
                    ROLES.REP,
                    ROLES.FINANCE,
                    ROLES.LEADER,
                    ROLES.MEMBER,
                    ROLES.GUEST,
                  ]}
                >
                  <MemberTable />
                </PrivateRoute>
              }
            />
            <Route path="attendance" element={<AttendanceTracking />} />
            <Route path="countries" element={<CountriesOverview />} />
            <Route path="configuration" element={<Configuration />} />
            <Route path="new-registration" element={<Register />} />
            <Route 
              path="register"
              element={
                <PrivateRoute
                  allowedRoles={[
                    ROLES.ADMIN,
                    ROLES.PASTOR,
                    ROLES.ELDER,
                    ROLES.REP,
                    ROLES.FINANCE,
                    ROLES.LEADER,
                    ROLES.MEMBER,
                    ROLES.GUEST,
                  ]}
                >
                  <IncompleteAndNewRegister />
                </PrivateRoute>
              }
            />
          </Route>

          {/*  404 (ALWAYS LAST) */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

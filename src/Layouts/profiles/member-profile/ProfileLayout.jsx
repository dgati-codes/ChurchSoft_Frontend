import {
  ArrowLeft,
  Church,
  GraduationCap,
  Heart,
  Pencil,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getInitials } from "../../../utils/getInitials";

function ProfileLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { member } = useAuth();
  if (!member) {
    const handleRegisterClick = () => {
    const navigationData = {
      prefill: {
        fullName: `${user.firstName?.trim() ?? ""} ${user.lastName?.trim() ?? ""}`,
        email: user.email ?? "",
        phoneNumber: user.phoneNumber ?? "",
        assembly: user.localAssemblyName ?? "",
      },
      userId: user.id,
    };

    navigate("/dashboard/register", { state: navigationData });
  };

    return (
      <div className=" bg-white h-screen  border-[#E5E7EB] text-white grid grid-rows-[20%_80%]">
        <div className="flex bg-[#031B6B] items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm font-bold"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
        <div className="p-4  border flex  flex-col mt-20 items-center   rounded">
          <p className="text-yellow-800">
            You are logged in but not yet registered as a member. Please
            register your member profile.
          </p>
          <button
            onClick={handleRegisterClick}
            className="bg-blue-700 hover:bg-blue-800 hover:cursor-pointer text-white w-1/2 px-2 py-3 flex items-center justify-center rounded mt-5"
          >
            Register as Member
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full  ">
      <div className="bg-[#031B6B] border-[#E5E7EB] text-white px-10 py-6 grid grid-cols-[10%_40%_50%]">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm font-bold"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
            {getInitials(user)}
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm bg-blue-300/20 px-2 py-1 rounded-full inline-block">
              <span className="text-green-600 font-bold">{user?.member}</span>{" "}
              member
            </p>
            <div className="flex">
              <p>Joined since  <span className="text-yellow-500 ml-3">{member.dateJoinedChurch}</span></p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button className="bg-white text-blue-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium">
            <Pencil size={14} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white border-b flex justify-center">
        <div className="flex gap-10 px-12">
          <NavLink to="/memberProfile" end>
            {({ isActive }) => (
              <Tab
                icon={<User size={14} />}
                label="Personal Info"
                active={isActive}
              />
            )}
          </NavLink>

          <NavLink to="memberProfile-contact">
            {({ isActive }) => (
              <Tab
                icon={<Phone size={14} />}
                label="Contact"
                active={isActive}
              />
            )}
          </NavLink>

          <NavLink to="memberProfile-membership">
            {({ isActive }) => (
              <Tab
                icon={<Church size={14} />}
                label="Membership"
                active={isActive}
              />
            )}
          </NavLink>

          <NavLink to="memberProfile-education">
            {({ isActive }) => (
              <Tab
                icon={<GraduationCap size={14} />}
                label="Education"
                active={isActive}
              />
            )}
          </NavLink>

          <NavLink to="memberProfile-skills">
            {({ isActive }) => (
              <Tab
                icon={<Shield size={14} />}
                label="Skills"
                active={isActive}
              />
            )}
          </NavLink>

          <NavLink to="memberProfile-welfare">
            {({ isActive }) => (
              <Tab
                icon={<Heart size={14} />}
                label="Welfare"
                active={isActive}
              />
            )}
          </NavLink>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="px-10 py-10">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;

function Tab({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors
        ${
          active
            ? "text-blue-600 border-blue-600"
            : "text-gray-500 border-transparent hover:text-gray-700"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}

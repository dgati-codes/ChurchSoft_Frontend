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

function ProfileLayout() {
  const navigate = useNavigate();
  const { user} = useAuth();

  // if (loading) return <p>Loading...</p>;

  // if (!user) {
  //   navigate("/login");
  //   return null;
  // }

  // const member = members.find((m) => m.email === user.email);

  // if (!member) return <p>Member not found</p>;

  return (
    <div className="min-h-screen w-full  ">
      <div className="bg-[#031B6B] border-[#E5E7EB] text-white px-10 py-6 grid grid-cols-[10%_40%_50%]">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className="flex items-center gap-4">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.QTD-DEW7Iablt1WXp0csOQHaE8?w=1060&h=707&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-white object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm bg-blue-300/20 px-2 py-1 rounded-full inline-block">
              <span className="text-green-600 font-bold">{user?.status}</span>{" "}
              member
            </p>
            <div className="flex">
              <p>Joined since</p>
              <input
                type="text"
                className="text-yellow-500"
                // value={member.dateJoinedChurch}
              />
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
          <NavLink to="/profile" end>
            {({ isActive }) => (
              <Tab
                icon={<User size={14} />}
                label="Personal Info"
                active={isActive}
              />
            )}
          </NavLink>

          <NavLink to="/profile/contact">
            {({ isActive }) => (
              <Tab
                icon={<Phone size={14} />}
                label="Contact"
                active={isActive}
              />
            )}
          </NavLink>

          <NavLink to="/profile/membership">
            {({ isActive }) => (
              <Tab
                icon={<Church size={14} />}
                label="Membership"
                active={isActive}
              />
            )}
          </NavLink>

          <NavLink to="/profile/education">
            {({ isActive }) => (
              <Tab
                icon={<GraduationCap size={14} />}
                label="Education"
                active={isActive}
              />
            )}
          </NavLink>

          <NavLink to="/profile/skills">
            {({ isActive }) => (
              <Tab
                icon={<Shield size={14} />}
                label="Skills"
                active={isActive}
              />
            )}
          </NavLink>

          <NavLink to="/profile/welfare">
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

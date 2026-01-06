import React from "react";
import { ArrowLeft, Pencil, User, Shield, Church, Phone, Heart, GraduationCap } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


function ProfileLayout() {
  const navigate = useNavigate();
   const { user, loading} = useAuth();

if (loading) return null;

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
            <h2 className="text-lg font-semibold">{user?.firstName} {user?.lastName}</h2>
            <p className="text-sm bg-blue-300/20 px-2 py-1 rounded-full inline-block">
              Active Member
            </p>
            <p className="text-xs">{user?.dateJoinedChurch}</p>
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
          <Link to="/profile"><Tab icon={<User size={14} />} label="Personal Info" /></Link>
          <Link to="/profile/contact"><Tab icon={<Phone size={14} />} label="Contact" /></Link>
          <Link to="/profile/membership"><Tab icon={<Church size={14} />} label="Membership" /></Link>
          <Link to="/profile/education"><Tab icon={<GraduationCap size={14} />} label="Education" /></Link>
          <Link to="/profile/skills"><Tab icon={<Heart size={14} />} label="Skills" /></Link>
          <Link to="/profile/welfare"><Tab icon={<Shield size={14} />} label="Welfare" /></Link>
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

function Tab({ icon, label }) {
  return (
    <button className="flex items-center gap-2 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent">
      {icon}
      {label}
    </button>
  );
}

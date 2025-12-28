import { ArrowLeft, Pencil, User, Shield ,Church , Phone, Heart, GraduationCap, } from "lucide-react";
import {Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";





function Contact() {
  const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
             <div className="bg-[#031B6B] text-white px-10 py-6 grid grid-cols-[10%_40%_50%]">
        <div className="flex items-center justify-evenly">
            <button
  onClick={() => navigate("/dashboard")}
  className="flex items-center gap-2 text-sm"
>
  <ArrowLeft size={16} />
  Back
</button>

        </div>
        <div className="flex items-center justify-evenly">
            
             <div className="flex items-center gap-4">
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.U3JegUYEzKUc7D3To2i1jgHaHa?cb=ucfimg2&ucfimg=1&w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-white object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">Sarah Johnson</h2>
            <p className="text-sm mr-8 bg-blue-300/20  px-2 py-1 rounded-full text-center">Active Member</p>
            <p className="text-xs ">Member since March 2018</p>
          </div>
        </div>
        </div>
        <div className=" flex items-center justify-end">
          <button className="bg-white text-blue-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium">
          <Pencil size={14} />
          Edit Profile
        </button>
      </div> 
        </div>
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
          <div className="w-6/8 m-10 mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <Phone size={14} />
                   contact
                  </h2>

                  <hr />
                  <br />
                  <div className="grid grid-cols-3 gap-y-6 gap-x-10 text-sm">
      
                  <Info label="Phone Number" value="+233 55 55 55 55" />
                  <Info label="whatapp Number " value="+233 55 55 55 55" />
                  <Info label="Email" value="K7dX5@example.com" />

                  <Info label="Address" value="Springfield" />
                  
                  
                </div>
                <br />
                <h1 className="text-sm font-bold mb-4 flex items-center gap-2">Next Of Kin</h1>
                <hr />
                <br />
                <div className="grid grid-cols-3 gap-y-6 gap-x-10 text-sm">
                  <Info label="Marital Status" value="Single" />
                  <Info label="Hometown" value="Springfield" />
                  <Info label="Nationality" value="Ghanaian" />
                </div>
              </div>
            </div>
        </div>

        
    )
};

export default Contact;


function Tab({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 ${
        active
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}


function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}

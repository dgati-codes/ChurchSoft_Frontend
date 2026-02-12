import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";



const Navbar = () => {
    const navigate = useNavigate();
  const [open, setOpen] = useState(false);
   const { user,logout } = useAuth();


const handleLogout = () => {
  logout();              
  localStorage.clear();  
  navigate("/login");   
};



  return (
    <header className="bg-white fixed font-[DM Sans] grid grid-cols-[40%_60%] p-8 shadow-sm w-full z-50">
      <div>
        <div className="text-[20px] font-semibold text-[#0B1C2D]">
            <h1>Hello <span className="">{user?.firstName} {user?.lastName}</span>!</h1>
        </div>
        <p className="text-[13px] text-gray-500">
          Welcome back! Here’s what’s happening today
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.QTD-DEW7Iablt1WXp0csOQHaE8?w=1060&h=707&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700">
              {user?.firstName} {user?.lastName}
            </span>
            <ChevronDown className="mt-2 h-4 w-4" />
          </button>

          {open && (
            <div className="absolute left-0 mt-3 w-44 rounded-xl bg-white shadow-lg border border-gray-100 z-50">
              <ul className="py-4 text-sm text-gray-700">
                <li>
                  <Link
                    // to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    User Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Member Profile
                  </Link>
                </li>

                <li>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

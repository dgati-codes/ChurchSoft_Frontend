import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getInitials } from "../../../utils/getInitials";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const { isAdmin } = useAuth();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleMouseLeave = () => {
      setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    dropdownRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // dropdownRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <header className="bg-white fixed font-[DM Sans] grid grid-cols-[40%_60%] p-6 shadow-sm w-full z-50">
      <div>
        <div className="text-[20px] font-semibold text-[#0B1C2D]">
          <h1>
            Hello{" "}
            <span>
              {user?.firstName} {user?.lastName}
            </span>
            !
          </h1>
        </div>
        <p className="text-[13px] text-gray-500">
          Welcome back! Here’s what’s happening today
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              {getInitials(user)}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {user?.firstName} {user?.lastName}
            </span>
            <ChevronDown className="mt-2 h-4 w-4" />
          </button>

          {open && (
            <div className="absolute left-0 mt-2 w-50 rounded-xl bg-white shadow-lg border border-gray-100 z-50">
              <ul className="py-4 text-sm text-gray-700">
                {/* {isAdmin() && (
                  <> */}
                <li>
                  <Link
                    to="/user_profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    User Profile
                  </Link>
                </li>
                {/* </>
                )} */}

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

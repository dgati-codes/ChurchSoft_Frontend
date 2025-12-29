import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("churchsoft_user"));

  return (
    <header className="bg-white fixed font-[DM Sans] grid grid-cols-[40%_60%] p-8 shadow-sm w-full">
      <div>
        <h1 className="text-[20px] font-semibold text-[#0B1C2D]">
          Hello {user?.firstName} {user?.lastName}!
        </h1>
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
              src="https://tse1.mm.bing.net/th/id/OIP.U3JegUYEzKUc7D3To2i1jgHaHa"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700">
              {user?.username}
            </span>
            <ChevronDown className="mt-2 h-4 w-4" />
          </button>

          {open && (
            <div className="absolute left-0 mt-3 w-44 rounded-xl bg-white shadow-lg border border-gray-100 z-50">
              <ul className="py-4 text-sm text-gray-700">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600"
                    onClick={() => localStorage.clear()}
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

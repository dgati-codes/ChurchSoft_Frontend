import React from "react";
import { useState } from "react";
import { Search, Mail, X, Phone, MapPin, Calendar, AlertCircle } from "lucide-react";

const members = [
  {
    id: 1,
    name: "Sandra Adom",
    email: "sand.a@gmail.com",
    phone: "055-123-1234",
    location: "Madina",
    joined: "Jan 15, 2022",
    progress: 70,
    missingInfo: "Ministry Involvements and Skills; Welfare and Health Information",
  },
  {
    id: 2,
    name: "Sandra Adom",
    email: "sand.a@gmail.com",
    phone: "055-123-1234",
    location: "Madina",
    joined: "Jan 15, 2022",
    progress: 70,
    missingInfo: "Ministry Involvements and Skills; Welfare and Health Information",
  },
];


function Dashboard() {

    const [search, setSearch] = useState("");


    return (
   
     <div className="p-6   bg-gray-50 min-h-screen">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center justify-center h-40 bg-gradient-to-r from-yellow-500  to-orange-600 text-white rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Member</h2>
        </div>
        <div className="flex items-center justify-center h-40 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Users</h2>
        </div>
        <div className="flex items-center justify-center h-40 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Attendance</h2>
        </div>
      </div>

      {/* Continue Member Registration Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-2">Continue Member Registration</h3>
        <p className="text-sm text-gray-500 mb-4">
          Select existing members with incomplete registration to continue their enrollment
        </p>
       <div className="w-full sm:w-1/2 relative">
        <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, email or phone number"
          className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </div>

      </div>

      {/* Member Cards */}
      <div className="space-y-4">
        {members
          .filter(
            (m) =>
              m.name.toLowerCase().includes(search.toLowerCase()) ||
              m.email.toLowerCase().includes(search.toLowerCase()) ||
              m.phone.includes(search)
          )
          .map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              {/* Member Info */}
              <div className="flex items-start sm:items-center gap-4 w-full">
                {/* Avatar */}
                <div className="bg-red-100 text-red-600 font-semibold w-10 h-10 rounded-full flex items-center justify-center">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{member.name}</h4>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Mail size={14} /> {member.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={14} /> {member.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} /> Joined {member.joined}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} /> {member.location}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Registration Progress</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${member.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right text-gray-500 mt-1">{member.progress}%</p>
                  </div>

                  {/* Missing Info */}
                  <div className="mt-3 bg-orange-50 border border-orange-200 text-orange-700 rounded-lg p-3 text-sm flex items-start gap-2">
                    <AlertCircle size={16} className="mt-0.5" />
                    <span>
                      <strong>Missing Information:</strong> {member.missingInfo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition self-end sm:self-center">
                Continue Registration →
              </button>
            </div>
          ))}
      </div>
    </div>

        );

   
}

export default Dashboard;  
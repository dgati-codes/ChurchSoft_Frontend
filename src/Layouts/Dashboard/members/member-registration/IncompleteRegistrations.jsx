import { useQuery } from "@tanstack/react-query";
import { getIncompleteMembers } from "../../../../api/services/memberService.js";
import { data } from "react-router-dom";




const registrations = [
  {
    name: "Sandra Adom",
    email: "Sandra@gmail.com",
    id: "Us001",
    progress: 70,
    started: "1/15/2024",
    updated: "1/15/2024",
    initials: "SA",
    avatarBg: "bg-red-100",
    avatarText: "text-red-600",
  },
  {
    name: "Nii Tackie Jnr",
    email: "Niitr@gmail.com",
    id: "Us001",
    progress: 40,
    started: "1/15/2024",
    updated: "1/15/2024",
    initials: "NT",
    avatarBg: "bg-cyan-100",
    avatarText: "text-cyan-600",
  },
];

export default function IncompleteRegistrations() {

const { data: registrations = [], isLoading } = useQuery({
  
  queryKey: ["incompleteMembers"],
  queryFn: getIncompleteMembers,
  
 
}
);
const formattedRegistrations = registrations.map((member) => {
  const initials = member.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return {
    name: member.fullName,
    email: member.email,
    id: member.memberId,
    progress: 50, // placeholder until backend provides progress
    started: new Date(member.createdAt).toLocaleDateString(),
    updated: new Date(member.updatedAt).toLocaleDateString(),
    initials,
    avatarBg: "bg-blue-100",
    avatarText: "text-blue-600",
  };
});

if (isLoading) {
  return <div className="p-6">Loading registrations...</div>;
}

  return (
    <div className="w-full min-h-screen bg-gray-100 ">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-6"></div>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Incomplete Registrations</h2>

        <input
          type="text"
          placeholder="Search by name, email or phone number"
          className="w-full bg-gray-100 rounded-md px-4 py-2 text-sm outline-none"
        />
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {formattedRegistrations.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 flex justify-between"
          >
            <div className="flex gap-4 w-full">
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${item.avatarBg} ${item.avatarText}`}
              >
                {item.initials}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <div className="text-sm text-gray-500 flex gap-4 mt-1">
                      <span>{item.email}</span>
                      <span>ID: {item.id}</span>
                    </div>
                  </div>

                  <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                    Incomplete
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Registration Progress</span>
                    <span className="font-medium">{item.progress}%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="flex gap-6 text-xs text-gray-500 mt-4">
                  <span>Started: {item.started}</span>
                  <span>Last updated: {item.updated}</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-end">
              <button className="bg-blue-600 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-700">
                Continue Registration
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

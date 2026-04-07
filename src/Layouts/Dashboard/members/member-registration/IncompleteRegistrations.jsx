import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Mail, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIncompleteMembers } from "../../../../api/services/memberService";
import { useAuth } from "../../../../context/AuthContext";
import LoadingSpinner from "../../modals/LoadingSpinner";

export default function IncompleteRegistrations() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: registrations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["incompleteMembers", user.id],
    queryFn: () => getIncompleteMembers(user.id),
    enabled: !!user?.id,
    keepPreviousData: true,
  });

  // console.log("registrations:", registrations);

  // Filtered registrations based on search term
  const filteredRegistrations = useMemo(() => {
    if (!searchTerm) return registrations;
    const term = searchTerm.toLowerCase();
    return registrations.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.phoneNumber?.toLowerCase().includes(term),
    );
  }, [searchTerm, registrations]);

  if (isError) {
    return <div className="p-6 text-gray-500">Failed to load data <span className="text-blue-500">Try again</span></div>;
  }

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-gray-200 border rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Incomplete Registrations</h2>

        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or email "
            value={searchTerm} // bind input value
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg outline-none text-sm"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="p-6">
          <LoadingSpinner text="Loading Incomplete Registrations...." />
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          No incomplete registration found
        </div>
      ) : (
        <div className="space-y-6">
          {filteredRegistrations.map((user) => {
            const initials = user.fullName
              ?.split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            const progress = user.completionPercentage || 0;

            return (
              <div
                key={user.id}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
              >
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold bg-blue-100 text-blue-600">
                      {initials}
                    </div>

                    {/* Name + Email */}
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {user.fullName}
                      </h3>

                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>

                        <span className="text-gray-400">
                          ID: {user.memberId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                    Incomplete
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Registration Progress</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Started: {new Date(user.createdAt).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Last updated:{" "}
                      {new Date(user.updatedAt).toLocaleString(undefined, {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false, 
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/dashboard/new-registration/${user.id}`)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
                  >
                    Continue Registration
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

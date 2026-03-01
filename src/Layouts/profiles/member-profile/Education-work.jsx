import { GraduationCap } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function Educationwork() {
  const { member } = useAuth();

  return (
    <div className="min-h-screen fixed bg-gray-50">
      <div className=" w-10/14 ml-50 border-[#E5E7EB] bg-[#F9FAFB] rounded-lg shadow-sm border p-6">
        <div className="flex gap-1 mb-2">
          <GraduationCap className="h-5 w-5 text-blue-500" />
          <h1>Education & Profession</h1>
        </div>

        <hr />
        <br />
        <div className="flex items-center gap-8 flex-wrap justify-between">
          <div className="flex flex-col ">
            <p className="text-gray-500">Education Level</p>
            <p className="font-semibold">{member.educationalLevel}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Current Occupation/Profession</p>
            <p className="font-semibold">{member.occupation}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Employment Sector</p>
            <p className="font-semibold">{member.employmentSector}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Employment Type</p>
            <p className="font-semibold">{member.employmentType}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Educationwork;

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

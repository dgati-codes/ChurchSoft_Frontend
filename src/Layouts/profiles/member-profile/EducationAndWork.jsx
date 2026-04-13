import { GraduationCap } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function EducationAndWork() {
  const { member } = useAuth();

  return (
    <div className=" flex justify-center">
      <div className=" w-15/10 ml-6  border-[#E5E7EB] bg-[#F9FAFB] rounded-lg shadow-sm border p-6">
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

export default EducationAndWork;


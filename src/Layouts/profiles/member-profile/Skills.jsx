import { Shield } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function Skills() {
  const { member } = useAuth();

  return (
    <div className="min-h-screen fixed">
      <div className=" w-15/9 ml-20 border-[#E5E7EB] bg-[#F9FAFB] rounded-lg shadow-sm border p-6">
        <div className="flex gap-1 mb-2">
          <Shield className="h-5 w-5 text-blue-500" />
          <h1>Ministry Invlovement & Skills</h1>
        </div>

        <hr />
        <br />
        <div className="flex items-center gap-8 flex-wrap justify-between">
          <div className="flex flex-col ">
            <p className="text-gray-500">Ministries/Group</p>
            <p className="font-semibold">{member.ministries}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Leadership Roles</p>
            <p className="font-semibold"> {member.leadershipRole}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Skills/Talent</p>
            <p className="font-semibold">{member.skillsTalents}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Spiritual Gift</p>
            <p className="font-semibold">{member.spiritualGifts}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;

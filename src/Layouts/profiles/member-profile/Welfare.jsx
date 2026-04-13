import { Heart } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function Welfare() {
  const { member } = useAuth();

  return (
    <div className=" flex justify-center">
      <div className=" w-12/12 bg-[#F9FAFB] border-[#E5E7EB] rounded-lg shadow-sm border p-6">
        <div className="flex gap-1 mb-2">
          <Heart className="h-5 w-5 text-blue-500" />
          <h1>Welfare & Health Information</h1>
        </div>

        <hr />
        <br />
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-gray-500">Any Health Condition(s)</p>
            <p className="font-semibold">{member.hasHealthIssues}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">
              Any special needs or medical conditions
            </p>
            <p className="font-semibold">
              {member.specialNeedsOrMedicalConditions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welfare;

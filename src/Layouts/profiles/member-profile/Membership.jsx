import { Church } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function Membership() {
  const { member } = useAuth();

  return (
    <div className=" flex justify-center">
      <div className=" w-20/10  border-[#E5E7EB] bg-[#F9FAFB] rounded-lg shadow-sm border p-6">
        <div className="flex gap-1 mb-2">
          <Church className="h-5 w-5 text-blue-500" />
          <h1>Membership</h1>
        </div>

        <hr />
        <br />
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-gray-500">Date Joined</p>
            <p>{member.dateJoinedChurch}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Baptism Status</p>
            <p className="font-semibold">{member.baptismStatus}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Salvation/Born Again</p>
            <p className="font-semibold">{member.salvationStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;

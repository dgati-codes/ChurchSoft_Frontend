import { Church  } from "lucide-react";
import {Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Membership() {
  const { user, members, loading } = useAuth();
  
    if (loading) return <p>Loading...</p>;
  
      if (!user) {
        navigate("/login");
        return null;
      }
  
  
    const member = members.find(
      (m) => m.email === user.email
    );
  
    if (!member) return <p>Member not found</p>;
  

    return (
        <div className="min-h-screen fixed ">
             <div className=" w-12/12 ml-50 border-[#E5E7EB] bg-[#F9FAFB] rounded-lg shadow-sm border p-6">
                <div className="flex gap-1 mb-2">
                  <Church className="h-5 w-5 text-blue-500" />
                <h1>Membership</h1>
                </div>
                
                <hr />
                <br />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">Date Joined</label>
                  <input type="text" className="font-semibold" value={member.dateJoinedChurch}  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">Baptism Status</label>
                  <input type="text" className="font-semibold" value={member.baptismStatus} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">Salvation/Born Again</label>
                  <input type="text" className="font-semibold" value={member.salvationStatus} name="" id="" />
                </div>
                </div>
             </div>
        </div>
        
    )
};

export default Membership;




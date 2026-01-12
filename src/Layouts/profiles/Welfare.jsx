import { Heart  } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
function welfare() {
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
        <div className="min-h-screen fixed bg-white">
             <div className=" w-12/12 ml-50 bg-[#F9FAFB] border-[#E5E7EB] rounded-lg shadow-sm border p-6">
                <div className="flex gap-1 mb-2">
                  <Heart className="h-5 w-5 text-blue-500" />
                <h1>Welfare & Health Information</h1>
                </div>
                
                <hr />
                <br />
                <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">Any Health Condition(s)</label>
                  <input type="text" className="font-semibold" value={member.hasHealthIssues} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">Any special needs or medical conditions</label>
                  <input type="text" className="font-semibold" value={member.specialNeedsOrMedicalConditions} name="" id="" />
                </div>
                </div>
             </div>
        </div>
        
    )
};

export default welfare;



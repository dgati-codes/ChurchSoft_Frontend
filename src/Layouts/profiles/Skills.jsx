import {  Heart} from "lucide-react";
import {  Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";




function Skills() {
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
         <div className="min-h-screen fixed bg-gray-50">
             <div className=" w-10/14 ml-50 border-[#E5E7EB] bg-[#F9FAFB] rounded-lg shadow-sm border p-6">
                <div className="flex gap-1 mb-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                <h1>Ministry Invlovement & Skills</h1>
                </div>
                
                <hr />
                <br />
                <div className="flex items-center gap-8 flex-wrap justify-between">
                  <div className="flex flex-col ">
                  <label htmlFor="" className="text-gray-500" >Ministries/Group</label>
                  <input type="text" className="font-semibold" value={member.ministries}  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">Leadership Roles</label>
                  <input type="text" className="font-semibold" value={member.leadershipRole} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">Skills/Talent</label>
                  <input type="text" className="font-semibold" value={member.skillsTalents} name="" id="" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500">Spiritual Gift</label>
                  <input type="text" className="font-semibold" value={member.spiritualGifts} name="" id="" />
                </div>
                </div>
             </div>
        </div>
        
        
    )
};

export default Skills;



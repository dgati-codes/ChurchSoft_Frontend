import { ArrowLeft, Pencil, User, Shield ,Church , Phone, Heart, GraduationCap, } from "lucide-react";
import {Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";





function welfare() {
  const navigate = useNavigate();

    return (
        <div className="min-h-screen fixed bg-white">
             <div className=" w-12/12 ml-50 bg-[#F9FAFB] border-[#E5E7EB] rounded-lg shadow-sm border p-6">
                <div className="flex gap-1 mb-2">
                  <Church className="h-5 w-5 text-blue-500" />
                <h1>Welfare & Health Information</h1>
                </div>
                
                <hr />
                <br />
                <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <label htmlFor="">Any Health Condition(s)</label>
                  <input type="text" placeholder="Yes" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Any special needs or medical conditions</label>
                  <input type="text" placeholder="N/A" name="" id="" />
                </div>
                </div>
             </div>
        </div>
        
    )
};

export default welfare;



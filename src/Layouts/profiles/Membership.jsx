import { ArrowLeft, Pencil, User, Shield ,Church , Phone, Heart, GraduationCap, } from "lucide-react";
import {Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";





function Membership() {
  const navigate = useNavigate();

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
                  <label htmlFor="">Date Joined</label>
                  <input type="text" placeholder="23/02/2023"  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Baptism Status</label>
                  <input type="text" placeholder="Yes" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Salvation/Born Again</label>
                  <input type="text" placeholder="No" name="" id="" />
                </div>
                </div>
             </div>
        </div>
        
    )
};

export default Membership;




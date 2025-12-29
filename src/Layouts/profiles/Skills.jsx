import { ArrowLeft, Pencil, User, Shield ,Church , Phone, Heart, GraduationCap, } from "lucide-react";
import {Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";





function Skills() {

    return (
        <div className="min-h-screen fixed bg-gray-50">
             <div className=" w-13/8 ml-10 flex items-center justify-between bg-white rounded-lg shadow-sm border p-6">
                <div className="flex gap-1">
                  <Church className="h-5 w-5 text-blue-500" />
                <h1>Membership</h1>
                </div>
                
                <div>
                  <label htmlFor="">Date Joined</label>
                  <input type="date" />
                </div>
                <div>
                  <label htmlFor="">Baptism Status</label>
                  <input type="radio" />
                </div>
                <div>
                  <label htmlFor="">Salvation/Born Again</label>
                  <input type="radio" name="" id="" />
                </div>
             </div>
        </div>
        
    )
};

export default Skills;



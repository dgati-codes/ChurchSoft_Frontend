import { ArrowLeft, Pencil, User, Shield ,Church , Phone, Heart, GraduationCap, } from "lucide-react";
import {Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Educationwork() {

    return (
       <div className="min-h-screen fixed bg-gray-50">
             <div className=" w-10/14 ml-50  bg-white rounded-lg shadow-sm border p-6">
                <div className="flex gap-1 mb-2">
                  <GraduationCap className="h-5 w-5 text-blue-500" />
                <h1>Education & Profession</h1>
                </div>
                
                <hr />
                <br />
                <div className="flex items-center gap-8 flex-wrap justify-between">
                  <div className="flex flex-col">
                  <label htmlFor="">Education Level</label>
                  <input type="text" placeholder="Masters"  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Current Occupation/Profession</label>
                  <input type="text" placeholder="Doctor" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Employment Sector</label>
                  <input type="text" placeholder="N/A" name="" id="" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Employment Type</label>
                  <input type="text" placeholder="N/A" name="" id="" />
                </div>
                </div>
             </div>
        </div>
        
    )
};

export default Educationwork;


function Tab({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 ${
        active
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}


function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}

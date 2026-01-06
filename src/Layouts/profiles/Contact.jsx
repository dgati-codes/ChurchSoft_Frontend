import { ArrowLeft, Pencil, User, Shield ,Church , Phone, Heart, GraduationCap, } from "lucide-react";
import {Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";






function Contact() {
  const { user, members, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user || !members) return null;

  const member = members.find(
    (m) => m.email === user.email
  );

  if (!member) return null;

    return (
        <div className="min-h-screen fixed ">
          <div className="w-15/8 ml-12 ">
              <div className="bg-[#F9FAFB] border-[#E5E7EB] rounded-lg shadow-sm border p-6">
                <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <Phone size={14} />
                   Contact
                  </h2>

                  <hr />
                  <br />
                  <div className="grid grid-cols-3 gap-y-6 gap-x-10 text-sm">
      
                  <Info label="Phone Number" value={member.phoneNumber} />
                  <Info label="whatapp Number " value={member.whatsappAvailable} />
                  <Info label="Email" value={member.email} />

                  <Info label="Address" value="Springfield" />
                  
                  
                </div>
                <br />
                <h1 className="text-sm font-bold mb-4 flex items-center gap-2">Next Of Kin</h1>
                <hr />
                <br />
                <div className="grid grid-cols-3 gap-y-6 gap-x-10 text-sm">
                  <Info label="Name" value={member.name} />
                  <Info label="Relationship" value={member.relationship} />
                  <Info label="Contact Information" value={member.contactInformation} />
                </div>
              </div>
            </div>
        </div>

        
    )
};

export default Contact;





function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}

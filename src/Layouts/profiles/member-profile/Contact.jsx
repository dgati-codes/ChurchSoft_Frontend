import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";


function Contact() {
  const navigate = useNavigate();
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
          <div className="w-15/8 ml-12 ">
              <div className="bg-[#F9FAFB] border-[#E5E7EB] rounded-lg shadow-sm border p-6">
                <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-500" />
                   Contact
                  </h2>

                  <hr />
                  <br />
                  <div className="grid grid-cols-3 gap-y-6 gap-x-10 text-sm">
      
                  <Info  label="Phone Number" value={member.phoneNumber} />
                  <Info label="whatapp Number " value={member.whatsappAvailable} />
                  <Info label="Email" value={member.email} />

                  <Info label="Address" value="Springfield" />
                  
                  
                </div>
                <br />
                <h1 className="text-sm font-bold mb-4 flex items-center gap-2">Next Of Kin</h1>
                <hr />
                <br />
                <div className="grid grid-cols-3 gap-y-6 gap-x-10 text-sm">
                  <Info label="Name" value={member.nextOfKin.name} />
                  <Info label="Relationship" value={member.nextOfKin.relationship} />
                  <Info label="Contact Information" value={member.nextOfKin.contactInformation} />
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

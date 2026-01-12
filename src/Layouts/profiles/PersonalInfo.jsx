import { User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function PersonalInfo() {
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
    <div className="bg-[#F9FAFB] border-[#E5E7EB] w-10/10 ml-3 rounded-lg shadow-sm border p-6">
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <User className="h-5 w-5 text-blue-500" />
        Personal Information
      </h3>
      <hr className="mb-6" />

      <div className="grid grid-cols-3 gap-y-6 gap-x-10 text-sm">
        <Info label="Full Name" value={member.fullName} />
        <Info label="Date of Birth" value={member.dateOfBirth} />
        <Info label="Gender" value={member.gender} />
        <Info label="Marital Status" value={member.maritalStatus} />
        <Info label="Hometown" value={member.hometown} />
        <Info label="Nationality" value={member.nationality} />
        <Info label="Ethnicity" value={member.ethnicity} />
        <Info
          label="Identification Type"
          value={member.identificationType}
        />
      </div>
    </div>
  );
}

export default PersonalInfo;

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}

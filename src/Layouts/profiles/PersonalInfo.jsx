import { User } from "lucide-react";

function PersonalInfo() {
  return (
    <div className="bg-white w-10/10 ml-3 rounded-lg shadow-sm border p-6">
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <User size={14} />
        Personal Information
      </h3>
      <hr className="mb-6" />

      <div className="grid grid-cols-3 gap-y-6 gap-x-10 text-sm">
        <Info label="Full Name" value="Sarah Johnson" />
        <Info label="Date of Birth" value="5/15/1990" />
        <Info label="Gender" value="Female" />
        <Info label="Marital Status" value="Single" />
        <Info label="Hometown" value="Springfield" />
        <Info label="Nationality" value="Ghanaian" />
        <Info label="Ethnicity" value="Caucasian" />
        <Info label="Identification Type" value="Driver’s License" />
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

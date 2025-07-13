import React, { useState } from "react";

function CreateUsers() {
  const [formData, setFormData] = useState("");

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "First name is required";
    if (!formData.lname) newErrors.lname = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.number ?? !/^\d{10,15}$/.test(formData.number)) newErrors.number = "Valid phone number is required";
    if (!formData.email ?? !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.mga ?? formData.mga === "sym") newErrors.mga = "Select a ministry";
    if (!formData.assembly) newErrors.assembly = "Assembly is required";
    if (!formData.role) newErrors.role = "Role is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validate();

  if (Object.keys(newErrors).length === 0) {
    // alert("User added successfully");
    console.log(formData);

    // Reset form fields to empty after successful submission
    setFormData({
      name: "",
      lname: "",
      dob: "",
      gender: "",
      address: "",
      number: "",
      email: "",
      mga: "",
      assembly: "",
      role: "",
    });

    setErrors({});
  } else {
    setErrors(newErrors);
  }
};



  return (
    <div className="w-full h-screen  bg-white bg-cover bg-center">
      <div className="w-full flex flex-col p-12 items-center">
        <div className="text-center absolute z-1 w-[135px] rounded-tl-xl rounded-tr-xl mr-116 bg-blue-600">
          <p className="text-2xl font-bold text-amber-50 mb-1.5">+ Add User</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid border-2 mt-6 shadow-2xl bg-white border-none  w-[600px] h-auto rounded-md m-auto gap-4 p-6 items-start"
        >
          <div className="flex justify-evenly w-full gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="name">First Name</label>
              <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="border rounded-sm p-2"
                  value={formData.name ?? ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lname"
                value={formData.lname ?? ""}
                onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                placeholder="Last Name"
                className="border rounded-sm p-2"
              />
              {errors.lname && <span className="text-red-500 text-sm">{errors.lname}</span>}
            </div>
          </div>

          <div className="flex justify-evenly w-full gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                value={formData.dob ?? ""}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="border rounded-sm p-2"
              />
              {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={formData.gender ?? ""}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="border rounded-sm p-2"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
            </div>
          </div>

          <div className="flex justify-evenly w-full gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={formData.address ?? ""}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Address"
                className="border rounded-sm p-2"
              />
              {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="number">Phone Number</label>
              <input
                type="text"
                id="number"
                value={formData.number ?? ""}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                placeholder="Phone Number"
                className="border rounded-sm p-2"
              />
              {errors.number && <span className="text-red-500 text-sm">{errors.number}</span>}
            </div>
          </div>

          <div className="flex justify-evenly w-full gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email ?? ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="border rounded-sm p-2"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="mga">Ministry Group Association</label>
              <select
                id="mga"
                value={formData.mga ?? ""}
                onChange={(e) => setFormData({ ...formData, mga: e.target.value })}
                className="border rounded-sm p-2"
              >
                <option value="sym">Select your ministry</option>
                <option value="choir">Choir</option>
                <option value="evangelism">Evangelism</option>
              </select>
              {errors.mga && <span className="text-red-500 text-sm">{errors.mga}</span>}
            </div>
          </div>

          <div className="flex justify-evenly w-full gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="assembly">Assembly</label>
              <input
                type="text"
                id="assembly"
                value={formData.assembly ?? ""}
                onChange={(e) => setFormData({ ...formData, assembly: e.target.value })}
                placeholder="Assembly"
                className="border rounded-sm p-2"
              />
              {errors.assembly && <span className="text-red-500 text-sm">{errors.assembly}</span>}
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={formData.role ?? ""}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="border rounded-sm p-2"
              >
                <option value="">Select role</option>
                <option value="superadmin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>
              {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-700 transition-all"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUsers;

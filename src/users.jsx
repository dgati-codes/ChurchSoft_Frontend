import React from "react";

function Users() {
  return (
    <div className="w-full h-screen  bg-[url('/images/church.jpg')]  bg-cover bg-center h-screen">
     
    <div className="w-full flex flex-col pt-10 items-center ">
      <div className="text-center absolute z-1 w-[135px] rounded-tl-xl rounded-tr-xl mr-116 bg-blue-600  ">
        <p className="text-2xl font-bold text-amber-50 mb-1.5">+ Add User</p>
      </div>

      <form className="grid border-2  position-relative mt-9   bg-white border-blue-500 w-[600px] h-[330px] rounded-md m-auto gap-4 p-6 items-start">
        {/* Name Section */}
        <div className="flex justify-evenly w-full gap-4">
          <div className="flex flex-col w-full ">
            <label htmlFor="name" >First Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="border rounded-sm p-2"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              placeholder="Last Name"
              className="border rounded-sm p-2"
            />
          </div>
        </div>

        {/* <div className="flex justify-evenly w-full gap-4">
            
            <div className="flex flex-col w-full">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              className="border rounded-sm p-2"
            />
          </div>
            <div className="flex flex-col w-full">
                 <div className="flex flex-col w-full">
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" className="border rounded-sm p-2">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                
                </div>
            </div>
        </div> */}

        {/* Contact Section */}
        <div className="flex justify-evenly w-full gap-4">
            
<div className="flex flex-col w-full">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              className="border rounded-sm p-2"
            />
          </div>

          

          <div className="flex flex-col w-full">
            <label htmlFor="number">Phone Number</label>
            <input
              type="number"
              id="number"
              placeholder="Phone Number"
              className="border rounded-sm p-2"
            />
          </div>
        </div>

        {/* Address & DOB */}
        {/* <div className="flex justify-evenly w-full gap-4">
          
            <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="border rounded-sm p-2"
            />
          </div>
            <div className="flex flex-col w-full">
                <label htmlFor="mga">Ministry Group Association</label>
                <select name="mga" id="mga" className="border rounded-sm p-2">
                    <option value="sym" >Select your ministry</option>
                    <option value="choir">choir</option>
                    <option value="evengelism">evengelism</option>
                </select>

            </div>
          
        </div> */}

        <div className="flex justify-evenly w-full gap-4">
            
            <div className="flex flex-col w-full">
                <label htmlFor="assembly">Assembly</label>
                <input type="text" id ="assembly" placeholder="Assembly" className="border rounded-sm p-2" />

            </div>
            <div className="flex flex-col w-full">
                <label htmlFor="role">Role</label>
               
                    <select name="role" id="role" className="border rounded-sm p-2">
                        <option value="admin">Supper Admin</option>
                        <option value="admin">Admin</option>
                        <option value="admin">Moderator</option>
                        <option value="user">User</option>
                    </select>
                
            </div>
        </div>
        <button onClick={alert} type="submit" className="bg-blue-500 cursor-pointer text-white p-2 rounded-sm">
            Add User
        </button>
      </form>
    </div>
    </div>
  );
}
export default Users;

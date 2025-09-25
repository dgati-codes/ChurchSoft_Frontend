import React, { useState } from "react";
import { X } from "lucide-react";

const AddAttendanceRecord = ({isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    serviceDate: "",
    serviceType: "",
    submittedBy: "",
    region: "",
    district: "",
    localAssembly: "",
    childrenBoys: 0,
    childrenGirls: 0,
    juniorMale: 0,
    juniorFemale: 0,
    seniorMale: 0,
    seniorFemale: 0,
    adultsMen: 0,
    adultsWomen: 0,
    visitorsMale: 0,
    visitorsFemale: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Math.max(0, parseInt(value) || 0),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg z-50">
      <div className="bg-white rounded-lg shadow-xl  w-full max-w-4xl p-6 ">
        {/* Close Button */}
        <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="w-6 h-6 text-gray-400"/>
          </button>

        <h2 className="text-xl font-semibold mb-2">Add New Attendance Record</h2>
        <p className="text-gray-500 mb-6">
          Fill in the attendance details for the service.
        </p>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Top fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Service Date<span className='text-red-600'>*</span></label>
              <input
                type="date"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Service Type<span className='text-red-600'>*</span></label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select service</option>
                <option value="Sunday">Sunday Service</option>
                <option value="Midweek">Midweek Service</option>
                <option value="Special">Special Service</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Submitted By<span className='text-red-600'>*</span></label>
              <input
                type="text"
                name="submittedBy"
                value={formData.submittedBy}
                onChange={handleChange}
                className="input"
                placeholder="Enter name"
                required
              />
            </div>
          </div>

          {/* Region, District, Assembly */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Region<span className='text-red-600'>*</span></label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select region</option>
                <option value="North">North</option>
                <option value="South">South</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">District<span className='text-red-600'>*</span></label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select district</option>
                <option value="District A">District A</option>
                <option value="District B">District B</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Local Assembly<span className='text-red-600'>*</span></label>
              <select
                name="localAssembly"
                value={formData.localAssembly}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select assembly</option>
                <option value="Assembly A">Assembly A</option>
                <option value="Assembly B">Assembly B</option>
              </select>
            </div>
            
          </div>

          {/* Attendance Numbers */}
          <div>
            <h3 className="font-semibold mb-2">Attendance Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {/* Children */}
              <div>
                <p>Children</p>
              <div className="flex  gap-4">
                
                <div>
                    <label>Boys</label>
                <input
                  type="number"
                  name="childrenBoys"
                  value={formData.childrenBoys}
                  onChange={(e) =>
                    handleNumberChange("childrenBoys", e.target.value)
                  }
                  className="input "
                />
              </div>
              <div>
                
                <label>Girls</label>
                <input
                  type="number"
                  name="childrenGirls"
                  value={formData.childrenGirls}
                  onChange={(e) =>
                    handleNumberChange("childrenGirls", e.target.value)
                  }
                  className="input  "
                />
                </div>
              </div>
              </div>

              {/* Junior Youth */}
              <div>
                <p>Junior Youth</p>
               <div className="flex gap-4">
              
             
                <div>               
                <label> Male</label>
                <input
                  type="number"
                  name="juniorMale"
                  value={formData.juniorMale}
                  onChange={(e) =>
                    handleNumberChange("juniorMale", e.target.value)
                  }
                  className="input"
                />
              </div>
              <div>
                <label>Female</label>
                <input
                  type="number"
                  name="juniorFemale"
                  value={formData.juniorFemale}
                  onChange={(e) =>
                    handleNumberChange("juniorFemale", e.target.value)
                  }
                  className="input"
                />
              </div>
              </div>

              </div>
              {/* Senior Youth */}
              <div>
                <p>Senior Youth</p>
              <div className="flex gap-4">
              <div>
                <label>Male</label>
                <input
                  type="number"
                  name="seniorMale"
                  value={formData.seniorMale}
                  onChange={(e) =>
                    handleNumberChange("seniorMale", e.target.value)
                  }
                  className="input"
                />
              </div>
              <div>
                <label> Female</label>
                <input
                  type="number"
                  name="seniorFemale"
                  value={formData.seniorFemale}
                  onChange={(e) =>
                    handleNumberChange("seniorFemale", e.target.value)
                  }
                  className="input"
                />
              </div>           
              </div>           
              </div>

              {/* Adults */}
              <div>
              <p>Adults</p>
              <div className="flex gap-4">
              <div>
                <label>Men</label>
                <input
                  type="number"
                  name="adultsMen"
                  value={formData.adultsMen}
                  onChange={(e) =>
                    handleNumberChange("adultsMen", e.target.value)
                  }
                  className="input"
                />
              </div>
              <div>
                <label>Women</label>
                <input
                  type="number"
                  name="adultsWomen"
                  value={formData.adultsWomen}
                  onChange={(e) =>
                    handleNumberChange("adultsWomen", e.target.value)
                  }
                  className="input"
                />
              </div>
              </div>
              </div>

              {/* Visitors */}
              <div>
              <p>Visitors</p>
              <div className="flex gap-4">
              <div>
                <label>Male</label>
                <input
                  type="number"
                  name="visitorsMale"
                  value={formData.visitorsMale}
                  onChange={(e) =>
                    handleNumberChange("visitorsMale", e.target.value)
                  }
                  className="input"
                />
              </div>
              <div>
                <label>Female</label>
                <input
                  type="number"
                  name="visitorsFemale"
                  value={formData.visitorsFemale}
                  onChange={(e) =>
                    handleNumberChange("visitorsFemale", e.target.value)
                  }
                  className="input"
                />
              </div>
              </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAttendanceRecord;

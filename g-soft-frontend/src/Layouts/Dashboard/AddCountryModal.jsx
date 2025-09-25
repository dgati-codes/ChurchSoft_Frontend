import { useState } from "react";
import { CircleAlert,  X } from 'lucide-react';


export default function AddCountryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    country: "",
    continent: "",
    status: "Active",
    parentLevel: "",
    childLevel: "",
    numParent: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 flex items-center justify-center bg-black/60 rounded-lg z-50">

      <div className="bg-white w-full    max-w-xl rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <h2 className="text-lg font-semibold">Add a country</h2>
          <p className="text-sm text-gray-500">Configure a new country hierarchy structure</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="w-6 h-6 text-gray-400"/>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Basic Information */}
          <div>
           <div className="flex items-center gap-2">
             <CircleAlert className="w-4 mb-2 h-4"/>
            <h3 className="text-sm font-medium mb-2"> Basic Information</h3>
           </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label htmlFor="country" className="font-semibold">Country Name<span className="text-red-500 text-xl">*</span> </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter country name"
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm"
              />
               </div>
              <div>
                <label htmlFor="continent" className="font-semibold">Continent<span className="text-red-500 text-xl">*</span> </label>
              <select
                name="continent"
                value={formData.continent}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select Continent</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
              </select>
              </div>
            </div>
          </div>

          {/* Configuration Details */}
          <div>
            <div className="flex items-center gap-2">
                <CircleAlert className="w-4 mb-2 h-4"/>
            <h3 className="text-sm font-medium mb-2"> Configuration Details</h3>
            </div>
            <p className="font-semibold">Status <span className="text-red-500 text-xl">*</span> </p>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-gray-100  rounded-md px-3 py-2 text-sm"
            >
              <option value="Active" className="text-green-500">Active</option>
              <option value="Inactive" className="text-red-500">Inactive</option>
            </select>
          </div>

          {/* Hierarchy Structure */}
          <div>
            <div className="flex items-center  gap-2">
                <CircleAlert className="w-4 mb-2 h-4"/>
            <h3 className="text-sm font-medium mb-2">  Hierarchy Structure</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                  <p>Parent Level Name<span className="text-red-500 text-xl">*</span> </p>
              <input
                type="text"
                name="parentLevel"
                value={formData.parentLevel}
                onChange={handleChange}
                placeholder="e.g. Region, State, Province"
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm"
              />
              </div>
              <div>
                <p>Child Level Name<span className="text-red-500 text-xl">*</span> </p>
              <input
                type="text"
                name="childLevel"
                value={formData.childLevel}
                onChange={handleChange}
                placeholder="e.g. District, County, Municipality"
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm"
              />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium">Number of Parent*</label>
              <input
                type="number"
                name="numParent"
                value={formData.numParent}
                onChange={handleChange}
                min="0"
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total number of parent levels in this country
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Country
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from 'react'

function BirthdayCard({ name, age, role, image }) {
  return (
    
 
    <div className="bg-[#F6F8FC] rounded-2xl py-5 text-center">
      {/* IMAGE */}
      <img
        src={image}
        alt={name}
        className="h-32 w-full object-cover rounded-xl mb-3"
      />

      <h4 className="text-[15px] font-semibold">{name}</h4>
      <p className="text-[13px] text-pink-500">Turning {age}</p>
      <p className="text-[12px] text-gray-500">{role}</p>

      <button className="mt-3 w-full bg-purple-500 text-white py-2 rounded-xl text-[13px]">
        Send Birthday Wish
      </button>
    </div>
  

  )
}

export default BirthdayCard;
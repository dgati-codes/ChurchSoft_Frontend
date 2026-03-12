export function BirthdayCard({ name, age, role, image, daysRemaining }) {
  const getBirthdayText = () => {
    if (daysRemaining === 0) return "Today 🎉";
    if (daysRemaining === 1) return "Tomorrow";
    // if (daysRemaining === 2) return "Tomorrow";
    return `In ${daysRemaining} days`; 
  };

  return (
    <div className=" relative bg-[#F6F8FC] rounded-2xl text-center">
      <div>
        <span
          className={`absolute top-2 right-2 text-[11px] font-semibold px-2 py-2 rounded-full bg-white shadow ${
            daysRemaining === 0 ? "text-green-600" : "text-blue-600" } ${daysRemaining === 1 ? "text-red-500" : ""
          }`}
        >
          {getBirthdayText()}
        </span>
        <img
          src={image}
          alt={name}
          className="h-40 w-full object-cover rounded-xl mb-3"
        />
      </div>
      {/* IMAGE */}

      <h4 className="text-[15px] font-semibold">{name}</h4>
      <p className="text-[13px] text-pink-500">Turning {age}</p>
      <p className="text-[12px] text-gray-500">{role}</p>

      <button className="mt-3 w-full bg-purple-500 text-white py-2 rounded-xl text-[13px]">
        Send Birthday Wish
      </button>
    </div>
  );
}
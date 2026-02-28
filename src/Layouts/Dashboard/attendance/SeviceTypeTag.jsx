import React from 'react'


 function ServiceTypeTag ({ type }) {
  const displayMap = {
    SUNDAY_SERVICE: "Sunday Service",
    MIDWEEK_SERVICE: "Midweek Service",
    YOUTH_SERVICE: "Youth Service",
    PRAYER_MEETING: "Prayer Meeting",
    SPECIAL_SERVICE: "Special Service",
    MENS_FELLOWSHIP: "Men's Fellowship",
    WOMENS_FELLOWSHIP: "Women's Fellowship",
    BIBLE_STUDY: "Bible Study",
    OUTREACH_PROGRAM: "Outreach Program",
  };
  const displayType = displayMap[type] || type;

  const colors = {
    "Sunday Service": "bg-yellow-100 text-yellow-600",
    "Midweek Service": "bg-blue-100 text-blue-600",
    "Youth Service": "bg-green-100 text-green-600",
    "Prayer Meeting": "bg-purple-100 text-purple-600",
    "Special Service": "bg-red-100 text-red-600",
    "Men's Fellowship": "bg-indigo-100 text-indigo-600",
    "Women's Fellowship": "bg-pink-100 text-pink-600",
    "Bible Study": "bg-teal-100 text-teal-600",
    "Outreach Program": "bg-orange-100 text-orange-600",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        colors[displayType] || "bg-gray-100 text-gray-600"
      }`}
    >
      {displayType}
    </span>

    );
};

export default ServiceTypeTag;
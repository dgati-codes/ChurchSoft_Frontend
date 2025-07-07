import React from 'react';

const MainDashboard = () => {
  // You can replace these values with dynamic data from Firebase or API later
  const totalMembers = 120;
  const thisMonthDonations = 45000; // in dollars or local currency
  const upcomingEvents = 3;
  const activeGroups = 6;

  const stats = [
    {
      title: 'Total Members',
      value: totalMembers,
      icon: '/images/users.svg',
      bg: 'bg-white',
    },
    {
      title: "This Month's Donations",
      value: `Ghc: ${thisMonthDonations}`,
      icon: '/images/badge-cent (2).svg',
      bg: 'bg-white',
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      icon: '/images/calendar.svg',
      bg: 'bg-white',
    },
    {
      title: 'Active Groups',
      value: activeGroups,
      icon: '/images/users.svg',
      bg: 'bg-white',
    },
  ];

  return (
    <main className="flex-1 mt-18 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-500 mb-12">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className={`p-5 rounded-xl shadow-xl/10 ${item.bg} flex items-center space-x-4`}>
            <img src={item.icon} alt={item.title} className="w-10 h-10" />
            <div>
              <p className="text-sm text-gray-600">{item.title}</p>
              <p className="text-xl text-green-500/50  font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainDashboard;

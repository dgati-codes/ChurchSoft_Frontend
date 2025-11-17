import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
    AreaChart,
  Area,
} from "recharts";
import { UsersRound,  ChartLine, Baby, ArrowLeft, ChartColumnIncreasing } from 'lucide-react';

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

 const COLORS = ["#E9D8FD", "#B794F4", "#805AD5", "#553C9A"]; 
 const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



// ✅ Simple Card Component (no shadcn/ui)
function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-xl shadow-md ${className || ""}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className }) {
  return <div className={`p-4 ${className || ""}`}>{children}</div>;
}

// 📊 Sample Data
const barData = [
  { month: "Jan", members: 4200 },
  { month: "Feb", members: 5000 },
  { month: "Mar", members: 3500 },
  { month: "Apr", members: 4600 },
  { month: "May", members: 2700 },
  { month: "Jun", members: 1500 },
  { month: "Jul", members: 3000 },
  { month: "Aug", members: 1800 },
  { month: "Sep", members: 2200 },
  { month: "Oct", members: 4100 },
  { month: "Nov", members: 3200 },
  { month: "Dec", members: 3600 },
  
];

// const pieData = [
//   { name: "Children (0-17)", value: 12.3 },
//   { name: "Youth (18-35)", value: 14.6 },
//   { name: "Adults (36+)", value: 48.8 },
//   { name: "Elderly (60+)", value: 24.3 },
// ];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// ✅ Dashboard Component
export default function MemberFullView({ onBack }) {
  

  return (
    <div className=" font-[Poppins] p-6 space-y-6  bg-gray-100 min-h-screen">
        <div
        className="flex items-center gap-2 cursor-pointer w-fit text-blue-600 hover:text-blue-800"
        onClick={onBack} // ✅ use the passed prop
      >
        <ArrowLeft className="w-5 h-5" />
        <button className="font-medium">Back</button>
      </div>

      {/* Your MemberFullView content here */}
      <div className="mt-6">
        {/* Member details content */}
      </div>
      {/* Header */}
      <h1 className="text-2xl font-bold">Member Registration Dashboard</h1>
      <p className="text-gray-600">
        Visualize member registration data by age group, gender, and location
      </p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Children (0-12) </h2>
               <Baby className="text-blue-600"/>
            </div>
            <p className="text-2xl font-bold">45,672</p>
            <p className="text-green-600">↑ 12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Junior Youth (13-21) </h2>
            <UsersRound className="text-orange-600"/>
            </div>
            <p className="text-2xl font-bold">15,234</p>
            <p className="text-green-600">↑ 8.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Senior Youth (22-35) </h2>
            <UsersRound className="text-yellow-400"/>
            </div>
            <p className="text-2xl font-bold">30,672</p>
            <p className="text-green-600">↑ 15.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Adults</h2>
            <p className="text-2xl font-bold">45,672</p>
            <p className="text-green-600">↓ 12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Total Members</h2>
            <p className="text-2xl font-bold">45,672</p>
            <p className="text-red-600">↓ 12.5% from last month</p>
          </CardContent>
        </Card>
      </div>

    {/* Filters */}
<div className="p-6 border bg-white border-gray-100 rounded-lg shadow-sm">
  <h2 className="font-medium mb-4">Filters</h2>
  <div className="flex justify-between space-x-8">
    {/* Region */}
   <div>
     <div className="flex flex-col mb-4">
      <label className="text-sm font-medium mb-1">Region</label>
      <select className="bg-gray-100 rounded-md w-64 p-2 text-sm">
        <option>Select region</option>
        <option>volta  region</option>
        <option>Greater Accra region</option>
      </select>
    </div>

    {/* District */}
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">District</label>
      <select className="bg-gray-100 rounded-md p-2 text-sm">
        <option>Select district</option>
      </select>
    </div>

   </div>

    {/* Local */}
    <div>
      <div className="flex mb-4 flex-col">
      <label className="text-sm font-medium w-64 mb-1">Local</label>
      <select className="bg-gray-100 rounded-md p-2 text-sm">
        <option>Select local</option>
      </select>
    </div>

    {/* Gender */}
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">Gender</label>
      <select className="bg-gray-100 rounded-md p-2 text-sm">
        <option>Select gender</option>
      </select>
    </div>
    </div>

    {/* Age Group */}
   <div className="flex mb-4 flex-col">
     <div className="flex flex-col">
      <label className="text-sm font-medium w-64 mb-1">Age Group</label>
      <select className="bg-gray-100 rounded-md p-2 text-sm">
        <option>Select age group</option>
      </select>
    </div>

    {/* Date Range */}
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">Date Range</label>
      <input type="date" className="bg-gray-100 rounded-md p-2 text-sm" />
    </div>
  </div>
   </div>
</div>


      {/* Registration Trend - Area Chart */}
<Card>
  <CardContent>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">
       Registration Trend (12-month view - 2024)
      </h2>
      <div className="flex items-center">
        <p className="text-gray-500"><span className="font-semibold text-black">Total:</span> 265,234</p>
          <ChartLine className="border border-gray-300 rounded-sm" />
          <ChartColumnIncreasing className="bg-black text-amber-50 rounded-sm "/>
      </div>
      
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {/* gradient fill for nicer effect */}
          <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.0}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="members"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorMembers)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </CardContent>
</Card>


      {/* Additional Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
        {/* Pie Chart */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">
              Age group distribution
            </h2>
           <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gender Breakdown */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">
              Gender breakdown by age group
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="members" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      {/* Regional Distribution */}
<Card>
  <CardContent>
    <h2 className="text-lg font-semibold mb-4">
      Regional Distribution
    </h2>
    <p className="text-gray-500 mb-4">
      Member distribution by region (interactive map would go here)
    </p>

    <div className="space-y-3">
      {[
        { region: "Northern Region", members: "12,500", change: "+12.5%", color: "bg-pink-400" },
        { region: "Eastern Region", members: "12,500", change: "+8.5%", color: "bg-purple-400" },
        { region: "Greater Accra Region", members: "12,500", change: "+10.5%", color: "bg-blue-400" },
        { region: "Western Region", members: "12,500", change: "+3.5%", color: "bg-green-400" },
        { region: "Volta Region", members: "10,500", change: "+3.5%", color: "bg-red-400" },
        { region: "Upper East Region", members: "2,500", change: "+3.5%", color: "bg-orange-400" },
        { region: "Ashanti Region", members: "1,500", change: "+3.5%", color: "bg-yellow-400" },
        { region: "Bono Region", members: "1,500", change: "+3.5%", color: "bg-green-800" },
        { region: "Central Region", members: "1,500", change: "+3.5%", color: "bg-blue-700" },
        { region: "Oti Region", members: "1,500", change: "+3.5%", color: "bg-red-200" },
        { region: "Savannah Region", members: "1,500", change: "+3.5%", color: "bg-yellow-400" },
        { region: "North East Region", members: "1,500", change: "+3.5%", color: "bg-orange-800" },
      ].map((r, i) => (
        <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <span className={`w-3 h-3 rounded-full ${r.color}`}></span>
            <div>
              <p className="font-medium">{r.region}</p>
              <p className="text-sm text-gray-500">{r.members} members</p>
            </div>
          </div>
          <span className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded-lg">
            {r.change}
          </span>
        </div>
      ))}
    </div>

    <p className="mt-4 text-sm text-gray-600">
      <strong>Total Coverage:</strong> 10 Regions, 42 Districts, 56 Locals
    </p>
  </CardContent>
</Card>

{/* Location Breakdown Table */}
<Card>
  <CardContent>
    <h2 className="text-lg font-semibold mb-4">Location Breakdown</h2>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Location</th>
            <th className="border p-2">Children</th>
            <th className="border p-2">Junior Youth</th>
            <th className="border p-2">Senior Youth</th>
            <th className="border p-2">Adults</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Male</th>
            <th className="border p-2">Female</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Greater Accra Region</td>
            <td className="border p-2">400</td>
            <td className="border p-2">200</td>
            <td className="border p-2">200</td>
            <td className="border p-2">120</td>
            <td className="border p-2">920</td>
            <td className="border p-2">400</td>
            <td className="border p-2">520</td>
          </tr>
          <tr>
            <td className="border p-2">Eastern Region</td>
            <td className="border p-2">340</td>
            <td className="border p-2">20</td>
            <td className="border p-2">110</td>
            <td className="border p-2">120</td>
            <td className="border p-2">920</td>
            <td className="border p-2">440</td>
            <td className="border p-2">520</td>
          </tr>
          <tr>
            <td className="border p-2">Central Region</td>
            <td className="border p-2">420</td>
            <td className="border p-2">206</td>
            <td className="border p-2">200</td>
            <td className="border p-2">120</td>
            <td className="border p-2">920</td>
            <td className="border p-2">400</td>
            <td className="border p-2">520</td>
          </tr>
          <tr>
            <td className="border p-2">volta Region</td>
            <td className="border p-2">400</td>
            <td className="border p-2">200</td>
            <td className="border p-2">200</td>
            <td className="border p-2">120</td>
            <td className="border p-2">920</td>
            <td className="border p-2">400</td>
            <td className="border p-2">520</td>
          </tr>
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>

{/* Bottom 3 Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Top 5 Growing Locals */}
  <Card>
    <CardContent>
      <h2 className="text-lg font-semibold mb-4">Top 5 Growing Locals</h2>
      <div className="space-y-3">
        {[
          { name: "Breakthrough Assembly", members: "1000 members - Accra", change: "+3.5%" },
          { name: "Legon Assembly", members: "1000 members - Accra", change: "+4.5%" },
          { name: "Mount Carmel Assembly", members: "800 members - Accra", change: "+2.5%" },
          { name: "Broke Assembly", members: "600 members - Accra", change: "+1.2%" },
          { name: "Cape Coast Assembly", members: "500 members - Central", change: "+6.0%" },
        ].map((local, i) => (
          <div key={i} className="flex justify-between items-center  pb-2">
            <div>
              <p className="font-medium">{local.name}</p>
              <p className="text-sm text-gray-500">{local.members}</p>
            </div>
            <span className="text-white rounded-lg bg-green-600 px-2 py-1 font-semibold">{local.change}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>

  {/* Inactive Locals */}
  <Card>
    <CardContent>
      <h2 className="text-lg font-semibold mb-4">Inactive Locals</h2>
      <div className="space-y-3">
        {[
          { name: "Breakthrough Assembly", members: "1000 members - Accra", inactive: "3 months ago" },
          { name: "Breakthrough Assembly", members: "1000 members - Accra", inactive: "2 months ago" },
          { name: "Breakthrough Assembly", members: "1000 members - Accra", inactive: "1 month ago" },
          { name: "Breakthrough Assembly", members: "1000 members - Accra", inactive: "1 month ago" },
        ].map((local, i) => (
          <div key={i} className="flex justify-between items-center  pb-2">
            <div>
              <p className="font-medium">{local.name}</p>
              <p className="text-sm text-gray-500">{local.members}</p>
            </div>
            <span className="bg-red-600 text-white rounded-lg  font-semibold">{local.inactive}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>

  {/* Progress */}
  <Card>
    <CardContent>
      <h2 className="text-lg font-semibold mb-4">Progress: Actual vs Target</h2>
      <div className="space-y-4">
        {[
          { label: "Annual Membership Target", value: "45,000/50,000", percent: "91.5%" },
          { label: "Youth Engagement Goal", value: "12,375/15,000", percent: "82.5%" },
          { label: "Regional Coverage", value: "9/10 Regions", percent: "90%" },
          { label: "Monthly Growth Rate", value: "6.25% / 7.5%", percent: "82.0%" },
        ].map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span className="font-semibold">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: item.percent }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">{item.percent}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</div>

    </div>
  );
}

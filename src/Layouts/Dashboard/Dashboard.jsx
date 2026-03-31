import {
  Banknote,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock5,
  Globe,
  Heart,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useAssembliesByCountry } from "../../hooks/useAssembliesByCountry.js";
import { useDashboardData } from "../../hooks/useDashboard.js";
import { useMinistryLeadersByAssembly } from "../../hooks/useMinistryLeadersByAssembly.js";
import { BirthdayCard } from "./birthday-card/BirthdayCard.jsx";
import StatCard from "./modals/StatCard.jsx";

export default function Dashboard() {
  const [formData, setFormData] = useState({});
  const { member } = useAuth();

  const country = member?.nationality;
  // console.log(member);
  const {
    data: assemblies,
    isLoading,
    error,
  } = useAssembliesByCountry(country);
  console.log(isLoading)
console.log(error)

  const selectedAssembly = formData?.localAssemblyName || "";

  const { data, isLoading: leadersLoading } =
    useMinistryLeadersByAssembly(selectedAssembly);
  const leaders = data?.leaders || [];
  console.log(leadersLoading);

  const isAllAssemblies =
    !selectedAssembly || selectedAssembly === "All Assemblies";

  const defaultMinistries = [
    { leadershipRole: "Worship Team" },
    { leadershipRole: "Children Ministry" },
    { leadershipRole: "Junior Youth" },
    { leadershipRole: "Prayer Ministry" },
  ];

  const {
    totalMembers,
    newMembers,
    birthdays,
    isLoading: dashboardLoading,
    isError: dashboardError,
    refetchBirthdays,
  } = useDashboardData();

  const birthdayRef = useRef(null);
  const scrollLeft = () => {
    birthdayRef.current.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    birthdayRef.current.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  return (
    <div className=" min-h-screen bg-[#F6F8FC] font-[DM Sans]  ">
      <main className="flex-1 mt-10">
        <div className="grid grid-cols-4 gap-6 mb-4">
          <StatCard
            icon={
              <Users className="w-7 h-7 text-[#43A501] bg-green-100 p-1.5 rounded-lg" />
            }
            title="Total Members"
            value={totalMembers ?? 0}
            color="green"
          />

          <StatCard
            icon={
              <User className="w-7 h-7 text-[#06A6DB] bg-blue-100 p-1.5 rounded-lg" />
            }
            title="New Members"
            value={newMembers.length}
            color="blue"
          />
          <StatCard
            icon={
              <TrendingUp className="w-7 h-7 text-[#9600D6] bg-violet-100 p-1.5 rounded-lg" />
            }
            title="Average Attendance"
            value="450"
            color="purple"
          />
          <StatCard
            icon={
              <Banknote className="w-7 h-7 text-[#FF8605] bg-orange-100 p-1.5 rounded-lg" />
            }
            title="Average Monthly Giving"
            value="GHS 20K"
            color="orange"
          />
        </div>

        {/* BIRTHDAYS + EVENTS */}
        <div className="grid grid-cols-[1.3fr_1fr] gap-6 mb-4">
          <div
            className={`rounded-2xl p-6 border ${
              birthdays.length > 0
                ? "bg-white border-gray-100"
                : "bg-orange-50 border-orange-100"
            }`}
          >
            {dashboardLoading && (
              <p className="text-sm text-gray-400">Loading birthdays...</p>
            )}

            {!dashboardLoading && dashboardError && (
              <p className="text-sm text-center text-gray-400">
                Failed to load birthdays{" "}
                <span
                  className="text-blue-600 font-bold text-md cursor-pointer"
                  onClick={refetchBirthdays}
                >
                  Try again
                </span>
              </p>
            )}

            {!dashboardLoading && !dashboardError && birthdays.length === 0 && (
              <p className="text-center text-xl mt-20 text-gray-400 w-full py-10">
                No birthdays today{" "}
                <span className="inline-block animate-bounce text-4xl">🎉</span>
              </p>
            )}

            {!dashboardLoading && !dashboardError && birthdays.length > 0 && (
              <div className="flex relative w-full gap-2">
                <button
                  onClick={scrollLeft}
                  className="absolute w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center z-10 top-30"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={scrollRight}
                  className="absolute w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center z-10 right-0 top-30"
                >
                  <ChevronRight size={16} />
                </button>

                <div
                  className="flex gap-4 overflow-hidden w-125"
                  ref={birthdayRef}
                >
                  {birthdays.map((member, index) => (
                    <div key={index} className="min-w-45 overflow-hidden">
                      <BirthdayCard
                        name={member.fullName}
                        age={member.ageTurning}
                        role={member.ministries?.[0] || "Member"}
                        daysRemaining={member.daysRemaining}
                        image={
                          member.imageId
                            ? `https://churchsoft-backend.onrender.com/church-soft/v1.0/images/${member.imageId}`
                            : member.gender === "MALE"
                              ? "https://www.parentlocker.com/go/img/flat-icons/17.png"
                              : "https://tse1.mm.bing.net/th/id/OIP.Kmc5cF6jKK_ibabYDDLyywHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* EVENTS */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-semibold">Upcoming Events</h2>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <EventCard
                title="Convention"
                location="Sarbah Hall, UG"
                date="4th April 2026 - 10th April 2026"
              />
              <EventCard
                title="PPASS"
                location="The Headquarters"
                date="15th April 2026 - 17th April 2026"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* ATTENDANCE */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-[18px] font-semibold">Attendance Trend</h2>
            <p className="text-[13px] text-gray-500 mb-4">
              Monthly attendance growth over the year
            </p>
            <div className="h-65 bg-linear-to-b from-purple-100 to-transparent rounded-xl" />
          </div>

          {/* NEWS */}
          <div className="bg-white  rounded-2xl p-6">
            <h2 className="text-[20px] font-semibold mb-4">News</h2>
            <NewsItem
              title="GCCI has a new President!"
              image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              parag="The Great Commission church has elected Rev. S.V. Ansah as the new president. Read More"
            />
            <NewsItem
              title="GCCI makes a donation"
              parag="The GCCI makes a massive donation to the deaf and blind in the Central region. Read More"
              image="https://www.shutterstock.com/image-photo/male-volunteer-giving-food-donations-260nw-2467626911.jpg"
            />
            <NewsItem
              title="New Building, New Members!!!"
              parag="Massive building put up by the Great Commission church. Read More"
              image="https://th.bing.com/th/id/R.6fa09451c69ff1379a67dea9d98fd694?rik=0VQM%2fdM2LxnuOw&riu=http%3a%2f%2fhiddenarchitecture.net%2fwp-content%2fuploads%2f2015%2f05%2fewr-1024x1024.jpg&ehk=1vt2%2fSWqgB%2bd2egxY3QuCQL5EtMch759cLMLbZjlhwU%3d&risl=&pid=ImgRaw&r=0"
            />
          </div>

          {/* MINISTRY */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-semibold">Ministry Groups</h2>
              <select
                value={formData.localAssemblyName || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    localAssemblyName: e.target.value,
                  }))
                }
                className="border border-gray-300 rounded-md mr-2 text-center py-2 text-black text-sm w-40 bg-white relative "
              >
                <option value="">All Assemblies</option>

                {assemblies?.map((assembly) => (
                  <option key={assembly} value={assembly}>
                    {assembly}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-4">
              {(isAllAssemblies
                ? defaultMinistries
                : leaders?.length > 0
                  ? leaders
                  : [{ name: "----", leadershipRole: "Ministry Group" }]
              ).map((item) => (
                <Ministry
                  key={item.leadershipRole}
                  title={item.leadershipRole}
                  leader={isAllAssemblies ? "----" : item.name}
                  count="-"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function EventCard({ title, location, date }) {
  return (
    <div className="flex flex-col bg-[#EEF2FF] rounded-xl p-6">
      <h4 className="text-[15px] font-semibold mb-2 text-center bg-white px-2 py-1 rounded-full">
        {title}
      </h4>
      <div className="flex  mb-2 align-center">
        <BookOpen className="h-10 w-10 text-fuchsia-600 " />
        <p className="text-[15px] mb-2">He that waits upon the lord</p>
      </div>
      <div className="flex justify-center mb-2  align-center">
        <Globe className="h-5 w-5 text-fuchsia-600 " />
        <p className="text-[13px]">{location}</p>
      </div>
      <div className="flex justify-center mb-2 align-center">
        <Clock5 className="h-15 w-10 text-fuchsia-600 " />
        <p className="text-[13px] mt-1">{date}</p>
      </div>
    </div>
  );
}

function NewsItem({ title, image, name, parag }) {
  return (
    <div className="mb-9 gap-2 flex text-center align-center justify-">
      <img
        src={image}
        alt={name}
        className="h-10 w-10 object-cover rounded-xl mb-3"
      />
      <div className=" ">
        <h4 className="text-[15px] text-start font-semibold">{title}</h4>
        <p className="text-[10px] text-start text-gray-600">{parag}</p>
        <p className="text-[15px] text-start text-gray-500">3 hours ago</p>
      </div>
    </div>
  );
}

function Ministry({ title, leader, count }) {
  return (
    <div className="flex items-center justify-between border rounded-xl p-4">
      {<Heart color={"#9810FA"} size={16} />}
      <div>
        <h4 className="text-[15px] font-semibold">{title}</h4>
        <p className="text-[12px] text-gray-500">
          Led by : <span className=" text-black">{leader}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-[14px]">
        {" "}
        <Users size={16} /> {count}
      </div>
    </div>
  );
}

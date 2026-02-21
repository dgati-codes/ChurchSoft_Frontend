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

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F6F8FC] font-[DM Sans]">
      <main className="flex-1 mt-10">
        <div className="grid grid-cols-4 gap-6 mb-4">
          <Stat
            icon={
              <Users className="w-7 h-7 text-[#43A501] bg-green-100 p-1.5 rounded-lg" />
            }
            title="Total Members"
            value="25,000"
            color="green"
          />
          <Stat
            icon={
              <User className="w-7 h-7 text-[#06A6DB] bg-blue-100 p-1.5 rounded-lg" />
            }
            title="New Members"
            value="300"
            color="blue"
          />
          <Stat
            icon={
              <TrendingUp className="w-7 h-7 text-[#9600D6] bg-violet-100 p-1.5 rounded-lg" />
            }
            title="Average Attendance"
            value="450"
            color="purple"
          />
          <Stat
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
          {/* BIRTHDAYS */}
          <div className="bg-white rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-4">
              <BirthdayCard
                name="Kofi Annan"
                age="26"
                role="Worship Team"
                image="https://thumbs.dreamstime.com/b/portrait-view-regular-happy-smiling-niger-man-ultra-realistic-candid-social-media-avatar-image-plain-solid-background-338037856.jpg"
              />
              <BirthdayCard
                name="Rhoda Tuckson"
                age="22"
                role="Junior Youth"
                image="https://tse2.mm.bing.net/th/id/OIP.-OD0dCrXXOQenE_Y6CaiXQHaJQ?w=1440&h=1800&rs=1&pid=ImgDetMain&o=7&rm=3"
              />
              <BirthdayCard
                name="Gloria Pamela"
                age="25"
                role="Worship Team"
                image="https://tse1.mm.bing.net/th/id/OIP.bjD1_yD-tJ6aJyCAjPfaBwHaLG?w=1707&h=2560&rs=1&pid=ImgDetMain&o=7&rm=3"
              />
            </div>
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
            <div className="h-[260px] bg-linear-to-b from-purple-100 to-transparent rounded-xl" />
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
              <select className="border rounded-full px-3 py-1 text-[13px]">
                <option>Bride Assembly</option>
              </select>
            </div>

            <div className="space-y-4">
              <Ministry title="Worship Team" leader="Sarah Mensah" count="24" />
              <Ministry
                title="Children Ministry"
                leader="Celine Abbie"
                count="50"
              />
              <Ministry
                title="Junior Youth"
                leader="James Allortey"
                count="40"
              />
              <Ministry
                title="Prayer Ministry"
                leader="James Allortey"
                count="40"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ title, icon, value, color }) {
  const map = {
    green: "border-green-400",
    blue: "border-blue-400",
    purple: "border-purple-400",
    orange: "border-orange-400",
  };

  return (
    <div className={`bg-white border ${map[color]} rounded-2xl p-5`}>
      <div className="flex justify-between align-center">
        <p className="text-[13px] text-gray-500">{title} </p>
        {icon}
      </div>
      <h3 className="text-[24px] font-semibold mt-2">{value}</h3>
    </div>
  );
}

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
        <p className="text-[12px] text-gray-500">Led by {leader}</p>
      </div>
      <div className="flex items-center gap-2 text-[14px]">
        {" "}
        <Users size={16} /> {count}
      </div>
    </div>
  );
}

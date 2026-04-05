import { BookOpen, Clock5, Globe } from "lucide-react";

function Events() {
  return (
    <>
      <div className="flex justify-center mt-10">
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
    </>
  );
}

export default Events;

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

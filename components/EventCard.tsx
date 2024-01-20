import formatDateTime from "@/utils/formatDateTime";
import React from "react";

interface event {
  Title: string;
  Type: string;
  Dates: string[];
  Image: string;
  Description: string;
}

interface Props {
  event: event;
  date: string;
  idx: number;
}

export default function EventCard({ event, date, idx }: Props) {
  const { month, day, year, dayOfWeek, hours, minutes, AMPM } =
    formatDateTime(date);

  return (
    <div
      key={idx}
      className="p-10 bg-gray-300 rounded flex lg:flex-row flex-col lg:items-start items-center gap-5"
    >
      {/* image container */}
      <div className="sm:h-60 sm:w-60 h-44 w-44">
        <img
          src={event.Image}
          alt={event.Title + " thumbnail"}
          className="object-cover h-full w-full rounded"
        />
      </div>
      {/* content container */}
      <div>
        <h1 className="text-cyan-600 text-2xl sm:text-start text-center font-serif">
          {event.Title}
        </h1>
        <h2 className="sm:text-start text-center">{event.Type}</h2>

        <div className="py-6 flex gap-2 font-bold text-sm">
          <div>{dayOfWeek}</div>
          <div>
            {month}/{day}/{year}
          </div>
          <div>
            {hours}:{minutes} {AMPM}
          </div>
          <div>PST</div>
        </div>

        <div>{event.Description}</div>
      </div>
    </div>
  );
}

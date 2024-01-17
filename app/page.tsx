"use client";

import formatDateTime from "@/utils/formatDateTime";
import { useEffect, useState } from "react";

interface event {
  Title: string;
  Type: string;
  Dates: string[];
  Image: string;
  Description: string;
}

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("data/events.json");
    const data = await res.json();
    setEvents(data);
  };

  return (
    <div>
      <div className="flex justify-center w-full">
        <h1 className="text-4xl">Bob's Orchestra Hall</h1>
      </div>
      <div className="data-container flex flex-col gap-4">
        {events.length > 0 ? (
          events.map((event: event, idx) => (
            <div key={idx} className="p-2 bg-red-100">
              <h1 className="text-cyan-600">{event.Title}</h1>
              <div>{event.Type}</div>
              {event.Dates.map((dateTime: string, idx) => {
                const { month, day, year, hours, minutes, AMPM } =
                  formatDateTime(dateTime);

                return (
                  <div key={idx} className="p-2 flex gap-2">
                    <div>
                      {month}/{day}/{year}
                    </div>

                    <div>
                      {hours}:{minutes} {AMPM}
                    </div>
                    <div>PST</div>
                  </div>
                );
              })}
              <div>{event.Image}</div>
              <div>{event.Description}</div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

"use client";

import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";

export interface event {
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
      <div className="flex justify-center w-full">
        <input type="text" placeholder="Search Events" />
      </div>
      <div className="flex justify-center">
        <div className="data-container flex flex-col gap-4">
          {events.length > 0 ? (
            <div>
              {/* iterate through all events */}
              {events.map((event: event) => {
                return (
                  <div>
                    {/* iterate through all dates in an individual event */}
                    {event.Dates.map((date, idx) => (
                      <EventCard event={event} date={date} idx={idx} />
                    ))}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

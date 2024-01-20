"use client";

import EventCard from "@/components/EventCard";
import Reveal from "@/components/Reveal";
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
      <div id="banner" className="flex justify-center items-center w-full h-40">
        <h1 className="text-4xl sm:text-6xl text-white z-20 font-serif bg-slate-600 bg-opacity-50 p-3 rounded">
          Bob's Orchestra Hall
        </h1>
      </div>
      <div className="flex justify-center p-5">
        <div className="data-container flex flex-col gap-4">
          {events.length > 0 ? (
            <div className="flex flex-col gap-2">
              {/* iterate through all events */}
              {events.map((event: event) => {
                return (
                  <div className="flex flex-col gap-2">
                    {/* iterate through all dates in an individual event */}
                    {event.Dates.map((date, idx) => (
                      <Reveal delay={0.2}>
                        <EventCard event={event} date={date} idx={idx} />
                      </Reveal>
                    ))}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="font-serif text-3xl">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

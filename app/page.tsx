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
  const [error, setError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch("data/events.json");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div>
      <div id="banner" className="flex justify-center items-center w-full h-40">
        <h1 className="text-4xl sm:text-6xl text-white z-20 font-serif bg-slate-600 bg-opacity-50 p-3 rounded">
          Bob's Orchestra Hall
        </h1>
      </div>

      <div id="section-title" className="text-center py-3">
        <h2 className="text-3xl font-serif underline">Schedule</h2>
        <p className="italic">All Times Reflect Seattle, WA Timezone (PST)</p>
      </div>

      <div className="flex justify-center p-5">
        <div className="data-container flex flex-col gap-4">
          {events.length > 0 && !error ? (
            <div id="events-container" className="flex flex-col gap-2">
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
          ) : !error ? (
            <div className="font-serif text-3xl">Loading...</div>
          ) : (
            // error handling
            <div className="font-serif text-red-400 text-2xl">
              Sorry, There Was An Error On Our End.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

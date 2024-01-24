"use client";

import EventCard from "@/components/EventCard";
import Reveal from "@/components/Reveal";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  let stagger = 0;

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
    <div className="flex h-screen md:flex-row flex-col">
      <div className="lg:w-1/3 md:w-1/2 w-full h-full flex items-center justify-center flex-col md:relative">
        <div className="md:fixed">
          <div className="flex flex-col gap-20 text-white md:text-start text-center">
            <div id="title">
              <Reveal delay={0.3} left={true}>
                <h1 className="text-8xl">Bob's</h1>
              </Reveal>
              <Reveal delay={0.6} left={true}>
                <h1 className="text-8xl">Orchestra</h1>
              </Reveal>
              <Reveal delay={0.9} left={true}>
                <h1 className="text-8xl">Hall</h1>
              </Reveal>
            </div>
            <Reveal delay={1.5}>
              <div>
                <h3>View the best of Orchestra here in Seatle, WA!</h3>
                <h3 className="italic">All Times are PST</h3>
                <p>Click Individual Cards to Read More</p>
                {/* <Modal /> */}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      {/* card */}
      {events.length > 0 && !error ? (
        <div className="lg:w-2/3 md:w-1/2 w-full h-fit p-10 flex flex-wrap gap-5 justify-center">
          {events.map((event: event) => {
            return event.Dates.map((date: string) => {
              const formattedDate = new Date(date);
              stagger += 0.2;

              return (
                <Reveal delay={1.7 + stagger} right={true}>
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.2 },
                      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.4)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-80 h-96 bg-slate-300 rounded-lg p-5 border border-4 border-solid border-gray-500"
                  >
                    <img
                      src={event.Image}
                      alt={event.Title + " thumbnail"}
                      className="object-cover h-32 w-full rounded"
                    />
                    <h2 className="text-center text-2xl">{event.Title}</h2>
                    <h2 className="text-center text-md">{event.Type}</h2>
                    <div className="p-5">
                      <h2 className="text-center text-md">
                        {formattedDate.toLocaleTimeString("en-US")}
                      </h2>
                      <h2 className="text-center text-md">
                        {formattedDate.toLocaleDateString("en-US")}
                      </h2>
                    </div>
                    <p className="text-center text-xs">
                      {event.Description.slice(0, 75)}
                      {event.Description.length > 75 && "..."}
                    </p>
                  </motion.button>
                </Reveal>
              );
            });
          })}
        </div>
      ) : !error ? (
        <div className="w-2/3 p-10 flex flex-wrap gap-5 justify-center">
          <div className="font-serif text-3xl text-white">Loading...</div>
        </div>
      ) : (
        // error handling
        <div className="w-2/3 p-10 flex flex-wrap gap-5 justify-center">
          <div className="font-serif text-red-200 text-2xl">
            Sorry, There Was An Error On Our End.
          </div>
        </div>
      )}
    </div>
  );
}

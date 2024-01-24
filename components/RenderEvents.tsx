import React from "react";
import Reveal from "./Reveal";
import { motion } from "framer-motion";
import ChakraUIModal from "./Modal";

export interface event {
  Title: string;
  Type: string;
  Dates: string[];
  Image: string;
  Description: string;
}

export default function RenderEvents({ data }) {
  return (
    <div className="flex w-full flex-wrap justify-center gap-3">
      {data.length > 0 ? (
        data.map((event: event) => {
          return event.Dates.map((date: string) => {
            const formattedDate = new Date(date);

            return (
              <Reveal delay={0} right={true}>
                <ChakraUIModal
                  data={event}
                  card={
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
                      <h2 className="text-center text-2xl text-wrap">
                        {event.Title}
                      </h2>
                      <h2 className="text-center text-md text-wrap">
                        {event.Type}
                      </h2>
                      <div className="p-5 text-wrap">
                        <h2 className="text-center text-md">
                          {formattedDate.toLocaleTimeString("en-US")}
                        </h2>
                        <h2 className="text-center text-md">
                          {formattedDate.toLocaleDateString("en-US")}
                        </h2>
                      </div>
                      <p className="text-center text-sm text-wrap">
                        {event.Description.slice(0, 75)}
                        {event.Description.length > 75 && "..."}
                      </p>
                    </motion.button>
                  }
                />
              </Reveal>
            );
          });
        })
      ) : (
        <div className="text-white text-2xl text-center">
          Sorry! There are no events matching that query!
        </div>
      )}
    </div>
  );
}

"use client";

import Reveal from "@/components/Reveal";
import { useEffect, useMemo, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { selectSearch, store } from "@/utils/store";
import SearchBox from "@/components/SearchSection";
import RenderEvents from "@/components/RenderEvents";

export interface event {
  Title: string;
  Type: string;
  Dates: string[];
  Image: string;
  Description: string;
}

function Home() {
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

  const search = useSelector(selectSearch);
  const filterAndSortEvents = useMemo(
    () =>
      (events || [])
        .filter((event) =>
          event.Title.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 10)
        .sort((a, b) => a.Title.localeCompare(b.Title)),
    [events, search]
  );

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
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      {/* card */}
      {events.length > 0 && !error ? (
        <div className="lg:w-2/3 md:w-1/2 w-full h-fit p-10 flex flex-wrap gap-5 justify-center">
          <SearchBox data={filterAndSortEvents} />
          <RenderEvents data={filterAndSortEvents} />
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

export default function Page() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

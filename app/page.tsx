"use client";

import Reveal from "@/components/Reveal";
import { useEffect, useMemo, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { selectSearch, store } from "@/utils/store";
import SearchBox from "@/components/SearchSection";
import RenderEvents from "@/components/RenderEvents";
import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react";
import ChakraUIModal from "@/components/Modal";
import MediaPlayer from "@/components/MediaPlayer/MediaPlayer";

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
    <div className="flex h-screen lg:flex-row flex-col">
      <div className="xl:w-1/3 lg:w-1/2 w-full h-full flex items-center justify-center flex-col md:relative">
        <div className="lg:fixed">
          <div className="flex flex-col gap-20 text-white lg:text-start text-center">
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
              <div className="flex flex-col gap-4">
                <div>
                  <h3>View the Best of Orchestra Here in Seatle, WA!</h3>
                  <h3 className="italic">All Times are PST</h3>
                </div>
                <div>
                  <p>Search to Filter Out Events!</p>
                  <p>Click on an Event for More Information.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1.5}>
              <div>
                <a
                  href="https://github.com/noahfajarda/Bobs-Orchestra-Hall-Event-Listings"
                  target="_blank"
                  className="hover:text-slate-800 hover:bg-white inline rounded py-4 cursor-pointer transition-all"
                >
                  Project Repository 👉
                </a>
              </div>
            </Reveal>
            <Reveal delay={1.5}>
              <MediaPlayer />
            </Reveal>
          </div>
        </div>
      </div>
      {/* card */}
      {events.length > 0 && !error ? (
        <div className="xl:w-2/3 lg:w-1/2 w-full h-fit p-10 flex flex-wrap gap-5 justify-center">
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

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
});

export default function Page() {
  return (
    <Provider store={store}>
      <ChakraBaseProvider theme={theme}>
        <Home />
      </ChakraBaseProvider>
    </Provider>
  );
}

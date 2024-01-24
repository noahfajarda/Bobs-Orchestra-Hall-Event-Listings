import { selectSearch, setSearch } from "@/utils/store";
import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SearchBox({ data }) {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  return (
    <input
      className="mt-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-800 focus:ring-indigo-800 sm:text-lg p-2"
      placeholder="Search For An Event"
      value={search}
      onChange={(e) => {
        dispatch(setSearch(e.target.value));
      }}
    />
  );
}

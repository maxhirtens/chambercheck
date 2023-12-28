"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  function handleSearch(term: string) {
    // add search functionality here
    console.log(term);
  }

  return (
    <div className="flex relative mx-8">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="rounded-md border border-gray-200 pl-10 text-sm outline-2 placeholder:text-gray-500"
        id="search"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

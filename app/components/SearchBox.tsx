"use client";
import Subtitle from "./Subtitle";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
    <div>
      <Subtitle text="Search for a Restaurant" />
      <MagnifyingGlassIcon className="w-12" />
    </div>
  );
}

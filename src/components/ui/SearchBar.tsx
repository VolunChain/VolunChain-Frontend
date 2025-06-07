"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-96">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="h-12 w-full rounded-lg bg-transparent pl-5 pr-14 text-lg dark:text-white placeholder-gray-400 border border-gray-800 focus:outline-none focus:border-[#7DD3FC] focus:ring-1 focus:ring-[#7DD3FC]"
      />
      <div className="absolute right-[6px] top-[6px]">
        <button
          type="button"
          className="flex h-[36px] w-[36px] items-center justify-center rounded-md bg-[#7DD3FC] text-gray-900 transition-colors"
          onClick={() => {}}
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

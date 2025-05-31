"use client";

import { useComponentQueryParams } from "@/hooks/useComponentQueryParams";

export default function FilterComponent() {
  const {
    queryParams: { page = 1, tab = "all" },
    setQueryParams,
    resetQueryParams,
  } = useComponentQueryParams({
    defaults: {
      page: 1 as number,
      tab: "all" as "all" | "recent" | "popular" | "saved",
    },
  });

  return (
    <section>
      <div>
        <h2 className="text-lg">Current Tab: {tab}</h2>
        <div className="flex gap-4">
          <button
            className={`px-4 py-1 text-sm  rounded-lg bg-slate-700 duration-300 ${
              tab == "recent" && "border border-slate-500 !bg-slate-800"
            }`}
            onClick={() => setQueryParams({ tab: "recent" })}
          >
            Recent
          </button>
          <button
            className={`px-4 py-1 text-sm  rounded-lg bg-slate-700 duration-300 ${
              tab == "popular" && "border border-slate-500 !bg-slate-800"
            }`}
            onClick={() => setQueryParams({ tab: "popular" })}
          >
            Popular
          </button>
          <button
            className={`px-4 py-1 text-sm  rounded-lg bg-slate-700 duration-300 ${
              tab == "saved" && "border border-slate-500 !bg-slate-800"
            }`}
            onClick={() => setQueryParams({ tab: "saved" })}
          >
            Saved
          </button>
        </div>

        <div className="mt-5">
          <h2>Current Page: {page}</h2>
          <div className="flex items-center gap-4">
            <button
              className={`px-4 py-1 text-sm  rounded-lg bg-slate-700 duration-30`}
              onClick={() =>
                page > 1 && setQueryParams({ page: Number(page) - 1 })
              }
            >
              Prev Page
            </button>
            <button
              className={`px-4 py-1 text-sm  rounded-lg bg-slate-700 duration-30`}
              onClick={() => setQueryParams({ page: Number(page) + 1 })}
            >
              Next Page
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className={`px-8 py-2  rounded-lg bg-neutral-300 text-black  duration-30 hover:opacity-80`}
            onClick={resetQueryParams}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

import FilterComponent from "@/components/test-comp";

const TestPage = () => {
  return (
    <main className="grid place-items-center h-screen">
      <div className="space-y-3">
        <h1 className="text-2xl font-black">Test page</h1>
        <div className="w-full">
          This is a demo page to test the{" "}
          <code className="bg-black text-xs font-mono px-4 py-2 border border-neutral-800 rounded-lg">
            useComponentQueryParams
          </code>{" "}
          hook
        </div>
        <div className="mt-5">
          <FilterComponent />
        </div>
      </div>
    </main>
  );
};

export default TestPage;

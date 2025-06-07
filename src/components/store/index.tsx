import RightSide from "./right-side";

const LeftSide = () => {
  return (
    <div className="bg-[#0a0b17] p-6 rounded-xl">
      <h2 className="text-xl font-semibold dark:text-white mb-4">Left Side</h2>
      <p className="text-gray-400">This is the left side component.</p>
    </div>
  );
};

export default function StoreComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <LeftSide />
        </div>
        <div className="md:col-span-6">
          <RightSide />
          <RightSide />
        </div>
        <div className="md:col-span-3"></div>
      </div>
    </div>
  );
}

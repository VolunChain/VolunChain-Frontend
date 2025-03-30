import Image from "next/image";

export default function DogProfileCard() {
  const recommendedProfiles = [
    {
      name: "DripFishNFTs",
      description: "Ocean cleaning services",
      image: "/store/drip-fisshes.png",
    },
    {
      name: "Black Bear Association",
      description: "Endangered species",
      image: "/store/black-bear.png",
    },
    {
      name: "Featherss",
      description: "Protecting endangered species",
      image: "/store/featherss.png",
    },
    {
      name: "Jaguaria",
      description: "Wildlife conservation",
      image: "/store/jaguaria.png",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm overflow-hidden rounded-lg bg-gray-900 shadow-lg mb-2">
        <div className="h-24 bg-amber-300 relative">
          <Image
            src="/store/dog.png"
            alt="Dog Goods Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="px-6 py-4 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="rounded-full bg-white p-1 shadow-md">
              <div className="rounded-full bg-blue-100 p-3 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full  flex items-center justify-center relative">
                  <Image
                    src="/store/dog-logo.png"
                    alt="Dog Goods Logo"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-white">
              Dog Goods for Good Dogs
            </h3>
            <p className="text-sm text-gray-400">@good_goods</p>
          </div>

          <div className="flex justify-between mt-6 text-center">
            <div className="flex-1">
              <p className="text-lg font-bold text-white">231k</p>
              <p className="text-xs text-gray-400">Followers</p>
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-white">321</p>
              <p className="text-xs text-gray-400">Posts</p>
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-white">34</p>
              <p className="text-xs text-gray-400">NFTs</p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="px-[8rem] py-1.5 bg-[#2795DD] hover:bg-blue-600 text-blue-600 hover:text-white font-medium rounded-full transition-colors border-2 border-[#2795DD] text-sm">
              Follow
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm overflow-hidden rounded-lg bg-gray-900 shadow-lg p-6 mb-2">
        <h3 className="text-lg font-semibold text-white mb-2">About</h3>
        <p className="text-sm text-gray-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting.
        </p>
      </div>

      <div className="w-full max-w-sm overflow-hidden rounded-lg bg-gray-900 shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">People also like</h3>
          <a href="#" className="text-sm text-sky-500 hover:text-blue-400">
            See All
          </a>
        </div>

        <div className="space-y-4">
          {recommendedProfiles.map((profile, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 mr-3">
                  <Image
                    src={profile.image || "/placeholder.svg"}
                    alt={profile.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {profile.name}
                  </p>
                  <p className="text-xs text-gray-400">{profile.description}</p>
                </div>
              </div>
              <a href="#" className="text-xs text-sky-500 hover:text-blue-400">
                Check Out
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

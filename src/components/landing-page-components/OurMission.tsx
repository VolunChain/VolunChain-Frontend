import Image from "next/image";

const OurMission = () => {
  return (
    <section className="mt-16 py-16 px-6">
      <div className="container mx-auto text-center max-w-5xl">
        <div className="mb-8">
          <h2 className="text-2xl text-[#73B9EB] mb-2">Our Mission</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            Revolutionizing Volunteerism <br /> with Blockchain
          </h3>
        </div>

        <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
          By using blockchain’s transparency and efficiency, we connect
          volunteers with organizations, fostering collaboration and impactful
          experiences in a secure and scalable ecosystem.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-[#0F112B] rounded-[30px] p-8">
          <div className="relative overflow-hidden w-full md:w-1/2 max-w-md">
            <Image
              src="/ourMission.png"
              alt="Illustration of volunteers"
              width={500}
              height={500}
              className="object-cover object-top w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <ul className="text-left text-gray-300 space-y-12 md:w-1/2">
            <li className="flex items-start gap-4">
              <div className="bg-[#73B9EB] p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#0F112B"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <p>We bridge the gap between individuals and organizations.</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-[#73B9EB] p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#0F112B"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <p>
                Motivating engagement rewarding volunteers with innovative
                incentives like NFT collectibles to recognize and inspire their
                contributions.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-[#73B9EB] p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#0F112B"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <p>
                Create an impact developing a scalable, community-driven
                platform where volunteering is accessible and rewarding for
                everyone.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OurMission;

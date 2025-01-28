import Button from "../ui/Button";

type Props = {};

const stats = [
  {
    value: "260",
    label: "Foundations",
  },
  {
    value: "960",
    label: "Users",
  },
  {
    value: "231",
    label: "Succesful Volunteers",
  },
  {
    value: "10k",
    label: "People Helped",
  },
];

const StartSection = (props: Props) => {
  return (
    <section className="text-white py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-12">
            {/* Left content area */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-6 lg:max-w-[50ch]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl leading-tight">
                Our app connects foundations with volunteers, creating impactful
                opportunities for both.
              </h3>
              <p className="text-grey text-sm sm:text-base md:text-lg">
                We will help you to achieve the same as a company or volunteer!
              </p>
              <Button
                variant="primary"
                textColor="black"
                type="button"
                className="w-full sm:w-auto"
              >
                Let&apos;s get started
              </Button>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full lg:w-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#0F112B] rounded-lg p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-kantumruy font-semibold">
                    {stat.value}
                    <span className="text-blue">+</span>
                  </p>
                  <p className="text-xs sm:text-sm md:text-base font-kantumruy mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartSection;

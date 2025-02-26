import { VolunteerCard } from "@/components/volunteering/apply/VolunteerCard";

const mockData = {
  title: "ArkSpace",
  subTitle: "Social services for people",
  description: "Lorem ipsum is simply dummy text of the printing and typesetting of the industry.",
  about: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  views: 5226,
  likes: 345,
  tags: ["Animal Welfare", "Social Services"],
  image: "/images/volunteering-apply/apply-demo.png",
  logo: "/images/volunteering-apply/arkspace-logo.png"
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-background-primary py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-[38%_60%] gap-8">
        <VolunteerCard {...mockData} />
        <div className="bg-[#0F112A] rounded-[40px]">
          {/* Contenido del formulario irá aquí */}
        </div>
      </div>
    </div>
  );
} 
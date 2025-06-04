import Image from "next/image";
import { Heart, MessageSquare, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

type PostProps = {
  organization: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: {
    title: string;
    body: string;
    image?: string;
  };
  engagement: {
    likes: string;
    comments: boolean;
  };
  tags: {
    label: string;
    color: string;
  }[];
};

const post: PostProps = {
  organization: {
    name: "Dog Goods for Good Dogs",
    handle: "@dog_goods",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  content: {
    title: "Join us this week for a great experience with the doggos!",
    body: "We will be giving food to them and raising money for the cause this weekend.",
    image: "/placeholder.svg?height=400&width=800",
  },
  engagement: {
    likes: "23.1k",
    comments: true,
  },
  tags: [
    { label: "Social Services", color: "" },
    { label: "Animal Welfare", color: "" },
  ],
};

export default function RightSide() {
  return (
    <div className="relative flex flex-col w-full bg-[#0F112B] p-8 rounded-xl">
      <div className="mb-3 flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={post.organization.avatar || "/placeholder.svg"}
            alt={post.organization.name}
            width={60}
            height={60}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-semibold text-blue-300 cursor-pointer">
            {post.organization.name}
          </h2>
          <p className="text-sm text-gray-400">{post.organization.handle}</p>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="text-xl font-semibold dark:text-white mb-1">
          {post.content.title}
        </h1>
        <p className="text-gray-400">{post.content.body}</p>
      </div>

      {post.content.image && (
        <div className="w-full mb-4 overflow-hidden rounded-lg aspect-[2/1]">
          <Image
            src={post.content.image || "/placeholder.svg"}
            alt="Post image"
            width={600}
            height={300}
            className="w-full object-cover"
            priority={true}
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-8 min-w-[200px]">
          <button className="flex items-center gap-2 dark:text-white text-gray-600 hover:text-red-500">
            <Heart className="h-6 w-6" />
            <span className="text-base">{post.engagement.likes}</span>
          </button>
          {post.engagement.comments && (
            <button className="flex items-center gap-2 dark:text-white text-gray-600 hover:text-gray-100">
              <MessageSquare className="h-6 w-6" />
              <span className="text-base">Comments</span>
            </button>
          )}
        </div>
        <div className="flex gap-3 flex-wrap min-w-[200px]">
          {post.tags.map((tag) => (
            <span key={tag.label}>
              <Button
                textColor="black"
                variant="tertiary"
                className="rounded-full bg-blue-500 border-blue-500 text-black px-8 py-2 flex items-center gap-2 text-base"
              >
                {tag.label}
              </Button>
            </span>
          ))}
        </div>
        <div className="sm:ml-0">
          <Button
            textColor="blue"
            variant="outline"
            className="rounded-full border-blue-500 px-8 py-2 flex items-center gap-2 text-base bg-transparent hover:bg-blue-500 hover:dark:text-white transition-colors"
          >
            <Plus className="h-5 w-5 force-blue-text" />
            <span className="force-blue-text">Follow</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useView } from "@/lib/view-context";
import { storyUsers } from "@/lib/mock-data";
import { Plus } from "lucide-react";
import { useRef } from "react";

export default function StoryBar() {
  const { navigate } = useView();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide py-3 px-1">
        {/* Create story */}
        <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
          <div className="w-16 h-16 rounded-full redbee-gradient-bg flex items-center justify-center">
            <Plus className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">Your Story</span>
        </div>

        {/* Story users - 30 users moving slowly */}
        {storyUsers.map((user) => (
          <button
            key={user.id}
            onClick={() => navigate("provider-page", { userId: user.id })}
            className="flex flex-col items-center gap-1 shrink-0 group"
          >
            <div className="relative">
              <div className={`w-16 h-16 rounded-full p-[2px] ${user.isOnline ? "redbee-gradient-bg" : "bg-muted"}`}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover border-2 border-card"
                />
              </div>
              {user.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card status-online animate-pulse-dot" />
              )}
            </div>
            <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-[64px]">
              {user.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { MockUser } from "@/lib/mock-data";
import { useView } from "@/lib/view-context";
import { BadgeCheck, Star, MapPin, Users, Phone, MessageSquare, Video as VideoIcon } from "lucide-react";

interface ProfileHoverCardProps {
  user: MockUser;
  children: React.ReactNode;
}

export default function ProfileHoverCard({ user, children }: ProfileHoverCardProps) {
  const { navigate } = useView();
  const [show, setShow] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const ref = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    timeout.current = setTimeout(() => setShow(true), 400);
  };
  const handleLeave = () => {
    clearTimeout(timeout.current);
    setShow(false);
  };

  return (
    <div className="relative inline-block" ref={ref} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Cover */}
          <div className="h-20 overflow-hidden">
            <img src={user.coverPhoto} alt="" className="w-full h-full object-cover" />
          </div>
          {/* Avatar */}
          <div className="-mt-8 px-4">
            <div className="relative inline-block">
              <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full border-3 border-card object-cover" />
              {user.isOnline && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full status-online border-2 border-card" />}
            </div>
          </div>
          <div className="px-4 pb-3 pt-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="font-semibold text-sm text-foreground">{user.name}</span>
              {user.isVerified && <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />}
              {user.role !== "user" && (
                <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-bold uppercase">{user.role}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">@{user.username}</p>
            {user.service && <p className="text-xs text-primary font-medium mt-1">{user.service}</p>}
            <p className="text-xs text-foreground/70 mt-1 line-clamp-2">{user.bio}</p>

            <div className="flex items-center gap-4 mt-2 text-xs">
              <span className="text-foreground"><strong>{user.followers.toLocaleString()}</strong> <span className="text-muted-foreground">Followers</span></span>
              <span className="text-foreground"><strong>{user.following.toLocaleString()}</strong> <span className="text-muted-foreground">Following</span></span>
            </div>

            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-secondary fill-secondary" />{user.rating}</span>
              <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{user.location}</span>
            </div>

            <div className="flex gap-2 mt-3">
              <button onClick={() => navigate("provider-page", { userId: user.id })}
                className="flex-1 py-1.5 rounded-lg redbee-gradient-bg text-primary-foreground text-xs font-semibold">
                View Profile
              </button>
              <button onClick={() => navigate("messenger", { chatWith: user.id })}
                className="flex-1 py-1.5 rounded-lg bg-muted text-foreground text-xs font-semibold hover:bg-accent">
                Message
              </button>
            </div>

            {user.role !== "user" && (
              <div className="flex gap-1 mt-2">
                <a href={`tel:${user.phone.replace(/\s/g, "")}`} className="contact-btn flex-1 bg-primary/10 text-primary text-[10px]"><Phone className="w-3 h-3" /> Call</a>
                <a href={`https://wa.me/${user.phone.replace(/[\s+]/g, "")}`} target="_blank" rel="noreferrer"
                  className="contact-btn flex-1 bg-green-500/10 text-green-400 text-[10px]"><MessageSquare className="w-3 h-3" /> WhatsApp</a>
                <button className="contact-btn flex-1 bg-blue-500/10 text-blue-400 text-[10px]"><VideoIcon className="w-3 h-3" /> Video</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

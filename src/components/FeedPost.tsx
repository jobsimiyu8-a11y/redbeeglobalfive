import { MockPost } from "@/lib/mock-data";
import { useView } from "@/lib/view-context";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, BadgeCheck, Phone, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function FeedPost({ post }: { post: MockPost }) {
  const { navigate } = useView();
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="redbee-card p-4">
      {/* Author header */}
      <div className="flex items-start justify-between mb-3">
        <button onClick={() => navigate("provider-page", { userId: post.author.id })} className="flex items-center gap-3 group">
          <div className="relative">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover" />
            {post.author.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card status-online" />
            )}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{post.author.name}</span>
              {post.author.isVerified && <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {post.author.role !== "user" && (
                <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-semibold uppercase">{post.author.role}</span>
              )}
              <span>{post.author.location}</span>
              <span>·</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </button>
        <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <p className="text-sm text-foreground leading-relaxed mb-3">{post.content}</p>

      {/* Media */}
      {post.media && post.media.type === "image" && (
        <div className="rounded-xl overflow-hidden mb-3">
          <img src={post.media.url} alt="Post" className="w-full max-h-96 object-cover" />
        </div>
      )}

      {/* Contact bar for providers */}
      {post.author.role !== "user" && (
        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-muted/50">
          <span className="text-xs text-muted-foreground mr-auto">{post.author.phone}</span>
          <button className="contact-btn bg-primary/10 text-primary"><Phone className="w-3 h-3" /> Call</button>
          <button className="contact-btn bg-green-500/10 text-green-400"><MessageSquare className="w-3 h-3" /> WhatsApp</button>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
            <Heart className={`w-4 h-4 ${liked ? "fill-primary" : ""}`} />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Share2 className="w-4 h-4" />
            <span>{post.shares}</span>
          </button>
        </div>
        <button onClick={() => setSaved(!saved)} className={`p-1.5 rounded-lg transition-colors ${saved ? "text-secondary" : "text-muted-foreground hover:text-secondary"}`}>
          <Bookmark className={`w-4 h-4 ${saved ? "fill-secondary" : ""}`} />
        </button>
      </div>
    </div>
  );
}

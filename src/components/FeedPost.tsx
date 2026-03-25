import { MockPost } from "@/lib/mock-data";
import { useView } from "@/lib/view-context";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, BadgeCheck, Phone, MessageSquare, Video as VideoIcon, Send } from "lucide-react";
import { useState } from "react";
import ProfileHoverCard from "./ProfileHoverCard";

export default function FeedPost({ post }: { post: MockPost }) {
  const { navigate } = useView();
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<{ text: string; time: string }[]>([]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    setComments(prev => [...prev, { text: comment, time: "Just now" }]);
    setComment("");
  };

  return (
    <div className="redbee-card p-4">
      {/* Author header */}
      <div className="flex items-start justify-between mb-3">
        <ProfileHoverCard user={post.author}>
          <button onClick={() => navigate("provider-page", { userId: post.author.id })} className="flex items-center gap-3 group">
            <div className="relative">
              <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover" />
              {post.author.isOnline ? (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card status-online" />
              ) : (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card status-offline" />
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
        </ProfileHoverCard>
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
      {post.media && post.media.type === "video" && (
        <div className="rounded-xl overflow-hidden mb-3 bg-muted p-4 flex items-center gap-3">
          <VideoIcon className="w-8 h-8 text-primary" />
          <span className="text-sm text-muted-foreground">Video attached</span>
        </div>
      )}

      {/* Contact bar for providers */}
      {post.author.role !== "user" && (
        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-muted/50">
          <span className="text-xs text-muted-foreground mr-auto">{post.author.phone}</span>
          <a href={`tel:${post.author.phone.replace(/\s/g, "")}`} className="contact-btn bg-primary/10 text-primary"><Phone className="w-3 h-3" /> Call</a>
          <a href={`https://wa.me/${post.author.phone.replace(/[\s+]/g, "")}`} target="_blank" rel="noreferrer" className="contact-btn bg-green-500/10 text-green-400"><MessageSquare className="w-3 h-3" /> WhatsApp</a>
          <button className="contact-btn bg-blue-500/10 text-blue-400"><VideoIcon className="w-3 h-3" /> Video</button>
          <button onClick={() => navigate("messenger", { chatWith: post.author.id })} className="contact-btn bg-secondary/10 text-secondary"><Send className="w-3 h-3" /> DM</button>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
            <Heart className={`w-4 h-4 ${liked ? "fill-primary" : ""}`} />
            <span>{likeCount}</span>
          </button>
          <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments + comments.length}</span>
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

      {/* Comments section */}
      {showComments && (
        <div className="mt-3 pt-3 border-t border-border space-y-2">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-2 items-start">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=me" alt="" className="w-6 h-6 rounded-full" />
              <div className="bg-muted rounded-lg px-3 py-1.5 flex-1">
                <p className="text-xs text-foreground">{c.text}</p>
                <span className="text-[10px] text-muted-foreground">{c.time}</span>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => e.key === "Enter" && handleComment()}
              placeholder="Write a comment..." className="flex-1 bg-muted rounded-full px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
            <button onClick={handleComment} disabled={!comment.trim()} className="p-1.5 rounded-full redbee-gradient-bg text-primary-foreground disabled:opacity-40">
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

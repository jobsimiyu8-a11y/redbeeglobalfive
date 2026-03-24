import { useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { Image, Music, Video, Send, X, MapPin, Smile } from "lucide-react";

interface PostComposerProps {
  onPost: (post: { content: string; media?: { type: "image" | "video" | "audio"; url: string } }) => void;
}

export default function PostComposer({ onPost }: PostComposerProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<{ type: "image" | "video" | "audio"; file: File; preview: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const maxChars = 280;

  const handleMediaSelect = (type: "image" | "video" | "audio") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "image" ? "image/*" : type === "video" ? "video/*" : "audio/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const preview = type === "image" ? URL.createObjectURL(file) : "";
        setMedia({ type, file, preview });
      }
    };
    input.click();
  };

  const handlePost = () => {
    if (!content.trim() && !media) return;
    onPost({
      content: content.trim(),
      media: media ? { type: media.type, url: media.preview || `https://picsum.photos/seed/${Date.now()}/600/400` } : undefined,
    });
    setContent("");
    setMedia(null);
  };

  return (
    <div className="redbee-card p-4">
      <div className="flex gap-3">
        <img
          src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=me`}
          alt="You"
          className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover shrink-0"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
            placeholder="What's happening? Share an update..."
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none text-sm focus:outline-none min-h-[60px]"
            rows={2}
          />

          {/* Media preview */}
          {media && (
            <div className="relative mt-2 rounded-lg overflow-hidden">
              {media.type === "image" && media.preview && (
                <img src={media.preview} alt="Upload" className="max-h-48 rounded-lg object-cover" />
              )}
              {media.type === "video" && (
                <div className="bg-muted rounded-lg p-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{media.file.name}</span>
                </div>
              )}
              {media.type === "audio" && (
                <div className="bg-muted rounded-lg p-4 flex items-center gap-2">
                  <Music className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{media.file.name}</span>
                </div>
              )}
              <button onClick={() => setMedia(null)} className="absolute top-2 right-2 p-1 bg-card/80 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-1">
              <button onClick={() => handleMediaSelect("image")} className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors" title="Photo">
                <Image className="w-5 h-5" />
              </button>
              <button onClick={() => handleMediaSelect("video")} className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors" title="Video">
                <Video className="w-5 h-5" />
              </button>
              <button onClick={() => handleMediaSelect("audio")} className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors" title="Song/Audio">
                <Music className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-secondary transition-colors" title="Emoji">
                <Smile className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors" title="Location">
                <MapPin className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs ${content.length > maxChars * 0.9 ? "text-destructive" : "text-muted-foreground"}`}>
                {content.length}/{maxChars}
              </span>
              <button
                onClick={handlePost}
                disabled={!content.trim() && !media}
                className="px-4 py-1.5 rounded-full redbee-gradient-bg text-primary-foreground text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <input ref={fileRef} type="file" className="hidden" />
    </div>
  );
}

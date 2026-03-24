import { useState, useRef } from "react";
import { useView } from "@/lib/view-context";
import { useAuth } from "@/lib/auth-context";
import { allUsers } from "@/lib/mock-data";
import {
  Camera, Edit3, BadgeCheck, MapPin, Star, Users, Phone, MessageSquare, Video,
  Heart, MessageCircle, Share2, Settings, Mail, Globe, Calendar, Shield, Upload, X, Image
} from "lucide-react";

export default function ProviderProfileView() {
  const { viewData, navigate } = useView();
  const { user: authUser, updateProfile } = useAuth();
  const userId = viewData?.userId as string | undefined;
  const isOwnProfile = !userId || userId === authUser?.id;

  const mockUser = userId ? allUsers.find(u => u.id === userId) : null;
  const profileData = isOwnProfile
    ? {
        name: authUser?.displayName || "John Doe",
        username: authUser?.username || "johndoe",
        avatar: authUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=me`,
        coverPhoto: authUser?.coverPhoto || "https://picsum.photos/seed/mycover/1200/400",
        bio: authUser?.bio || "Digital creator & entrepreneur 🚀",
        role: authUser?.role || "user",
        isVerified: authUser?.isVerified || false,
        isOnline: true,
        location: "Nairobi CBD",
        followers: authUser?.followers || 234,
        following: authUser?.following || 189,
        rating: 4.8,
        phone: "+254 700 000 000",
        tags: ["#Premium", "#TopRated"],
        service: authUser?.role === "provider" ? "Digital Services" : undefined,
      }
    : mockUser || {
        name: "Unknown",
        username: "unknown",
        avatar: "",
        coverPhoto: "https://picsum.photos/seed/default/1200/400",
        bio: "",
        role: "user" as const,
        isVerified: false,
        isOnline: false,
        location: "",
        followers: 0,
        following: 0,
        rating: 0,
        phone: "",
        tags: [],
        service: undefined,
      };

  const [coverPhoto, setCoverPhoto] = useState(profileData.coverPhoto);
  const [avatar, setAvatar] = useState(profileData.avatar);
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState(profileData.bio);
  const [activeTab, setActiveTab] = useState<"posts" | "about" | "reviews" | "media">("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverPhoto(url);
      if (isOwnProfile) updateProfile({ coverPhoto: url });
    }
    setShowCoverMenu(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
      if (isOwnProfile) updateProfile({ avatar: url });
    }
    setShowAvatarMenu(false);
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 md:pb-8">
      {/* Cover Photo */}
      <div className="relative h-48 sm:h-64 bg-muted overflow-hidden group">
        <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

        {isOwnProfile && (
          <div className="absolute top-3 right-3">
            <button onClick={() => setShowCoverMenu(!showCoverMenu)}
              className="px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur text-xs font-medium text-foreground hover:bg-card flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" /> Edit Cover
            </button>
            {showCoverMenu && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-xl py-1 w-44 z-10">
                <button onClick={() => coverInputRef.current?.click()}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Upload Photo
                </button>
                <button onClick={() => { setCoverPhoto("https://picsum.photos/seed/newcover/1200/400"); setShowCoverMenu(false); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center gap-2">
                  <Image className="w-4 h-4" /> Choose Photo
                </button>
                <button onClick={() => { setCoverPhoto("https://picsum.photos/seed/default/1200/400"); setShowCoverMenu(false); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center gap-2 text-destructive">
                  <X className="w-4 h-4" /> Remove
                </button>
              </div>
            )}
          </div>
        )}
        <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
      </div>

      {/* Profile info */}
      <div className="px-4 -mt-16 relative">
        <div className="flex items-end gap-4">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-background overflow-hidden group cursor-pointer"
              onClick={() => isOwnProfile && setShowAvatarMenu(!showAvatarMenu)}>
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover bg-muted" />
              {isOwnProfile && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <Camera className="w-6 h-6 text-foreground" />
                </div>
              )}
            </div>
            {profileData.isOnline && (
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-3 border-background status-online animate-pulse-dot" />
            )}
            {showAvatarMenu && (
              <div className="absolute top-full mt-1 left-0 bg-card border border-border rounded-xl shadow-xl py-1 w-44 z-10">
                <button onClick={() => avatarInputRef.current?.click()}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Upload Photo
                </button>
                <button onClick={() => { setShowAvatarMenu(false); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center gap-2">
                  <Image className="w-4 h-4" /> See Profile Picture
                </button>
              </div>
            )}
            <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>

          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-bold text-foreground">{profileData.name}</h1>
              {profileData.isVerified && <BadgeCheck className="w-5 h-5 text-primary fill-primary/20" />}
              {profileData.role !== "user" && (
                <span className="px-2 py-0.5 rounded-full redbee-gradient-bg text-[10px] font-bold text-primary-foreground uppercase">{profileData.role}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{profileData.username}</p>
          </div>

          <div className="flex gap-2 pb-2">
            {!isOwnProfile ? (
              <>
                <button onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${isFollowing ? "bg-muted text-foreground" : "redbee-gradient-bg text-primary-foreground"}`}>
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button onClick={() => navigate("messenger", { chatWith: userId })}
                  className="px-4 py-2 rounded-full bg-muted text-foreground text-sm font-semibold hover:bg-accent">
                  Message
                </button>
              </>
            ) : (
              <button onClick={() => navigate("settings")}
                className="px-4 py-2 rounded-full bg-muted text-foreground text-sm font-semibold hover:bg-accent flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          {editBio && isOwnProfile ? (
            <div className="flex gap-2">
              <input value={bio} onChange={e => setBio(e.target.value)} className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <button onClick={() => { updateProfile({ bio }); setEditBio(false); }} className="px-3 py-2 rounded-lg redbee-gradient-bg text-primary-foreground text-sm font-medium">Save</button>
            </div>
          ) : (
            <p className="text-sm text-foreground/80 cursor-pointer" onClick={() => isOwnProfile && setEditBio(true)}>{bio}</p>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4">
          <div className="text-center">
            <span className="block text-lg font-bold text-foreground">{profileData.followers.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold text-foreground">{profileData.following.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">Following</span>
          </div>
          {profileData.rating > 0 && (
            <div className="text-center">
              <span className="flex items-center gap-1 text-lg font-bold text-foreground"><Star className="w-4 h-4 text-secondary fill-secondary" />{profileData.rating}</span>
              <span className="text-xs text-muted-foreground">Rating</span>
            </div>
          )}
          <div className="text-center">
            <span className="flex items-center gap-1 text-lg font-bold text-foreground"><MapPin className="w-4 h-4 text-primary" /></span>
            <span className="text-xs text-muted-foreground">{profileData.location}</span>
          </div>
        </div>

        {/* Contact buttons */}
        {!isOwnProfile && profileData.role !== "user" && (
          <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-muted/50 border border-border">
            <span className="text-sm text-muted-foreground mr-auto">{profileData.phone}</span>
            <button className="contact-btn bg-primary/10 text-primary"><Phone className="w-4 h-4" /> Call</button>
            <button className="contact-btn bg-green-500/10 text-green-400"><MessageSquare className="w-4 h-4" /> WhatsApp</button>
            <button className="contact-btn bg-blue-500/10 text-blue-400"><Video className="w-4 h-4" /> Video</button>
            <button onClick={() => navigate("messenger", { chatWith: userId })} className="contact-btn bg-secondary/10 text-secondary"><Mail className="w-4 h-4" /> DM</button>
          </div>
        )}

        {/* Tags */}
        {profileData.tags && profileData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {profileData.tags.map(tag => (
              <span key={tag} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{tag}</span>
            ))}
          </div>
        )}

        {/* Profile Tabs */}
        <div className="flex border-b border-border mt-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          {(["posts", "about", "reviews", "media"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "feed-tab feed-tab-active capitalize" : "feed-tab capitalize"}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-4 space-y-4">
          {activeTab === "posts" && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              No posts yet. Start sharing!
            </div>
          )}
          {activeTab === "about" && (
            <div className="redbee-card p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm"><MapPin className="w-4 h-4 text-primary" /> <span className="text-foreground">{profileData.location}</span></div>
              <div className="flex items-center gap-3 text-sm"><Calendar className="w-4 h-4 text-primary" /> <span className="text-muted-foreground">Joined March 2024</span></div>
              <div className="flex items-center gap-3 text-sm"><Globe className="w-4 h-4 text-primary" /> <span className="text-muted-foreground">redbee.app/{profileData.username}</span></div>
              {profileData.isVerified && (
                <div className="flex items-center gap-3 text-sm"><Shield className="w-4 h-4 text-primary" /> <span className="text-foreground">Verified Professional</span></div>
              )}
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
              No reviews yet.
            </div>
          )}
          {activeTab === "media" && (
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }, (_, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img src={`https://picsum.photos/seed/media${profileData.username}${i}/300/300`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

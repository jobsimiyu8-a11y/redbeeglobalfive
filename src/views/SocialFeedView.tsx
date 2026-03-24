import { useState, useCallback } from "react";
import StoryBar from "@/components/StoryBar";
import PostComposer from "@/components/PostComposer";
import FeedPost from "@/components/FeedPost";
import SuggestedProviders from "@/components/SuggestedProviders";
import { feedPosts, MockPost, allUsers } from "@/lib/mock-data";

type FeedTab = "trending" | "following" | "near-me" | "new";

export default function SocialFeedView() {
  const [activeTab, setActiveTab] = useState<FeedTab>("trending");
  const [posts, setPosts] = useState<MockPost[]>(feedPosts);

  const tabs: { key: FeedTab; label: string }[] = [
    { key: "trending", label: "🔥 Trending" },
    { key: "following", label: "Following" },
    { key: "near-me", label: "📍 Near Me" },
    { key: "new", label: "✨ New Posts" },
  ];

  const handleNewPost = useCallback((post: { content: string; media?: { type: "image" | "video" | "audio"; url: string } }) => {
    const newPost: MockPost = {
      id: `p-new-${Date.now()}`,
      author: {
        ...allUsers[0],
        id: "u1",
        name: "John Doe",
        username: "johndoe",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=me`,
        isOnline: true,
        role: "user",
      },
      content: post.content,
      media: post.media,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: "Just now",
      isLiked: false,
    };
    setPosts(prev => [newPost, ...prev]);
  }, []);

  const filteredPosts = posts; // In production, filter by tab

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20 md:pb-8">
      {/* Stories */}
      <StoryBar />

      {/* Feed Tabs */}
      <div className="flex items-center border-b border-border mb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={activeTab === tab.key ? "feed-tab feed-tab-active whitespace-nowrap" : "feed-tab whitespace-nowrap"}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Suggested Providers */}
      <div className="mb-4">
        <SuggestedProviders />
      </div>

      {/* Post Composer */}
      <div className="mb-4">
        <PostComposer onPost={handleNewPost} />
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

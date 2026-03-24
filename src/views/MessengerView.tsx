import { useState } from "react";
import { useView } from "@/lib/view-context";
import { conversations, allUsers, Conversation, MockUser } from "@/lib/mock-data";
import { Search, Send, ArrowLeft, Phone, Video, MoreVertical, BadgeCheck, Image, Smile, Paperclip } from "lucide-react";

interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

const mockMessages: Message[] = [
  { id: "m1", sender: "them", text: "Hey! I saw your profile on RedBee. Are you available for a plumbing job tomorrow?", time: "10:30 AM" },
  { id: "m2", sender: "me", text: "Hi! Yes, I am available. What area are you based in?", time: "10:32 AM" },
  { id: "m3", sender: "them", text: "I'm in Westlands, near Sarit Centre. Kitchen sink is leaking badly 😅", time: "10:33 AM" },
  { id: "m4", sender: "me", text: "No problem! I can come by at 9 AM. My rate for that area is KES 3,000. Does that work?", time: "10:35 AM" },
  { id: "m5", sender: "them", text: "That's perfect! See you tomorrow then. Thanks! 🙏", time: "10:36 AM" },
];

export default function MessengerView() {
  const { viewData, goBack } = useView();
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const chatWith = viewData?.chatWith as string | undefined;
  const targetUser = chatWith ? allUsers.find(u => u.id === chatWith) : null;

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: `m${Date.now()}`, sender: "me", text: input, time: "Now" }]);
    setInput("");
  };

  const filteredConvos = conversations.filter(c =>
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeUser = activeConvo?.user || targetUser;

  return (
    <div className="h-[calc(100vh-var(--nav-h))] flex">
      {/* Conversation list */}
      <div className={`${activeUser ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 border-r border-border`}>
        <div className="p-4 border-b border-border">
          <h2 className="font-display font-bold text-lg text-foreground mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-muted rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConvos.map(convo => (
            <button
              key={convo.id}
              onClick={() => setActiveConvo(convo)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-accent text-left border-b border-border/30 ${activeConvo?.id === convo.id ? "bg-accent" : ""}`}
            >
              <div className="relative shrink-0">
                <img src={convo.user.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                {convo.user.isOnline && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full status-online border-2 border-card" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground truncate">{convo.user.name}</span>
                    {convo.user.isVerified && <BadgeCheck className="w-3 h-3 text-primary fill-primary/20 shrink-0" />}
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">{convo.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <span className="w-5 h-5 rounded-full redbee-gradient-bg text-[10px] text-primary-foreground flex items-center justify-center font-bold shrink-0">
                  {convo.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {activeUser ? (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <button onClick={() => { setActiveConvo(null); }} className="md:hidden p-1.5 rounded-lg hover:bg-accent">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="relative">
              <img src={activeUser.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              {activeUser.isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full status-online border-2 border-card" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-foreground text-sm">{activeUser.name}</span>
                {activeUser.isVerified && <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />}
              </div>
              <span className="text-xs text-muted-foreground">{activeUser.isOnline ? "Online" : activeUser.lastSeen}</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-accent"><Phone className="w-5 h-5 text-muted-foreground" /></button>
            <button className="p-2 rounded-lg hover:bg-accent"><Video className="w-5 h-5 text-muted-foreground" /></button>
            <button className="p-2 rounded-lg hover:bg-accent"><MoreVertical className="w-5 h-5 text-muted-foreground" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  msg.sender === "me"
                    ? "redbee-gradient-bg text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-[10px] mt-1 block ${msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-accent"><Paperclip className="w-5 h-5 text-muted-foreground" /></button>
              <button className="p-2 rounded-lg hover:bg-accent"><Image className="w-5 h-5 text-muted-foreground" /></button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="p-2 rounded-lg hover:bg-accent"><Smile className="w-5 h-5 text-muted-foreground" /></button>
              <button onClick={handleSend} disabled={!input.trim()}
                className="p-2.5 rounded-full redbee-gradient-bg text-primary-foreground disabled:opacity-40">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-muted-foreground">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <Send className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm">Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}

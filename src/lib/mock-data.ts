const firstNames = ["Amina","Brian","Cynthia","David","Esther","Felix","Grace","Hassan","Irene","James","Kibet","Lilian","Moses","Nancy","Oscar","Patience","Quincy","Rose","Samuel","Tabitha","Umar","Vivian","Wanjiku","Xavier","Yusuf","Zuri","Aisha","Ben","Charity","Dennis"];
const lastNames = ["Njeri","Ochieng","Mwangi","Kamau","Omondi","Wafula","Chebet","Ndungu","Otieno","Karanja","Mutua","Nyambura","Kiprotich","Adhiambo","Maina","Wangari","Korir","Akinyi","Gitonga","Wairimu","Kipchoge","Moraa","Barasa","Mueni","Juma","Wambui","Ogutu","Kemunto","Rotich","Abdi"];
const services = ["Plumber","Electrician","Hair Stylist","Mechanic","Tutor","Cleaner","Chef","Photographer","Fitness Trainer","Driver","Nurse","Tailor","Carpenter","Painter","Mason","Landscaper","Security","DJ","MUA","Barber","Accountant","Lawyer","Vet","Physiotherapist","Web Developer","Graphic Designer","Interior Designer","Event Planner","Caterer","Florist"];
const locations = ["Nairobi CBD","Westlands","Kilimani","Ruiru","Thika","Kiambu","Karen","Lavington","Langata","Kasarani","Embakasi","Ruaka","Juja","Rongai","Kitengela","Athi River","Ngong","Machakos","Nyeri","Mombasa"];
const tags = ["#BusinessLoans","#HomeServices","#24/7","#Premium","#TopRated","#Verified","#NewProvider","#FastService","#Affordable","#Experienced"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAvatar(seed: number) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=redbee${seed}`;
}

export interface MockUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverPhoto: string;
  isOnline: boolean;
  isVerified: boolean;
  role: "user" | "provider" | "agency";
  service?: string;
  location: string;
  bio: string;
  followers: number;
  following: number;
  rating: number;
  phone: string;
  tags: string[];
  lat: number;
  lng: number;
  hasStory: boolean;
  lastSeen: string;
}

export function generateUsers(count: number): MockUser[] {
  return Array.from({ length: count }, (_, i) => {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 7 + 3) % lastNames.length];
    const role = i < 5 ? "agency" as const : i < 25 ? "provider" as const : "user" as const;
    return {
      id: `u${i + 100}`,
      name: `${fn} ${ln}`,
      username: `${fn.toLowerCase()}${ln.toLowerCase()}${i}`,
      avatar: randomAvatar(i),
      coverPhoto: `https://picsum.photos/seed/cover${i}/800/300`,
      isOnline: Math.random() > 0.3,
      isVerified: role === "agency" || Math.random() > 0.7,
      role,
      service: role !== "user" ? services[i % services.length] : undefined,
      location: locations[i % locations.length],
      bio: `Professional ${services[i % services.length]} based in ${locations[i % locations.length]}. Passionate about quality service delivery. 🔥`,
      followers: Math.floor(Math.random() * 50000) + 100,
      following: Math.floor(Math.random() * 2000) + 50,
      rating: +(3.5 + Math.random() * 1.5).toFixed(1),
      phone: `+254 7${Math.floor(Math.random() * 100).toString().padStart(2, "0")} ${Math.floor(Math.random() * 1000).toString().padStart(3, "0")} ${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
      tags: [randomItem(tags), randomItem(tags)].filter((v, idx, a) => a.indexOf(v) === idx),
      lat: -1.2921 + (Math.random() - 0.5) * 0.3,
      lng: 36.8219 + (Math.random() - 0.5) * 0.3,
      hasStory: Math.random() > 0.4,
      lastSeen: Math.random() > 0.5 ? "Just now" : `${Math.floor(Math.random() * 59) + 1}m ago`,
    };
  });
}

export interface MockPost {
  id: string;
  author: MockUser;
  content: string;
  media?: { type: "image" | "video" | "audio"; url: string };
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
}

const postTexts = [
  "Just finished an amazing project in Westlands! Client loved it 🔥 #RedBee",
  "Looking for a reliable electrician in Ruiru area. Any recommendations? ⚡",
  "New month, new goals! Ready to serve my clients better 💪",
  "Best plumbing service in Nairobi, hands down! Contact me for quotes 🚿",
  "Weekend vibes 🎶 Who's available for a home cleaning session?",
  "Just got verified on RedBee! Thank you for trusting my services ✅",
  "Great networking event today. Met so many talented providers 🤝",
  "Offering 20% discount on all photography packages this week 📸",
  "My morning routine as a fitness trainer. Rise and grind! 🏋️",
  "Customer satisfaction is everything. Another 5-star review! ⭐⭐⭐⭐⭐",
  "Exploring new service areas. Now covering Kiambu and Thika! 🗺️",
  "Tips for choosing the right mechanic: thread 🧵👇",
  "Beautiful day in Nairobi! Perfect weather for outdoor events 🌤️",
  "Just launched my new service package. Check my profile! 🚀",
  "Happy client = happy provider. Love what I do ❤️",
];

export function generatePosts(users: MockUser[], count: number): MockPost[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `p${i}`,
    author: users[i % users.length],
    content: postTexts[i % postTexts.length],
    media: i % 3 === 0 ? { type: "image" as const, url: `https://picsum.photos/seed/post${i}/600/400` } : undefined,
    likes: Math.floor(Math.random() * 500),
    comments: Math.floor(Math.random() * 80),
    shares: Math.floor(Math.random() * 30),
    timestamp: `${Math.floor(Math.random() * 23) + 1}h ago`,
    isLiked: Math.random() > 0.5,
  }));
}

export const allUsers = generateUsers(60);
export const storyUsers = allUsers.filter(u => u.hasStory).slice(0, 30);
export const suggestedProviders = allUsers.filter(u => u.role !== "user").slice(0, 50);
export const feedPosts = generatePosts(allUsers, 20);

export interface Conversation {
  id: string;
  user: MockUser;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export const conversations: Conversation[] = allUsers.slice(0, 15).map((u, i) => ({
  id: `conv${i}`,
  user: u,
  lastMessage: i % 2 === 0 ? "Hey, are you available tomorrow?" : "Thanks for the great service! 👍",
  timestamp: `${i + 1}h ago`,
  unread: i < 4 ? Math.floor(Math.random() * 5) + 1 : 0,
}));

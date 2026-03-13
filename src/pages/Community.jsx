import { useState } from 'react';
import { MessageSquare, ArrowUpCircle, ShieldCheck, Clock, Plus } from 'lucide-react';
import clsx from 'clsx';

const DUMMY_POSTS = [
  {
    id: 1,
    author: "SafetyAdvocate",
    avatar: "bg-[#6B4F3B]",
    title: "Beware: New WhatsApp 'KBC Lottery' scam variant circulating",
    content: "Just wanted to alert everyone that scammers are now sending audio notes pretending to be customer support before sending the lottery links. Do not reply!",
    upvotes: 245,
    comments: 32,
    time: "2h ago",
    timestamp: Date.now() - 7200000,
    verified: true,
    category: "Scam Alert"
  },
  {
    id: 2,
    author: "Alex_Tech",
    avatar: "bg-[#3E2C23]",
    title: "How I handled the Telegram Part-Time Job Scam",
    content: "They offered me ₹5k/day. I played along to see how it worked but never sent them the 'registration fee'. Attached are the screenshots of their tactics.",
    upvotes: 18,
    comments: 4,
    time: "5m ago",
    timestamp: Date.now() - 300000,
    verified: false,
    category: "Experience"
  },
  {
    id: 3,
    author: "CyberPolice_Tips",
    avatar: "bg-blue-800",
    title: "Official Alert: Rise in Deepfake Audio Extortion",
    content: "Scammers are cloning voices from 3-second social media videos to call family members. Establish a 'safe word' with your family to verify identities during emergencies.",
    upvotes: 852,
    comments: 124,
    time: "1d ago",
    timestamp: Date.now() - 86400000,
    verified: true,
    category: "Official Alert"
  },
  {
    id: 4,
    author: "PrivacyQueen",
    avatar: "bg-purple-600",
    title: "PSA: Clear your Facebook search history",
    content: "Facebook tracks your searches to build a profile for targeted (sometimes malicious) ads. Go to Settings > Your Information > Activity Log to clear it.",
    upvotes: 120,
    comments: 15,
    time: "15h ago",
    timestamp: Date.now() - 54000000,
    verified: false,
    category: "Privacy Tip"
  },
  {
    id: 5,
    author: "Rahul_S",
    avatar: "bg-green-700",
    title: "Suspicious 'Electricity Bill' SMS? Read this.",
    content: "Got a message saying electricity will be cut at 9:30 PM. It's a classic phishing tactic. Do not call the number provided. Pay only via official apps.",
    upvotes: 450,
    comments: 56,
    time: "30m ago",
    timestamp: Date.now() - 1800000,
    verified: false,
    category: "Scam Alert"
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('trending'); // 'trending', 'recent'
  const [showPostModal, setShowPostModal] = useState(false);
  const [posts, setPosts] = useState(DUMMY_POSTS);
  
  // New Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newPostObj = {
      id: Date.now(),
      author: "You (User)",
      avatar: "bg-primary",
      title: newTitle,
      content: newContent,
      upvotes: 0,
      comments: 0,
      time: "Just now",
      timestamp: Date.now(),
      verified: false,
      category: "Alert"
    };

    setPosts([newPostObj, ...posts]);
    setShowPostModal(false);
    setNewTitle('');
    setNewContent('');
    setActiveTab('recent'); // Switch to recent to show new post
  };

  // Logic to differentiate feeds
  const getDisplayedPosts = () => {
    if (activeTab === 'trending') {
      return [...posts].sort((a, b) => b.upvotes - a.upvotes);
    }
    // Recent: sort by timestamp descending
    return [...posts].sort((a, b) => b.timestamp - a.timestamp);
  };

  const displayedPosts = getDisplayedPosts();

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 pb-12">
      
      {/* Main Feed */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Community Awareness Space</h1>
            <p className="text-accent/70">Differentiate between popular trends and immediate alerts.</p>
          </div>
          <button 
            onClick={() => setShowPostModal(true)}
            className="bg-primary text-white px-5 py-2.5 rounded-md font-medium shadow-sm hover:bg-primary/90 flex items-center gap-2"
          >
            <Plus size={18} /> New Post
          </button>
        </div>

        {/* Feed Selectors */}
        <div className="flex gap-4 mb-8 bg-[#FAF6F1] p-1 rounded-xl border border-[#E5D5C5] w-fit">
          <button 
            onClick={() => setActiveTab('trending')}
            className={clsx(
              "px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2",
              activeTab === 'trending' ? "bg-white text-primary shadow-sm border border-[#E5D5C5]" : "text-accent/50 hover:text-accent"
            )}
          >
            <ArrowUpCircle size={18} />
            Trending Topics
          </button>
          <button 
            onClick={() => setActiveTab('recent')}
            className={clsx(
              "px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2",
              activeTab === 'recent' ? "bg-white text-primary shadow-sm border border-[#E5D5C5]" : "text-accent/50 hover:text-accent"
            )}
          >
            <Clock size={18} />
            Recent Alerts
          </button>
        </div>

        {/* Create Post Form */}
        {showPostModal && (
          <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-primary/20 mb-8 animate-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-primary">Report a Scam / Start Discussion</h3>
              <button onClick={() => setShowPostModal(false)} className="text-accent/50 hover:text-red-500 font-medium text-sm">Cancel</button>
            </div>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Post Title (e.g. Received a suspicious SMS today)" 
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-[#E5D5C5] rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-gray-50/30"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Describe the details, red flags, or ask a question..." 
                  rows="4" 
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full border border-[#E5D5C5] rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none bg-gray-50/30"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-primary text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95">
                  Publish Alert
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          {displayedPosts.map(post => {
            const isHot = post.upvotes > 300;
            const isNew = post.time.includes('m ago') || post.time.includes('Just');
            
            return (
              <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5D5C5] hover:border-primary/40 transition-all group flex flex-col sm:flex-row gap-6 relative overflow-hidden">
                
                {/* Visual Indicators (Labels) */}
                <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 pointer-events-none">
                  {activeTab === 'trending' && isHot && (
                    <div className="bg-orange-500 text-white text-[10px] font-bold py-1 px-10 transform rotate-45 translate-x-4 translate-y-2 shadow-sm text-center">
                      HOT
                    </div>
                  )}
                  {activeTab === 'recent' && isNew && (
                    <div className="bg-green-600 text-white text-[10px] font-bold py-1 px-10 transform rotate-45 translate-x-4 translate-y-2 shadow-sm text-center uppercase">
                      New
                    </div>
                  )}
                </div>

                {/* Score / Rank indicator for Trending */}
                {activeTab === 'trending' && (
                  <div className="hidden sm:flex flex-col items-center justify-center p-3 bg-[#FAF6F1] rounded-xl border border-[#E5D5C5] min-w-[60px]">
                    <ArrowUpCircle size={24} className="text-primary mb-1" />
                    <span className="font-black text-primary">{post.upvotes}</span>
                  </div>
                )}

                {/* Content Column */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={clsx("w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-inner", post.avatar)}>
                      {post.author.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-primary flex items-center gap-1.5 leading-none">
                        {post.author} 
                        {post.verified && <ShieldCheck size={16} className="text-blue-500" title="Verified Expert" />}
                      </span>
                      <span className="text-[11px] text-accent/40 font-bold uppercase tracking-tight mt-1">
                        {post.category}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-accent/30 flex items-center gap-1 ml-auto bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                      <Clock size={12} /> {post.time}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-accent leading-tight group-hover:text-primary transition-colors cursor-pointer">{post.title}</h3>
                  <p className="text-sm text-accent/70 mb-5 leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">{post.content}</p>

                  <div className="flex items-center gap-5 text-xs font-bold text-accent/50">
                    <button className="flex items-center gap-2 hover:text-primary hover:bg-secondary/30 px-3 py-1.5 rounded-lg transition-all">
                      <MessageSquare size={18} className="opacity-60" />
                      {post.comments} <span className="hidden sm:inline">Comments</span>
                    </button>
                    <button className="hover:text-primary hover:bg-secondary/30 px-3 py-1.5 rounded-lg transition-all hidden sm:block">Share Details</button>
                    <div className="sm:hidden flex items-center gap-1">
                      <ArrowUpCircle size={14} /> {post.upvotes}
                    </div>
                    <button className="hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all ml-auto opacity-40 hover:opacity-100">Report</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-80 space-y-6">
        <div className="bg-white border-2 border-[#E5D5C5] p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold mb-5 flex items-center gap-2 text-primary">
            <ShieldCheck size={20} />
            Community Rules
          </h3>
          <ul className="text-xs text-accent/70 space-y-4 font-medium">
            <li className="flex gap-3 items-start">
              <span className="w-5 h-5 bg-red-50 text-red-500 rounded flex items-center justify-center shrink-0">1</span>
              <span>No personal data (phone numbers, emails) in screenshots.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-5 h-5 bg-blue-50 text-blue-500 rounded flex items-center justify-center shrink-0">2</span>
              <span>Maintain educational tone. No insults or flaming.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-5 h-5 bg-green-50 text-green-500 rounded flex items-center justify-center shrink-0">3</span>
              <span>Report ongoing scams immediately to national portals.</span>
            </li>
          </ul>
        </div>

        <div className="bg-primary p-6 rounded-2xl text-white shadow-lg overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <MessageSquare size={120} />
          </div>
          <h4 className="font-bold mb-2">Notice a local scam?</h4>
          <p className="text-[11px] opacity-80 mb-4 leading-relaxed">Your report could prevent someone else from losing their life savings.</p>
          <button 
            onClick={() => setShowPostModal(true)}
            className="w-full bg-white text-primary font-bold py-2 rounded-xl text-xs hover:bg-secondary transition-colors"
          >
            Post an Alert Now
          </button>
        </div>
      </div>

    </div>
  );
}

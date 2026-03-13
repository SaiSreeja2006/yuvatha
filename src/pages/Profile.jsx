import { useState, useEffect } from 'react';
import { User, Mail, Phone, ShieldCheck, Award, Clock, Settings, LogOut } from 'lucide-react';

export default function Profile() {
  const [userData, setUserData] = useState({
    name: "Rohan Sharma",
    email: "rohan.sharma@example.com",
    mobile: "+91 98765 43210",
    joinDate: "March 2026",
    literacyScore: 850,
    modulesCompleted: 4,
    totalModules: 12,
    rank: "Digital Explorer"
  });

  useEffect(() => {
    const saved = localStorage.getItem('yuvata_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserData(prev => ({
        ...prev,
        ...parsed
      }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('yuvata_user');
    window.location.href = '/';
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">My Profile</h1>
        <p className="text-accent/70">Manage your credentials, track your security rank, and review your learning journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Basic Stats */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] text-center">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-primary mx-auto mb-4 border-2 border-white shadow-sm font-bold text-3xl">
              {userData.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-primary">{userData.name}</h2>
            <p className="text-sm text-accent/60 mb-6">{userData.rank}</p>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
              <ShieldCheck size={14} /> Verified Member
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5]">
            <h3 className="text-sm font-bold text-accent/50 uppercase tracking-widest mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-accent/80">
                  <Award size={18} />
                  <span className="text-sm">Global Rank</span>
                </div>
                <span className="font-bold text-primary">#142</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-accent/80">
                  <Clock size={18} />
                  <span className="text-sm">Days Active</span>
                </div>
                <span className="font-bold text-primary">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info & Progress */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Personal Credentials */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E5D5C5] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5D5C5] bg-[#FAF6F1] flex justify-between items-center">
              <h3 className="font-bold text-primary flex items-center gap-2">
                <Settings size={18} /> Personal Information
              </h3>
              <button className="text-sm font-medium text-primary hover:underline">Edit Info</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-accent/40 uppercase mb-1">Full Name</label>
                  <div className="flex items-center gap-3 text-primary font-medium p-3 bg-gray-50 rounded border border-transparent">
                    <User size={18} className="text-accent/30" />
                    {userData.name}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-accent/40 uppercase mb-1">Email Address</label>
                  <div className="flex items-center gap-3 text-primary font-medium p-3 bg-gray-50 rounded border border-transparent">
                    <Mail size={18} className="text-accent/30" />
                    {userData.email}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-accent/40 uppercase mb-1">Mobile Number</label>
                  <div className="flex items-center gap-3 text-primary font-medium p-3 bg-gray-50 rounded border border-transparent">
                    <Phone size={18} className="text-accent/30" />
                    {userData.mobile}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-accent/40 uppercase mb-1">Account Created</label>
                  <div className="flex items-center gap-3 text-primary font-medium p-3 bg-gray-50 rounded border border-transparent opacity-80">
                    <Clock size={18} className="text-accent/30" />
                    {userData.joinDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Progress Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5]">
            <h3 className="font-bold text-primary mb-6">Learning Progress</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="text-sm font-medium text-accent/60 uppercase">Literacy Mastery</span>
                  <p className="text-2xl font-bold text-primary">{userData.literacyScore}<span className="text-sm font-normal text-accent/40">/1000</span></p>
                </div>
                <span className="text-xs font-bold text-primary bg-secondary px-2 py-1 rounded">Level 4</span>
              </div>
              <div className="w-full bg-[#FAF6F1] rounded-full h-3 border border-[#E5D5C5]">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${(userData.literacyScore/1000)*100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-[#FAF6F1] rounded-lg border border-[#E5D5C5]">
                <p className="text-xs text-accent/50 font-bold uppercase mb-1">Quiz</p>
                <p className="text-xl font-bold text-primary">80%</p>
              </div>
              <div className="text-center p-4 bg-[#FAF6F1] rounded-lg border border-[#E5D5C5]">
                <p className="text-xs text-accent/50 font-bold uppercase mb-1">Lab</p>
                <p className="text-xl font-bold text-primary">100%</p>
              </div>
              <div className="text-center p-4 bg-[#FAF6F1] rounded-lg border border-[#E5D5C5]">
                <p className="text-xs text-accent/50 font-bold uppercase mb-1">Scan</p>
                <p className="text-xl font-bold text-primary">65%</p>
              </div>
              <div className="text-center p-4 bg-[#FAF6F1] rounded-lg border border-[#E5D5C5]">
                <p className="text-xs text-accent/50 font-bold uppercase mb-1">Trust</p>
                <p className="text-xl font-bold text-primary">92%</p>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="bg-red-50 p-6 rounded-lg border border-red-100 flex justify-between items-center">
            <div>
              <h4 className="text-red-900 font-bold">Account Session</h4>
              <p className="text-sm text-red-700 opacity-80">Signing out will end your current session locally.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-red-600 border border-red-200 rounded-md font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

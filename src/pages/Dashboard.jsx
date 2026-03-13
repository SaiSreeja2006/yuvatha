import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, BookOpen, ShieldAlert, Activity } from 'lucide-react';

const mockProgressData = [
  { name: 'Mon', score: 30 },
  { name: 'Tue', score: 45 },
  { name: 'Wed', score: 40 },
  { name: 'Thu', score: 65 },
  { name: 'Fri', score: 85 },
  { name: 'Sat', score: 90 },
  { name: 'Sun', score: 100 },
];

export default function Dashboard() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const saved = localStorage.getItem('yuvata_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.name) setUserName(parsed.name);
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}</h1>
      <p className="text-accent/70 mb-8">Here is your digital literacy progress for this week.</p>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-[#E5D5C5] flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary shrink-0">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs text-accent/70 font-medium uppercase tracking-wider">Literacy Score</p>
            <p className="text-2xl font-bold text-primary">850<span className="text-sm font-normal text-accent/50">/1000</span></p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-[#E5D5C5] flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary shrink-0">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-xs text-accent/70 font-medium uppercase tracking-wider">Modules Done</p>
            <p className="text-2xl font-bold text-primary">4<span className="text-sm font-normal text-accent/50">/12</span></p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-[#E5D5C5] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FEE2E2] rounded-full flex items-center justify-center text-[#DC2626] shrink-0">
            <ShieldAlert size={24} />
          </div>
          <div>
            <p className="text-xs text-accent/70 font-medium uppercase tracking-wider">Risk Level</p>
            <p className="text-2xl font-bold text-[#DC2626]">High</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-[#E5D5C5] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center text-[#16A34A] shrink-0">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs text-accent/70 font-medium uppercase tracking-wider">Scam Detection</p>
            <p className="text-2xl font-bold text-[#16A34A]">85%</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5]">
          <h2 className="text-lg font-bold mb-6">Learning Activity</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockProgressData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5D5C5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#3E2C23', opacity: 0.7, fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#3E2C23', opacity: 0.7, fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F5E9DA'}}
                  contentStyle={{borderRadius: '8px', border: '1px solid #E5D5C5', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="score" fill="#6B4F3B" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Modules */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5]">
          <h2 className="text-lg font-bold mb-4">Recommended Next</h2>
          <div className="space-y-4">
            
            <div className="p-4 border border-[#E5D5C5] rounded-md hover:border-primary transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-primary group-hover:underline">Phishing Defense</h3>
                <span className="text-xs bg-secondary text-primary px-2 py-1 rounded-full font-medium">10 mins</span>
              </div>
              <p className="text-sm text-accent/70 line-clamp-2">Learn to identify subtle emotional manipulation in scam emails.</p>
            </div>

            <div className="p-4 border border-[#E5D5C5] rounded-md hover:border-primary transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-primary group-hover:underline">Footprint Basics</h3>
                <span className="text-xs bg-secondary text-primary px-2 py-1 rounded-full font-medium">15 mins</span>
              </div>
              <p className="text-sm text-accent/70 line-clamp-2">Understand what data you are leaking and how to stop it.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

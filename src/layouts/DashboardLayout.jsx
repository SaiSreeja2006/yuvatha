import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Library, Users, Shield, User, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import Chatbot from '../components/Chatbot';
import clsx from 'clsx';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/modules', label: 'Learning Modules', icon: BookOpen },
  { path: '/library', label: 'Scam Awareness', icon: Library },
  { path: '/footprint', label: 'Footprint Tracker', icon: Shield },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function DashboardLayout() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <div className="flex h-screen bg-background text-accent relative overflow-hidden">
      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[#E5D5C5] z-50 flex items-center px-4 justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleMobile}
            className="p-2 bg-secondary/50 text-primary rounded-lg transition-colors active:scale-95"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-bold text-lg text-primary tracking-tight">YUVATA</span>
        </div>
        <Link to="/profile" className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center text-primary border border-primary/10">
          <User size={18} />
        </Link>
      </header>

      {/* Sidebar Navigation */}
      <aside className={clsx(
        "bg-white flex flex-col transition-all duration-300 z-[60]",
        // Desktop styles
        "md:relative md:border-r md:border-[#E5D5C5] md:shadow-sm md:translate-x-0",
        isCollapsed ? "md:w-20" : "md:w-64",
        // Mobile "Popup" styles
        "fixed top-[4.5rem] left-4 bottom-4 w-[280px] rounded-2xl shadow-2xl border border-[#E5D5C5] overflow-hidden",
        isMobileOpen ? "translate-x-0 opacity-100" : "-translate-x-[110%] opacity-0 md:opacity-100"
      )}>
        <div className={clsx(
          "p-6 border-b border-[#E5D5C5] flex items-center justify-between",
          isCollapsed ? "md:justify-center" : ""
        )}>
          {!isCollapsed && (
            <div className="animate-in fade-in duration-300">
              <h1 className="text-2xl font-bold text-primary tracking-tight">YUVATA</h1>
              <p className="text-xs text-accent mt-1 opacity-80">Digital Literacy Platform</p>
            </div>
          )}
          {isCollapsed && <h1 className="text-xl font-bold text-primary">Y</h1>}
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all group',
                  isActive 
                    ? 'bg-secondary text-primary shadow-sm' 
                    : 'text-accent hover:bg-secondary/50',
                  isCollapsed ? "justify-center px-2" : ""
                )}
                title={isCollapsed ? item.label : ""}
              >
                <Icon size={20} className={clsx(
                  'shrink-0',
                  isActive ? 'text-primary' : 'text-accent opacity-70 group-hover:opacity-100'
                )} />
                {!isCollapsed && <span className="animate-in fade-in slide-in-from-left-2 duration-300">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-[#E5D5C5] space-y-2">
          <Link to="/" className={clsx(
            "text-sm font-medium text-primary hover:underline flex items-center gap-2",
            isCollapsed && "justify-center"
          )}>
            {!isCollapsed ? "Back to Home" : <X size={18} />}
          </Link>
          
          {/* Desktop Toggle Button */}
          <button 
            onClick={toggleSidebar}
            className="hidden md:flex w-full items-center justify-center p-2 rounded-md hover:bg-secondary/50 text-accent/60 transition-colors mt-2"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2"><ChevronLeft size={20} /> <span className="text-xs uppercase font-bold tracking-wider">Collapse</span></div>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden animate-in fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8 relative mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto min-h-full">
          <Outlet />
        </div>
        
        {/* Persistent Chatbot */}
        <Chatbot />
      </main>
    </div>
  );
}

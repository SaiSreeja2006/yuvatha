import { Link } from 'react-router-dom';
import { ShieldAlert, BookOpenCheck, Activity } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-accent flex flex-col">
      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary">YUVATA</h1>
        <nav className="flex gap-6 items-center">
          <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
          <Link to="/signup" className="bg-primary text-white px-5 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-primary/90 transition-all">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          Your Digital Literacy Partner
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Navigate the Digital World with <span className="text-primary">Confidence</span>
        </h2>
        
        <p className="text-lg md:text-xl text-accent/80 mb-10 max-w-2xl">
          A professional training platform designed to equip youth with essential skills to identify digital risks, detect scams, and practice safe online habits.
        </p>

        <div className="flex gap-4">
          <Link to="/signup" className="bg-primary text-white px-8 py-3 rounded-md font-medium shadow-sm hover:bg-primary/90 transition-all text-lg">
            Create Free Account
          </Link>
          <Link to="/modules" className="bg-white text-primary border border-[#E5D5C5] px-8 py-3 rounded-md font-medium shadow-sm hover:bg-secondary transition-all text-lg">
            Explore Modules
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <Link to="/library" className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5] hover:border-primary transition-all group">
            <div className="w-12 h-12 bg-secondary rounded-md flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <ShieldAlert size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary group-hover:underline">Scam Awareness</h3>
            <p className="text-sm text-accent/80">Learn to identify common scams using our interactive pattern explorer and deepfake detection trainers.</p>
          </Link>
          <Link to="/footprint" className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5] hover:border-primary transition-all group">
            <div className="w-12 h-12 bg-secondary rounded-md flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary group-hover:underline">Footprint Tracker</h3>
            <p className="text-sm text-accent/80">Analyze and reduce your online exposure with our comprehensive digital footprint visualizer.</p>
          </Link>
          <Link to="/modules" className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5] hover:border-primary transition-all group">
            <div className="w-12 h-12 bg-secondary rounded-md flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <BookOpenCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary group-hover:underline">Learning Modules</h3>
            <p className="text-sm text-accent/80">Practice your skills in safe sandbox environments, from verifying links to scenario-based decision making.</p>
          </Link>
        </div>
      </main>
      
      <footer className="py-8 text-center text-sm text-accent/60">
        &copy; {new Date().getFullYear()} YUVATA Platform. All rights reserved.
      </footer>
    </div>
  );
}

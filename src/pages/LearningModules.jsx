import { useState } from 'react';
import QuizApp from '../components/QuizApp';
import ScamExplorer from '../components/ScamExplorer';
import SafeSandbox from '../components/SafeSandbox';
import DeepfakeTrainer from '../components/DeepfakeTrainer';
import ScenarioChoice from '../components/ScenarioChoice';

export default function LearningModules() {
  const [activeModule, setActiveModule] = useState(null);
  
  // Mock literacy score for demonstration
  const literacyScore = 850;
  const isAdvancedUnlocked = true;

  if (activeModule === 'quiz') {
    return <QuizApp onExit={() => setActiveModule(null)} />;
  }

  if (activeModule === 'scam-explorer') {
    return <ScamExplorer onExit={() => setActiveModule(null)} />;
  }

  if (activeModule === 'sandbox') {
    return <SafeSandbox onExit={() => setActiveModule(null)} />;
  }

  if (activeModule === 'deepfake') {
    return <DeepfakeTrainer onExit={() => setActiveModule(null)} />;
  }

  if (activeModule === 'scenario') {
    return <ScenarioChoice onExit={() => setActiveModule(null)} />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Learning Modules</h1>
      <p className="text-accent/70 mb-8 max-w-2xl">Interactive tools and scenario-based training to build your digital resilience.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          onClick={() => setActiveModule('quiz')}
          className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5] hover:border-primary transition-all cursor-pointer group"
        >
          <h2 className="text-xl font-bold text-primary mb-2 group-hover:underline">Scenario Quiz</h2>
          <p className="text-sm text-accent/80 mb-4 h-10">Test your knowledge with real-world digital dilemmas and get tailored feedback.</p>
          <button className="text-sm font-medium text-white bg-primary px-4 py-2 rounded pointer-events-none">Start Quiz</button>
        </div>

        <div 
          onClick={() => setActiveModule('scam-explorer')}
          className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5] hover:border-primary transition-all cursor-pointer group"
        >
          <h2 className="text-xl font-bold text-primary mb-2 group-hover:underline">Scam Explorer</h2>
          <p className="text-sm text-accent/80 mb-4 h-10">Analyze real scam messages and learn to spot the red flags.</p>
          <button className="text-sm font-medium text-white bg-primary px-4 py-2 rounded pointer-events-none">Explore</button>
        </div>

        <div 
          onClick={() => setActiveModule('sandbox')}
          className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5] hover:border-primary transition-all cursor-pointer group"
        >
          <h2 className="text-xl font-bold text-primary mb-2 group-hover:underline">Safe Sandbox</h2>
          <p className="text-sm text-accent/80 mb-4 h-10">Practice identifying safe vs unsafe links and web elements.</p>
          <button className="text-sm font-medium text-white bg-primary px-4 py-2 rounded pointer-events-none">Enter Lab</button>
        </div>

        <div 
          onClick={() => setActiveModule('deepfake')}
          className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5] hover:border-primary transition-all cursor-pointer group"
        >
          <h2 className="text-xl font-bold text-primary mb-2 group-hover:underline">Deepfake Detector</h2>
          <p className="text-sm text-accent/80 mb-4 h-10">Train your eyes to catch AI-generated visual media in simulations.</p>
          <button className="text-sm font-medium text-white bg-primary px-4 py-2 rounded pointer-events-none">Start Training</button>
        </div>

        <div 
          onClick={() => setActiveModule('scenario')}
          className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5] hover:border-primary transition-all cursor-pointer group"
        >
          <h2 className="text-xl font-bold text-primary mb-2 group-hover:underline">"What Would You Do?"</h2>
          <p className="text-sm text-accent/80 mb-4 h-10">Real-life decision simulations via chat interface.</p>
          <button className="text-sm font-medium text-white bg-primary px-4 py-2 rounded pointer-events-none">Play Scenario</button>
        </div>
      </div>
    </div>
  );
}

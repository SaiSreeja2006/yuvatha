import { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, FileVideo, Eye, PlayCircle, Lightbulb, ArrowRight, ShieldCheck, X } from 'lucide-react';
import clsx from 'clsx';

export default function DeepfakeTrainer({ onExit }) {
  const [phase, setPhase] = useState('intro'); // 'intro', 'trainer', 'results'
  const [selected, setSelected] = useState(null); // 'A' or 'B'
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelect = (choice) => {
    if (isRevealed) return;
    setSelected(choice);
  };

  const togglePlayAll = () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(v => {
      if (isPlaying) v.pause();
      else v.play();
    });
    setIsPlaying(!isPlaying);
  };

  const handleReveal = () => {
    if (!selected) return;
    setIsRevealed(true);
  };

  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] animate-in fade-in zoom-in duration-300">
        <button onClick={onExit} className="text-accent/60 hover:text-primary flex items-center gap-2 text-sm font-medium mb-6">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-primary mx-auto mb-6">
            <PlayCircle size={32} />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Deepfake Detection Lab</h2>
          <p className="text-accent/70 leading-relaxed mb-8">
            Visual trust is decaying. Learn to spot the subtle glitches in AI-generated video that reveal it as a Deepfake.
          </p>
          <div className="bg-indigo-50 p-4 rounded border border-indigo-100 mb-10 text-left text-sm text-indigo-900">
            <p className="font-bold mb-1 underline">Observation Goals:</p>
            <ul className="list-disc pl-5 space-y-1 opacity-90 text-xs">
              <li>Facial blinking patterns (unnatural rate)</li>
              <li>Lighting inconsistencies on jawlines</li>
              <li>Mismatched lip synchronization</li>
            </ul>
          </div>
          <button 
            onClick={() => setPhase('trainer')}
            className="w-full bg-primary text-white py-4 rounded-md font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            Begin Training <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] animate-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 shadow-sm ${selected === 'A' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200'}`}>
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Training Complete</h2>
          <p className="text-accent/70">You successfully analyzed the digital artifacts.</p>
        </div>

        <div className="bg-[#FAF6F1] p-6 rounded-lg border border-[#E5D5C5] mb-8">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-yellow-600" /> Professional Insight
          </h3>
          <p className="text-sm text-accent leading-relaxed">
            Deepfakes are becoming harder to spot, but "side-profiles" and "rapid movements" still cause AI to glitch. If you suspect a video is fake, ask the person to wave their hand in front of their face—most AI cannot process this overlap correctly yet.
          </p>
        </div>

        <button 
          onClick={onExit}
          className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-primary/90 transition-colors"
        >
          Finish Training Session
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onExit} className="text-accent/60 hover:text-primary flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} /> Exit
        </button>
        <div className="flex gap-4">
          <button 
            disabled={!isRevealed}
            onClick={() => setPhase('results')} 
            className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md transition-colors disabled:opacity-50"
          >
            Complete Session
          </button>
          <span className="text-sm font-medium text-primary bg-secondary px-3 py-1 rounded-full">
            Detection Trainer
          </span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Can you spot the Deepfake?</h2>
          <p className="text-accent/70 max-w-xl mx-auto mb-6">
            Compare both samples carefully. Watch for unnatural lighting, glitching edges, or irregular movements.
          </p>
          <button 
            onClick={togglePlayAll}
            className="inline-flex items-center gap-2 bg-secondary text-primary px-6 py-2 rounded-full font-bold text-sm border border-primary/20 hover:bg-secondary/70 transition-all shadow-sm"
          >
            {isPlaying ? <><X size={16} /> Pause Both</> : <><PlayCircle size={16} /> Play Side-by-Side</>}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Option A - Authentic */}
          <div 
            onClick={() => handleSelect('A')}
            className={clsx(
              "relative rounded-xl border-2 p-3 cursor-pointer transition-all bg-[#FAF6F1]",
              selected === 'A' ? "border-primary ring-2 ring-primary/20 shadow-lg" : "border-[#E5D5C5] hover:border-primary/50",
              !isRevealed && "hover:shadow-md"
            )}
          >
            <div className="aspect-video bg-black rounded-lg flex flex-col items-center justify-center relative shadow-inner group overflow-hidden">
              <video 
                src="/ss.mp4" 
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
              {!isRevealed && !isPlaying && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none group-hover:bg-black/0 transition-all">
                  <PlayCircle size={40} className="text-white opacity-80" />
                </div>
              )}
              
              {isRevealed && (
                <div className="absolute inset-0 bg-green-900/90 text-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in cursor-default">
                  <CheckCircle2 size={48} className="mb-2 text-green-400" />
                  <p className="font-bold text-xl mb-1 text-green-100">Authentic Footage</p>
                  <p className="text-sm font-medium opacity-80">Natural blinking and skin textures verified.</p>
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-widest">Sample A</div>
            </div>
          </div>

          {/* Option B - Deepfake */}
          <div 
            onClick={() => handleSelect('B')}
            className={clsx(
              "relative rounded-xl border-2 p-3 cursor-pointer transition-all bg-[#FAF6F1]",
              selected === 'B' ? "border-primary ring-2 ring-primary/20 shadow-lg" : "border-[#E5D5C5] hover:border-primary/50",
              !isRevealed && "hover:shadow-md"
            )}
          >
            <div className="aspect-video bg-black rounded-lg flex flex-col items-center justify-center relative shadow-inner group overflow-hidden">
              <video 
                src="/ssss.mp4" 
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
               {!isRevealed && !isPlaying && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none group-hover:bg-black/0 transition-all">
                  <PlayCircle size={40} className="text-white opacity-80" />
                </div>
              )}
              
              {isRevealed && (
                <div className="absolute inset-0 bg-red-900/90 text-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in cursor-default">
                  <XCircle size={48} className="mb-2 text-red-400" />
                  <p className="font-bold text-xl mb-1 text-red-100">AI Deepfake</p>
                  {selected === 'B' 
                    ? <p className="text-sm font-medium">Sharp eye! You caught the AI artifacts.</p> 
                    : <p className="text-sm font-medium opacity-80">Fooled! This one was AI generated.</p>
                  }
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-widest">Sample B</div>
            </div>
          </div>
        </div>

        {!isRevealed ? (
          <div className="text-center">
            <button 
              onClick={handleReveal}
              disabled={!selected}
              className="bg-primary text-white px-8 py-3 rounded-md font-bold shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              <Eye size={18} /> Reveal Result
            </button>
          </div>
        ) : (
          <div className="bg-[#FAF6F1] p-8 rounded-lg border border-[#E5D5C5] animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
              <Lightbulb className="text-yellow-600" /> Analysis of Video Sample B (The Deepfake)
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-primary shrink-0 border border-[#E5D5C5] shadow-sm">1</div>
                <div>
                  <h4 className="font-bold text-accent">Unnatural Blinking</h4>
                  <p className="text-sm text-accent/80">AI models used to struggle with realistic eye movement. While better today, a "dead-eyed" stare or perfectly rhythmic blinks are red flags.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-primary shrink-0 border border-[#E5D5C5] shadow-sm">2</div>
                <div>
                  <h4 className="font-bold text-accent">Skin Texture Smoothing</h4>
                  <p className="text-sm text-accent/80">Video B shows an unnaturally smooth face compared to the neck and ears. This "beauty filter" effect is often a byproduct of the generation process.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-primary shrink-0 border border-[#E5D5C5] shadow-sm">3</div>
                <div>
                  <h4 className="font-bold text-accent">Inconsistent Shadows</h4>
                  <p className="text-sm text-accent/80">Look at the nose—the shadow doesn't quite match the directional light of the environment. Light physics is the final boss for Deepfake AI.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-[#E5D5C5] flex justify-center">
              <button 
                onClick={() => { setSelected(null); setIsRevealed(false); }}
                className="bg-white text-primary border border-primary px-8 py-3 rounded-md font-bold hover:bg-secondary transition-all"
              >
                Reset for Reset Simulation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

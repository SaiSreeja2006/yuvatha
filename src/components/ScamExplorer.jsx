import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Lightbulb, ArrowRight, Award, Search } from 'lucide-react';
import clsx from 'clsx';

const SCAM_MESSAGE = {
  sender: "Federal Bank Info",
  subject: "URGENT: Your Account Has Been Suspended",
  bodyParts: [
    { text: "Dear Customer, ", isSuspicious: false },
    { 
      text: "We have detected unusual activity and your account processing will be suspended immediately.", 
      isSuspicious: true,
      explanation: "Scammers create a false sense of urgency to panic victims into ignoring logic."
    },
    { text: " To verify your identity and restore access, ", isSuspicious: false },
    { 
      text: "please click here immediately: ", 
      isSuspicious: true,
      explanation: "Banks rarely ask you to click a direct link to verify identity. They request you log in normally via their official app/website."
    },
    { 
      text: "http://secure-update-fedbank.net/auth", 
      isSuspicious: true,
      explanation: "This is a fake URL. It uses 'fedbank' to look official, but the domain '.net' and sub-domain are unauthorized."
    },
    { text: ". Failure to do so within 24 hours will result in permanent account closure. Thank you.", isSuspicious: false }
  ]
};

export default function ScamExplorer({ onExit }) {
  const [phase, setPhase] = useState('intro'); // 'intro', 'explore', 'results'
  const [hoveredExplanation, setHoveredExplanation] = useState(null);
  const [discoveredCount, setDiscoveredCount] = useState(new Set()); // indices of suspicious parts hovered

  const totalSuspicious = SCAM_MESSAGE.bodyParts.filter(p => p.isSuspicious).length;

  const handlePointClick = (idx, part) => {
    if (part.isSuspicious) {
      setHoveredExplanation(prev => prev === part.explanation ? null : part.explanation);
      setDiscoveredCount(prev => new Set(prev).add(idx));
    }
  };

  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] animate-in fade-in zoom-in duration-300">
        <button onClick={onExit} className="text-accent/60 hover:text-primary flex items-center gap-2 text-sm font-medium mb-6">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-primary mx-auto mb-6">
            <Search size={32} />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Scam Pattern Explorer</h2>
          <p className="text-accent/70 leading-relaxed mb-8">
            In this module, you will analyze a suspicious email. Your goal is to find all the "Red Flags" that scammers use to deceive people.
          </p>
          <div className="bg-blue-50 p-4 rounded border border-blue-100 mb-10 text-left">
            <h4 className="font-bold text-sm mb-1 text-blue-900">Learning Objective</h4>
            <p className="text-xs text-blue-800">Identify urgency, suspicious URLs, and unauthorized domains in bank communication.</p>
          </div>
          <button 
            onClick={() => setPhase('explore')}
            className="w-full bg-primary text-white py-4 rounded-md font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            Enter Explorer <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] animate-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 font-bold text-2xl">
            {discoveredCount.size}/{totalSuspicious}
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Analysis Complete</h2>
          <p className="text-accent/70">
            {discoveredCount.size === totalSuspicious 
              ? "Exceptional work! You spotted all the hidden dangers in this message."
              : discoveredCount.size > 0 
                ? `You found ${discoveredCount.size} out of ${totalSuspicious} red flags. You're getting better at spotting scams!`
                : "You missed the red flags this time. Don't worry, that's what this lab is for!"
            }
          </p>
        </div>

        <div className="bg-[#FAF6F1] p-6 rounded-lg border border-[#E5D5C5] mb-8">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-yellow-600" /> Key Takeaway
          </h3>
          <p className="text-sm text-accent leading-relaxed">
            Always check the <span className="font-bold">From</span> address and the <span className="font-bold">Domain</span> of links. Banks will never use generic domains like .net or .cc for official identity verification.
          </p>
        </div>

        <button 
          onClick={onExit}
          className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-primary/90 transition-colors"
        >
          Return to Modules
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onExit} className="text-accent/60 hover:text-primary flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} /> Exit
        </button>
        <div className="flex gap-4">
          <button onClick={() => setPhase('results')} className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md transition-colors">
            Finish Analysis
          </button>
          <span className="text-sm font-medium text-primary bg-secondary px-3 py-1 rounded-full">
            {discoveredCount.size}/{totalSuspicious} Flags Found
          </span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] mb-8 relative">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-primary text-center">Scan the Message</h2>
        <p className="text-xs md:text-sm text-accent/70 mb-6 text-center">Tap or click on the red highlighted text to analyze.</p>
        
        <div className="border border-[#E5D5C5] rounded-md overflow-hidden bg-gray-50">
          <div className="bg-[#FAF6F1] border-b border-[#E5D5C5] p-4 text-sm">
            <p><span className="font-semibold text-accent/60 w-16 inline-block">From:</span> {SCAM_MESSAGE.sender} &lt;security@alert-system.cc&gt;</p>
            <p className="mt-1"><span className="font-semibold text-accent/60 w-16 inline-block">To:</span> you@example.com</p>
          </div>
          <div className="p-4 md:p-6 text-sm md:text-base leading-relaxed bg-white min-h-[150px]">
            {SCAM_MESSAGE.bodyParts.map((part, idx) => (
              <span 
                key={idx} 
                className={clsx(
                  part.isSuspicious && "bg-red-50 hover:bg-red-100 text-red-900 border-b-2 border-dotted border-red-500 cursor-pointer px-1 transition-colors mx-0.5 inline-block md:inline"
                )}
                onClick={() => handlePointClick(idx, part)}
              >
                {part.text}
              </span>
            ))}
          </div>
        </div>

        <div className={clsx(
          "mt-6 p-4 md:p-5 rounded-xl border text-sm transition-all duration-300 transform min-h-[80px]",
          hoveredExplanation ? "border-red-300 bg-red-50 opacity-100 translate-y-0 shadow-md" : "border-[#E5D5C5] bg-[#FAF6F1] opacity-70 translate-y-1"
        )}>
          <div className="flex items-start gap-3">
            <AlertTriangle className={clsx("shrink-0", hoveredExplanation ? "text-red-500" : "text-accent/30")} size={20} />
            <div>
              <h4 className={clsx("font-bold mb-1 text-xs uppercase tracking-tighter", hoveredExplanation ? "text-red-900" : "text-accent/50")}>
                {hoveredExplanation ? "Threat Detected" : "Security Analysis"}
              </h4>
              <p className={clsx("text-sm leading-tight", hoveredExplanation ? "text-red-800 font-medium" : "text-accent/40 italic")}>
                {hoveredExplanation || "Start searching the text above for suspicious elements..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

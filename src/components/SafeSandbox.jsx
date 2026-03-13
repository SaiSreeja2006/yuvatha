import { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, ShieldCheck, ArrowRight, Lightbulb } from 'lucide-react';
import clsx from 'clsx';

const ELEMENTS = [
  {
    id: 1,
    type: 'link',
    content: 'www.amazon-support-helpdesk.com/login',
    isSafe: false,
    explanation: 'Unsafe: Scammers use hyphens and extra words to look like a legitimate brand. The real domain is always just amazon.com.'
  },
  {
    id: 2,
    type: 'link',
    content: 'https://www.netflix.com/browse',
    isSafe: true,
    explanation: 'Safe: The domain is exactly netflix.com and uses a secure HTTPS connection.'
  },
  {
    id: 3,
    type: 'message',
    content: '"Your Netflix subscription has expired. Click here to update payment: bit.ly/netfIix-upd"',
    isSafe: false,
    explanation: 'Unsafe: A big brand will never use link shorteners (like bit.ly) for official account updates. Also notice the capital "i" replacing the "l" in netfIix.'
  },
  {
    id: 4,
    type: 'button',
    content: 'Download Free PDF',
    context: 'On a pop-up ad with a bright flashing background',
    isSafe: false,
    explanation: 'Unsafe: Flashing ads promising free downloads usually bundle malware or adware with the file.'
  }
];

export default function SafeSandbox({ onExit }) {
  const [phase, setPhase] = useState('intro'); // 'intro', 'lab', 'results'
  const [inspected, setInspected] = useState({}); // { id: boolean }

  const handleInspect = (el) => {
    setInspected(prev => ({ ...prev, [el.id]: true }));
  };

  const completedCount = Object.keys(inspected).length;

  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] animate-in fade-in zoom-in duration-300">
        <button onClick={onExit} className="text-accent/60 hover:text-primary flex items-center gap-2 text-sm font-medium mb-6">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-primary mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Safe Practice Lab</h2>
          <p className="text-accent/70 leading-relaxed mb-8">
            This module tests your ability to differentiate between secure and malicious digital components. In the lab, you must inspect 4 items and determine their safety.
          </p>
          <div className="bg-green-50 p-4 rounded border border-green-100 mb-10 text-left text-sm text-green-900">
            <p className="font-bold mb-1">Look for:</p>
            <ul className="list-disc pl-5 space-y-1 opacity-80">
              <li>Mispelled domains</li>
              <li>Unauthorized link shorteners</li>
              <li>Missing HTTPS protocols</li>
            </ul>
          </div>
          <button 
            onClick={() => setPhase('lab')}
            className="w-full bg-primary text-white py-4 rounded-md font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            Enter Lab Environment <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] animate-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-700 mx-auto mb-4 font-bold text-2xl border-2 border-green-200">
            {completedCount}/{ELEMENTS.length}
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Lab Assessment Complete</h2>
          <p className="text-accent/70">You have completed the inspection of all lab elements.</p>
        </div>

        <div className="bg-[#FAF6F1] p-6 rounded-lg border border-[#E5D5C5] mb-8">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-yellow-600" /> Pro Tip
          </h3>
          <p className="text-sm text-accent leading-relaxed italic">
            "When in doubt, don't click out." Always navigate to the official website manually by typing the address in your browser instead of clicking provided links.
          </p>
        </div>

        <button 
          onClick={onExit}
          className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-primary/90 transition-colors"
        >
          Finish Lab
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onExit} className="text-accent/60 hover:text-primary flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} /> Exit Lab
        </button>
        <div className="flex gap-4">
          <button 
            disabled={completedCount < ELEMENTS.length}
            onClick={() => setPhase('results')} 
            className="text-sm font-medium text-white bg-primary hover:bg-primary/90 px-3 py-1 rounded-md transition-colors disabled:opacity-50"
          >
            Submit for Results
          </button>
          <span className="text-sm font-medium text-primary bg-secondary px-3 py-1 rounded-full">
            {completedCount}/{ELEMENTS.length} Inspected
          </span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] mb-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Safe Internet Practice Lab</h2>
          <p className="text-accent/70 max-w-2xl">
            Click on the digital elements below to "inspect" them. Learn to identify which are safe and which are dangerous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ELEMENTS.map(el => {
            const isRevealed = inspected[el.id];

            return (
              <div 
                key={el.id} 
                className={clsx(
                  "border-2 rounded-lg p-6 flex flex-col transition-all",
                  isRevealed ? (el.isSafe ? "border-green-400 bg-green-50 shadow-inner" : "border-red-400 bg-red-50 shadow-inner") : "border-[#E5D5C5] bg-[#FAF6F1] cursor-pointer hover:border-primary/50 hover:shadow-md"
                )}
                onClick={() => handleInspect(el)}
              >
                {!isRevealed ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                    <span className="text-xs uppercase font-bold text-accent/50 mb-4 tracking-wider">{el.type}</span>
                    <p className="font-mono text-sm bg-white px-3 py-2 rounded border border-[#E5D5C5] shadow-sm break-all">{el.content}</p>
                    {el.context && <p className="text-xs text-accent/60 mt-4 italic">Context: {el.context}</p>}
                    <span className="mt-8 text-sm font-medium text-primary underline">Click to Inspect</span>
                  </div>
                ) : (
                  <div className="flex-1 animate-in fade-in duration-300">
                    <div className="flex items-start gap-3 mb-4">
                      {el.isSafe ? <CheckCircle className="text-green-600 shrink-0" /> : <AlertTriangle className="text-red-500 shrink-0" />}
                      <h4 className={clsx("font-bold text-lg", el.isSafe ? "text-green-800" : "text-red-800")}>
                        {el.isSafe ? 'Verified Safe' : 'Threat Detected'}
                      </h4>
                    </div>
                    <p className="font-mono text-xs bg-white/50 px-2 py-1 rounded mb-4 break-all opacity-70 border border-[#E5D5C5]">{el.content}</p>
                    <p className={clsx("text-sm font-medium leading-relaxed", el.isSafe ? "text-green-900" : "text-red-900")}>
                      {el.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

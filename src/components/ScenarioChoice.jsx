import { useState } from 'react';
import { ArrowLeft, User, MessageCircle, AlertCircle, CheckCircle, ArrowRight, BrainCircuit, Lightbulb } from 'lucide-react';

const SCENARIO = {
  text: "You receive a job offer on Telegram promising ₹5,000 per day for simple online tasks like 'liking YouTube videos'. They ask for a registration fee of ₹500 to 'set up your payment account'.",
  sender: "HR Recruiter - TopCorp",
  options: [
    { id: 1, text: "Pay the fee, it's a small investment for a big return.", correct: false, explanation: "Never pay upfront fees for a job. This is the classic hook of a Task Scam. They take the ₹500 and block you." },
    { id: 2, text: "Ignore the offer entirely.", correct: true, explanation: "Safe option. Legitimate employers do not recruit via unsolicited Telegram messages." },
    { id: 3, text: "Do the tasks first, tell them to deduct the ₹500 from your earnings.", correct: false, explanation: "Engaging at all is risky. They will invent excuses why you must send money first, continuing the manipulation." },
    { id: 4, text: "Report the number/account on Telegram to protect others.", correct: true, explanation: "Best option! Blocking and reporting helps take down the scammer's infrastructure." }
  ]
};

export default function ScenarioChoice({ onExit }) {
  const [phase, setPhase] = useState('intro'); // 'intro', 'scenario', 'results'
  const [selected, setSelected] = useState(null);

  const handleChoice = (opt) => {
    setSelected(opt);
  };

  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] animate-in fade-in zoom-in duration-300">
        <button onClick={onExit} className="text-accent/60 hover:text-primary flex items-center gap-2 text-sm font-medium mb-6">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-primary mx-auto mb-6">
            <BrainCircuit size={32} />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Decision Simulator</h2>
          <p className="text-accent/70 leading-relaxed mb-8">
            Experience a real-world digital interaction in a safe environment. Your choices will determine whether you fall victim to a scam or emerge protected.
          </p>
          <div className="bg-amber-50 p-4 rounded border border-amber-100 mb-10 text-left">
            <h4 className="font-bold text-sm mb-1 text-amber-900">Psychology of Scams</h4>
            <p className="text-xs text-amber-800 italic">Scammers use 'Task Fraud' to lure you with easy money. They often request 'entry fees' or 'taxes' before releasing your supposed earnings.</p>
          </div>
          <button 
            onClick={() => setPhase('scenario')}
            className="w-full bg-primary text-white py-4 rounded-md font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            Start Simulation <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] animate-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 shadow-sm ${selected?.correct ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
            {selected?.correct ? <CheckCircle size={40} /> : <AlertCircle size={40} />}
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Simulation Ended</h2>
          <p className="text-accent/70">Your decision has been analyzed by our safety experts.</p>
        </div>

        <div className="bg-[#FAF6F1] p-6 rounded-lg border border-[#E5D5C5] mb-8">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-yellow-600" /> Wisdom for the Future
          </h3>
          <p className="text-sm text-accent leading-relaxed">
            {selected?.explanation}
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
          <ArrowLeft size={16} /> Exit Simulator
        </button>
        <div className="flex gap-4">
          <button 
            disabled={!selected}
            onClick={() => setPhase('results')} 
            className="text-sm font-medium text-white bg-primary hover:bg-primary/90 px-3 py-1 rounded-md transition-colors disabled:opacity-50"
          >
            See Impact
          </button>
          <span className="text-sm font-medium text-primary bg-secondary px-3 py-1 rounded-full">
            Choice: {selected ? 'Logged' : 'Pending...'}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E5D5C5] overflow-hidden">
        <div className="bg-[#FAF6F1] p-4 border-b border-[#E5D5C5] flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
            <User size={20} />
          </div>
          <div>
            <h3 className="font-bold text-accent">{SCENARIO.sender}</h3>
            <p className="text-xs text-accent/60 italic">Searching for candidates...</p>
          </div>
        </div>
        
        <div className="p-6 bg-[#FAF6F1]/50 h-52 flex items-end">
          <div className="bg-white border border-[#E5D5C5] p-5 rounded-xl rounded-bl-sm shadow-sm max-w-lg mb-4 ml-2 animate-in slide-in-from-left-4 duration-500">
            <p className="text-[15px] leading-relaxed relative flex gap-3">
              <MessageCircle size={18} className="text-primary mt-1 shrink-0" />
              <span>{SCENARIO.text}</span>
            </p>
          </div>
        </div>

        <div className="p-8 bg-white border-t border-[#E5D5C5]">
          <h2 className="text-xl font-bold mb-6 text-primary">How do you respond?</h2>
          
          <div className="grid grid-cols-1 gap-3">
            {SCENARIO.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleChoice(opt)}
                className={clsx(
                  "p-4 border rounded-lg text-left text-sm font-medium transition-all shadow-sm flex items-center gap-3",
                  selected?.id === opt.id 
                    ? "border-primary bg-secondary text-primary" 
                    : "border-[#E5D5C5] hover:border-primary/50 hover:bg-[#FAF6F1]"
                )}
              >
                <div className={clsx(
                  "w-2 h-2 rounded-full",
                  selected?.id === opt.id ? "bg-primary" : "bg-transparent"
                )}></div>
                {opt.text}
              </button>
            ))}
          </div>
          
          {selected && (
            <div className="mt-8 p-5 bg-[#FAF6F1] rounded-lg border border-dashed border-[#E5D5C5] animate-in fade-in duration-300">
              <h4 className="text-xs font-bold text-accent/50 uppercase tracking-widest mb-2 italic">Thinking...</h4>
              <p className="text-sm text-accent">You are choosing to {selected.text.toLowerCase()} Click "See Impact" above to see what happens next.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

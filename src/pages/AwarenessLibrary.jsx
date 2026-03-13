import { useState } from 'react';
import { ChevronRight, ShieldAlert, Smartphone, Briefcase, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

const SCAM_TYPES = [
  {
    id: "phishing",
    title: "Phishing & Smishing",
    icon: ShieldAlert,
    color: "bg-red-100 text-red-600 border-red-200",
    description: "Deceptive messages designed to steal sensitive information.",
    howItWorks: "Scammers send emails or texts pretending to be trusted organizations (banks, streaming services). They create urgency and include links to fake login pages designed to harvest your credentials.",
    warningSigns: [
      "Generic greetings like 'Dear Customer'",
      "Urgent requests indicating account suspension",
      "Mismatched or confusing URLs",
      "Requests for OTPs or passwords"
    ],
    targets: "Everyone using email or mobile phones, especially targeting users of popular banking or tech services."
  },
  {
    id: "digital-arrest",
    title: "Digital Arrest Frauds",
    icon: Smartphone,
    color: "bg-orange-100 text-orange-600 border-orange-200",
    description: "Extortion via fake law enforcement impersonation.",
    howItWorks: "Victims receive a call claiming a parcel in their name contains illegal substances. They are connected to 'officers' via video call who demand immediate payment to 'clear their name'.",
    warningSigns: [
      "Calls claiming to be from FedEx, Customs, or Police",
      "Demand to join a Skype/WhatsApp video call",
      "Threats of immediate arrest if money isn't paid",
      "Instructions not to disconnect the call or talk to family"
    ],
    targets: "Professionals and elderly individuals who are easily intimidated by fake authority figures."
  },
  {
    id: "job-scams",
    title: "Work-From-Home Scams",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-600 border-blue-200",
    description: "Fake employment offers requiring upfront payments.",
    howItWorks: "Received via WhatsApp or Telegram, users are offered high pay for simple tasks like liking YouTube videos or writing reviews. After earning trivial amounts initially, victims are asked to 'recharge' or pay a fee for larger tasks.",
    warningSigns: [
      "Unsolicited job offers via WhatsApp/Telegram",
      "Too-good-to-be-true daily income claims",
      "Requests for a 'registration fee' or 'security deposit'",
      "Using cryptocurrency for payments"
    ],
    targets: "Students, homemakers, and individuals looking for part-time income."
  },
  {
    id: "investment",
    title: "Investment & Crypto Scams",
    icon: TrendingUp,
    color: "bg-green-100 text-green-600 border-green-200",
    description: "Fraudulent schemes promising guaranteed high returns.",
    howItWorks: "Scammers approach victims on social media to brag about huge profits. They direct victims to highly convincing trading platforms where numbers go up—until the victim tries to withdraw their funds.",
    warningSigns: [
      "Promises of 'guaranteed' high returns with 'zero risk'",
      "Pressure to invest quickly before an 'opportunity' closes",
      "Unregistered trading platforms with lookalike names",
      "Difficulty or demands for 'tax payments' when trying to withdraw"
    ],
    targets: "Individuals interested in stock trading, cryptocurrency, and passive income."
  }
];

export default function AwarenessLibrary() {
  const [activeScam, setActiveScam] = useState(SCAM_TYPES[0]);
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(false);

  const handleSelectScam = (scam) => {
    setActiveScam(scam);
    setShowDetailOnMobile(true);
  };

  return (
    <div className="md:h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Scam Awareness Hub</h1>
        <p className="text-accent/70 max-w-2xl">Explore our knowledge base detailing the anatomy of modern scams to recognize them instantly.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        {/* Sidebar List */}
        <div className={clsx(
          "w-full md:w-1/3 bg-white border border-[#E5D5C5] rounded-lg shadow-sm overflow-y-auto flex flex-col",
          showDetailOnMobile ? "hidden md:flex" : "flex"
        )}>
          <div className="p-4 border-b border-[#E5D5C5] bg-[#FAF6F1] flex justify-between items-center">
            <h3 className="font-semibold text-primary">Scam Categories</h3>
            <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-primary font-bold md:hidden tracking-wider uppercase">Pick One</span>
          </div>
          <div className="p-2 flex-1">
            {SCAM_TYPES.map((scam) => {
              const isActive = activeScam.id === scam.id;
              const Icon = scam.icon;
              return (
                <button
                  key={scam.id}
                  onClick={() => handleSelectScam(scam)}
                  className={clsx(
                    "w-full flex items-center justify-between p-4 md:p-3 mb-2 rounded-lg transition-all border text-left",
                    isActive ? "bg-secondary border-primary shadow-sm" : "bg-transparent border-transparent hover:bg-gray-50 bg-[#FAF6F1]/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={clsx("w-10 h-10 md:w-8 md:h-8 rounded-full flex items-center justify-center border", scam.color)}>
                      <Icon size={isActive ? 20 : 16} />
                    </div>
                    <div>
                      <p className={clsx("font-bold md:font-medium text-[15px] md:text-sm", isActive ? "text-primary" : "text-accent")}>{scam.title}</p>
                      <p className="text-[11px] text-accent/50 md:hidden mt-0.5">{scam.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className={clsx("transition-transform", isActive ? "text-primary translate-x-1" : "text-accent/30")} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail View */}
        <div className={clsx(
          "w-full md:w-2/3 bg-white border border-[#E5D5C5] rounded-lg shadow-sm overflow-y-auto relative",
          showDetailOnMobile ? "block" : "hidden md:block"
        )}>
          {/* Mobile Back Button */}
          <div className="md:hidden bg-[#FAF6F1] p-3 border-b border-[#E5D5C5] sticky top-0 z-10 flex items-center">
            <button 
              onClick={() => setShowDetailOnMobile(false)}
              className="flex items-center gap-2 text-primary font-bold text-sm"
            >
              <ChevronRight size={20} className="rotate-180" /> Back to List
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <div className={clsx("w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center border-2 shadow-sm", activeScam.color)}>
                <activeScam.icon size={28} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">{activeScam.title}</h2>
                <p className="text-accent/70 mt-1 text-sm md:text-base">{activeScam.description}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-3 border-b-2 border-secondary inline-block pb-1">Anatomy of the Scam</h3>
                <p className="text-sm md:text-base text-accent/90 leading-relaxed bg-[#FAF6F1] p-5 rounded-xl border border-[#E5D5C5] shadow-sm">
                  {activeScam.howItWorks}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 border-b-2 border-secondary inline-block pb-1">Warning Signs</h3>
                <ul className="grid grid-cols-1 gap-3">
                  {activeScam.warningSigns.map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-white text-accent p-4 rounded-xl border border-[#E5D5C5] shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <ShieldAlert size={14} className="text-red-500" />
                      </div>
                      <span className="text-sm font-bold opacity-80">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                <h3 className="text-sm font-bold mb-2 uppercase tracking-widest text-primary/60">Primary Targets</h3>
                <p className="text-accent font-bold opacity-80 flex items-center gap-2">
                  {activeScam.targets}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

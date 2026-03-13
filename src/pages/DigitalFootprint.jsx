import { useState } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ShieldCheck, ShieldAlert, AlertTriangle, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export default function DigitalFootprint() {
  const [step, setStep] = useState('input'); // 'input', 'report'
  const [answers, setAnswers] = useState({
    socialMedia: 5,
    emailExposure: 5,
    locationSharing: 5,
    passwordReuse: 5,
    onlineShopping: 5
  });

  const handleSlider = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: parseInt(e.target.value)
    });
  };

  const generateReport = () => {
    setStep('report');
  };

  const resetForm = () => {
    setStep('input');
    setAnswers({ socialMedia: 5, emailExposure: 5, locationSharing: 5, passwordReuse: 5, onlineShopping: 5 });
  };

  const reportData = [
    { subject: 'Social Media', A: answers.socialMedia * 10, fullMark: 100 },
    { subject: 'Email / Accounts', A: answers.emailExposure * 10, fullMark: 100 },
    { subject: 'Location Tracing', A: answers.locationSharing * 10, fullMark: 100 },
    { subject: 'Password Security', A: answers.passwordReuse * 10, fullMark: 100 },
    { subject: 'E-commerce Data', A: answers.onlineShopping * 10, fullMark: 100 },
  ];

  const totalRisk = Object.values(answers).reduce((a, b) => a + b, 0);
  const riskPercentage = (totalRisk / 50) * 100;

  let riskTier = { label: 'Low Risk', color: 'text-green-600', icon: ShieldCheck, bg: 'bg-green-100' };
  if (riskPercentage > 40) riskTier = { label: 'Medium Risk', color: 'text-yellow-600', icon: AlertTriangle, bg: 'bg-yellow-100' };
  if (riskPercentage > 75) riskTier = { label: 'High Exposure', color: 'text-red-600', icon: ShieldAlert, bg: 'bg-red-100' };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Footprint Tracker</h1>
        <p className="text-accent/70 max-w-2xl mx-auto">Analyze how much of your personal data is exposed online based on your daily habits.</p>
      </div>

      {step === 'input' && (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5]">
          <h2 className="text-xl font-bold mb-6 border-b border-[#E5D5C5] pb-4">Describe Your Online Habits</h2>
          
          <div className="space-y-8">
            <div className="form-group">
              <label className="block font-semibold text-primary mb-2">Social Media Sharing</label>
              <div className="flex justify-between text-xs text-accent/60 mb-1 px-1">
                <span>Private & Minimal</span>
                <span>Public & Frequent</span>
              </div>
              <input 
                type="range" name="socialMedia" min="1" max="10" 
                value={answers.socialMedia} onChange={handleSlider}
                className="w-full accent-primary h-2 bg-[#E5D5C5] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="form-group">
              <label className="block font-semibold text-primary mb-2">Email Sign-ups</label>
              <div className="flex justify-between text-xs text-accent/60 mb-1 px-1">
                <span>Use dummy emails</span>
                <span>Use primary email for everything</span>
              </div>
              <input 
                type="range" name="emailExposure" min="1" max="10" 
                value={answers.emailExposure} onChange={handleSlider}
                className="w-full accent-primary h-2 bg-[#E5D5C5] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="form-group">
              <label className="block font-semibold text-primary mb-2">Location Services</label>
              <div className="flex justify-between text-xs text-accent/60 mb-1 px-1">
                <span>Always off/Restricted</span>
                <span>Always allowed for all apps</span>
              </div>
              <input 
                type="range" name="locationSharing" min="1" max="10" 
                value={answers.locationSharing} onChange={handleSlider}
                className="w-full accent-primary h-2 bg-[#E5D5C5] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="form-group">
              <label className="block font-semibold text-primary mb-2">Password Practices</label>
              <div className="flex justify-between text-xs text-accent/60 mb-1 px-1">
                <span>Unique/Password Manager</span>
                <span>Same password everywhere</span>
              </div>
              <input 
                type="range" name="passwordReuse" min="1" max="10" 
                value={answers.passwordReuse} onChange={handleSlider}
                className="w-full accent-primary h-2 bg-[#E5D5C5] rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button 
              onClick={generateReport}
              className="bg-primary text-white px-6 py-3 rounded-md font-medium shadow-sm hover:bg-primary/90 flex items-center gap-2"
            >
              Analyze My Footprint <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 'report' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-500">
          
          {/* Chart Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5]">
            <h2 className="text-xl font-bold mb-4 text-center">Exposure Radar</h2>
            <div className="h-80 w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={reportData}>
                  <PolarGrid stroke="#E5D5C5" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B4F3B', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Exposure" dataKey="A" stroke="#6B4F3B" fill="#F5E9DA" fillOpacity={0.8} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: '1px solid #E5D5C5', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <p className="text-sm text-accent/70 px-4">The larger the shape, the wider your digital footprint and potential exposure to data brokers or attackers.</p>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5] text-center">
              <div className={clsx("w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4", riskTier.bg, riskTier.color)}>
                <riskTier.icon size={32} />
              </div>
              <h2 className="text-sm text-accent/60 uppercase tracking-widest font-semibold mb-1">Overall Risk Level</h2>
              <h3 className={clsx("text-4xl font-bold mb-2", riskTier.color)}>{riskTier.label}</h3>
              <p className="text-accent/80">Your footprint score is {Math.round(riskPercentage)}%</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5]">
              <h3 className="font-bold text-primary mb-4 border-b border-[#E5D5C5] pb-2">Key Recommendations</h3>
              <ul className="space-y-3 text-sm">
                {answers.passwordReuse > 5 && (
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <span>Stop reusing passwords immediately. A breach on one site compromises all your accounts. Use a password manager.</span>
                  </li>
                )}
                {answers.socialMedia > 5 && (
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold mt-0.5">•</span>
                    <span>Audit your social media privacy settings. Limit exposure to "Friends Only" to prevent data scraping.</span>
                  </li>
                )}
                {answers.locationSharing > 5 && (
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold mt-0.5">•</span>
                    <span>Review app permissions. Only grant location access 'While using the app' rather than 'Always'.</span>
                  </li>
                )}
                {Object.values(answers).every(v => v <= 5) && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-0.5">•</span>
                    <span>Excellent habits! Keep minimizing unnecessary data sharing and auditing your active accounts routinely.</span>
                  </li>
                )}
              </ul>
            </div>

            <button 
              onClick={resetForm}
              className="w-full bg-white text-primary border border-primary px-6 py-3 rounded-md font-medium hover:bg-secondary transition-colors"
            >
              Recalculate Score
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

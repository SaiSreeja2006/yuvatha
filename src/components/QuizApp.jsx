import { useState } from 'react';
import { DUMMY_QUIZ_DATA } from '../data/quizData';
import { ArrowLeft, CheckCircle2, XCircle, ArrowRight, Award, Lightbulb, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

export default function QuizApp({ onExit }) {
  const [phase, setPhase] = useState('intro'); // 'intro', 'quiz', 'results'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); // track correct/incorrect for suggestions

  const question = DUMMY_QUIZ_DATA[currentIndex];
  const progressPercent = ((currentIndex) / DUMMY_QUIZ_DATA.length) * 100;

  const handleSelect = (optionId) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
    setIsAnswered(true);
    
    const opt = question.options.find(o => o.id === optionId);
    if (opt.isCorrect) {
      setScore(prev => prev + 1);
      setAnswers(prev => [...prev, { 
        id: question.id, 
        correct: true, 
        category: question.category,
        feedback: opt.feedback,
        suggestion: opt.suggestion
      }]);
    } else {
      setAnswers(prev => [...prev, { 
        id: question.id, 
        correct: false, 
        category: question.category,
        feedback: opt.feedback,
        suggestion: opt.suggestion
      }]);
    }
  };

  const handleNext = () => {
    if (currentIndex < DUMMY_QUIZ_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setPhase('results');
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setAnswers([]);
    setPhase('quiz');
  };

  // --- Intro Phase ---
  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onExit} className="text-accent/60 hover:text-primary flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Back
          </button>
          <span className="text-xs font-bold text-primary bg-secondary px-2 py-1 rounded tracking-widest uppercase">Learning Module</span>
        </div>
        
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-primary mx-auto mb-6">
            <Award size={32} />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Digital Risk Scenario Quiz</h2>
          <p className="text-accent/70 leading-relaxed mb-8">
            This module contains 5 realistic scenarios where you must make split-second decisions. Learn to balance convenience with security.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-10 text-left">
            <div className="p-4 bg-gray-50 rounded border border-gray-100">
              <h4 className="font-bold text-sm mb-1 text-primary">Time Required</h4>
              <p className="text-xs text-accent/60">Approx. 5-7 minutes</p>
            </div>
            <div className="p-4 bg-gray-50 rounded border border-gray-100">
              <h4 className="font-bold text-sm mb-1 text-primary">Key Skills</h4>
              <p className="text-xs text-accent/60">Critical Thinking, Detection</p>
            </div>
          </div>

          <button 
            onClick={() => setPhase('quiz')}
            className="w-full bg-primary text-white py-4 rounded-md font-bold text-lg hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
          >
            Start Quiz Now <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // --- Results Phase ---
  if (phase === 'results') {
    const percentage = (score / DUMMY_QUIZ_DATA.length) * 100;
    let rank = "Needs Practice";
    let message = "You're still vulnerable to some common digital risks. Keep learning!";
    
    if (percentage === 100) { rank = "Digital Master"; message = "Perfect score! You have exceptional digital resilience."; }
    else if (percentage >= 80) { rank = "Secured Pro"; message = "Great job! You identified almost all potential threats."; }
    else if (percentage >= 60) { rank = "Smart Explorer"; message = "You're getting better, but a few traps caught you off-guard."; }

    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-[#E5D5C5] animate-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 border-4 border-white shadow-sm font-bold text-2xl">
            {score}/{DUMMY_QUIZ_DATA.length}
          </div>
          <h2 className="text-3xl font-bold text-primary mb-2">Quiz Completed!</h2>
          <div className="inline-block px-4 py-1 bg-secondary text-primary rounded-full font-bold text-sm mb-4">
            Rank: {rank}
          </div>
          <p className="text-accent/70 max-w-md mx-auto">{message}</p>
        </div>

        <div className="bg-[#FAF6F1] p-6 rounded-lg border border-[#E5D5C5] mb-8">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-yellow-600" /> Improvement Suggestions
          </h3>
          <ul className="space-y-4">
            {answers.map((ans, idx) => !ans.correct && (
              <li key={idx} className="flex gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">!</div>
                <div className="text-accent">
                  <span className="font-bold underline mb-1 block">Context: {ans.category} (Q{idx+1})</span>
                  <p>{ans.suggestion}</p>
                </div>
              </li>
            ))}
            {score === DUMMY_QUIZ_DATA.length && (
              <li className="flex gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                <p className="text-accent">You've mastered these concepts. Try the "What Would You Do?" simulation for more advanced practice.</p>
              </li>
            )}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={resetQuiz}
            className="flex items-center justify-center gap-2 bg-white text-primary border border-primary py-3 rounded-md font-bold hover:bg-secondary transition-colors"
          >
            <RotateCcw size={18} /> Retake Quiz
          </button>
          <button 
            onClick={onExit}
            className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-md font-bold hover:bg-primary/90 transition-colors"
          >
            Done <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // --- Quiz Phase ---
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-[#E5D5C5]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5D5C5]">
        <button onClick={onExit} className="text-accent/60 hover:text-primary flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} /> Exit Module
        </button>
        <div className="flex gap-4">
          <button onClick={onExit} className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-3 py-1 rounded-md transition-colors">
            Quit
          </button>
          <span className="text-sm font-medium text-primary bg-secondary px-3 py-1 rounded-full">
            {question.category}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs font-medium text-accent/60 mb-2">
          <span>Question {currentIndex + 1} of {DUMMY_QUIZ_DATA.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="w-full bg-[#E5D5C5] rounded-full h-1.5 overflow-hidden">
          <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <h2 className="text-xl font-bold leading-relaxed mb-6">
        {question.question}
      </h2>

      <div className="space-y-3 mb-8">
        {question.options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          let uiState = 'default';
          
          if (isAnswered) {
            if (opt.isCorrect) uiState = 'correct';
            else if (isSelected && !opt.isCorrect) uiState = 'incorrect';
            else uiState = 'disabled';
          } else if (isSelected) {
            uiState = 'selected';
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={isAnswered}
              className={clsx(
                "w-full flex items-center p-4 rounded-md border text-left transition-all",
                uiState === 'default' && "border-[#E5D5C5] hover:border-primary/50 hover:bg-[#FAF6F1]",
                uiState === 'correct' && "border-green-500 bg-green-50 text-green-800",
                uiState === 'incorrect' && "border-red-300 bg-red-50 text-red-800",
                uiState === 'disabled' && "border-[#E5D5C5] opacity-60 bg-gray-50 cursor-not-allowed"
              )}
            >
              <div className="flex-1 flex items-center gap-3">
                <span className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
                  uiState === 'default' && "bg-[#F5E9DA] text-[#6B4F3B]",
                  uiState === 'correct' && "bg-green-200 text-green-800",
                  uiState === 'incorrect' && "bg-red-200 text-red-800",
                  uiState === 'disabled' && "bg-gray-200 text-gray-500"
                )}>
                  {opt.id}
                </span>
                <span className="font-medium text-[0.95rem]">{opt.text}</span>
              </div>
              
              {uiState === 'correct' && <CheckCircle2 className="text-green-600 ml-2 shrink-0" />}
              {uiState === 'incorrect' && <XCircle className="text-red-500 ml-2 shrink-0" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-[#FAF6F1] border border-[#E5D5C5] p-5 rounded-md mb-6">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              {selectedOption === question.options.find(o => o.isCorrect).id ? "Success Note" : "Correction Advisory"}
            </h4>
            <p className="text-sm text-accent leading-relaxed">
              {question.options.find(o => o.id === selectedOption)?.feedback}
            </p>
          </div>
          
          <button 
            onClick={handleNext}
            className="w-full bg-primary text-white py-3 rounded-md font-medium flex justify-center items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            {currentIndex === DUMMY_QUIZ_DATA.length - 1 ? 'See Results' : 'Next Scenario'} 
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

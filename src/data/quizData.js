export const DUMMY_QUIZ_DATA = [
  {
    id: 1,
    category: "Scam Awareness",
    question: "You receive a WhatsApp message saying you have won ₹10,000 and asks you to click a link to claim the reward.",
    options: [
      { 
        id: "A", 
        text: "Click the link immediately", 
        isCorrect: false,
        feedback: "Dangerous! Clicking unknown links often leads to phishing sites or automatic malware downloads.",
        suggestion: "Always treat unsolicited 'reward' links as malicious. No real organization gives away money via WhatsApp links."
      },
      { 
        id: "B", 
        text: "Ignore the message", 
        isCorrect: false,
        feedback: "While safe, ignoring doesn't stop the scammer from targeting others. reporting is a better proactive step.",
        suggestion: "Don't just stay silent; reporting helps the platform take down scam infrastructure."
      },
      { 
        id: "C", 
        text: "Verify the source first", 
        isCorrect: false,
        feedback: "Careful! 'Verifying' by replying to the sender tells them your number is active, leading to more scams.",
        suggestion: "Verification should only be done via official contact channels (website/app), never by talking to the suspicious sender."
      },
      { 
        id: "D", 
        text: "Report and block the sender", 
        isCorrect: true,
        feedback: "Perfect! You've protected yourself and helped the community by flagging a malicious actor.",
        suggestion: "You've mastered identifying messaging scams. Share this 'Report & Block' strategy with friends!"
      }
    ]
  },
  {
    id: 2,
    category: "Privacy Protection",
    question: "You are downloading a simple flashlight app and it requests permission to access your contacts and location. What should you do?",
    options: [
      { 
        id: "A", 
        text: "Grant permissions, it's normal", 
        isCorrect: false, 
        feedback: "Risky! A flashlight app has no legitimate reason to see your contacts. This is likely data-harvesting malware.",
        suggestion: "Practice 'Privilege Minimization'—always ask 'Why does this app need this?' before hitting allow."
      },
      { 
        id: "B", 
        text: "Deny permissions and find another app", 
        isCorrect: true,
        feedback: "Smart! Recognizing 'permission creep' is the first line of defense for mobile privacy.",
        suggestion: "You correctly spotted an unnecessary data request. Keep auditing your app permissions regularly."
      },
      { 
        id: "C", 
        text: "Grant location but deny contacts", 
        isCorrect: false,
        feedback: "Still risky. Why would a flashlight need to know where you are? Location data is highly sensitive.",
        suggestion: "Be more strict. If an app asks for *any* irrelevant permission, it's safer to uninstall it entirely."
      },
      { 
        id: "D", 
        text: "Create fake contacts to fool the app", 
        isCorrect: false,
        feedback: "Ineffective. The app still gets your location data and unique device ID. fooling it is harder than just saying no.",
        suggestion: "Don't play games with malicious apps. Denial and deletion are your only effective tools."
      }
    ]
  },
  {
    id: 3,
    category: "Fake News Detection",
    question: "A highly emotional post with no cited sources claims a local hospital is turning away patients. It has thousands of shares. Your next step?",
    options: [
      { 
        id: "A", 
        text: "Share it immediately to warn others", 
        isCorrect: false,
        feedback: "Stop! Emotional posts are designed to make you share without thinking. This is how panic spreads.",
        suggestion: "Apply the 'Pause Rule'. If a post makes you angry or scared, it's likely trying to manipulate you."
      },
      { 
        id: "B", 
        text: "Check official hospital or local news sources", 
        isCorrect: true,
        feedback: "Excellent. Verifying with primary sources (official websites, trusted news) stops misinformation in its tracks.",
        suggestion: "You've mastered the 'Fact-Check First' habit. Keep being a responsible digital citizen."
      },
      { 
        id: "C", 
        text: "Comment asking if it is true", 
        isCorrect: false,
        feedback: "Engaging keeps the post trending in the algorithm, even if you are just asking for proof.",
        suggestion: "Silence is better than engagement for fake news. Verify privately; don't help the algorithm spread it."
      },
      { 
        id: "D", 
        text: "Only send it to family members privately", 
        isCorrect: false,
        feedback: "Private misinformation is still dangerous. You might cause unnecessary panic for your loved ones.",
        suggestion: "Protect your family by verifying news before sending it to them. You are their trusted source."
      }
    ]
  },
  {
    id: 4,
    category: "Cyber Bullying",
    question: "You see a group of students posting hurtful comments on a classmate's photo. What is the most effective way to help?",
    options: [
      { 
        id: "A", 
        text: "Comment back at the bullies to stop", 
        isCorrect: false,
        feedback: "Counter-attacking often escalates the bullying and might turn the target on you as well.",
        suggestion: "Avoid 'Online Vigilantism'. It feels good but usually makes the victim's situation worse."
      },
      { 
        id: "B", 
        text: "Take screenshots and report it to the platform/school", 
        isCorrect: true,
        feedback: "Correct. Documenting evidence and using official reporting channels is the most effective way to end bullying.",
        suggestion: "Evidence is key. Always save proof (screenshots/links) before reporting content that might be deleted."
      },
      { 
        id: "C", 
        text: "Ignore it so you don't get targeted", 
        isCorrect: false,
        feedback: "Being a bystander allows the behavior to continue. You can help safely without being a public target.",
        suggestion: "Don't be a silent observer. Reporting is anonymous on most platforms—use that power."
      },
      { 
        id: "D", 
        text: "Like the hateful comments so you fit in", 
        isCorrect: false,
        feedback: "Participating in bullying, even just by 'liking', is harmful to the victim and your own digital's legacy.",
        suggestion: "Your digital footprint is permanent. Never let social pressure lead you to join harmful behavior."
      }
    ]
  },
  {
    id: 5,
    category: "Secure Passwords",
    question: "Which of the following would be considered the strongest password for your sensitive banking account?",
    options: [
      { 
        id: "A", 
        text: "Rohan@123", 
        isCorrect: false,
        feedback: "Too simple. Passwords using your name and predictable numbers are the first to be cracked.",
        suggestion: "Avoid 'Dictionary Attacks' by removing personal identifiers like names or birth years from passwords."
      },
      { 
        id: "B", 
        text: "password12345", 
        isCorrect: false,
        feedback: "Extremely weak. This is one of the most common passwords in the world and offers zero protection.",
        suggestion: "Stop using sequential numbers or the word 'password'. These are cracked in milliseconds."
      },
      { 
        id: "C", 
        text: "B1ue!7Moun_t@inS", 
        isCorrect: true,
        feedback: "Perfect. This 'passphrase' style is long, complex, and memorable, making it very hard to crack.",
        suggestion: "You've mastered the Passphrase technique. Use this unique complexity for all your main accounts."
      },
      { 
        id: "D", 
        text: "9876543210", 
        isCorrect: false,
        feedback: "Weak. All-number passwords are very easy for computers to guess through simple trial-and-error.",
        suggestion: "Always mix symbols and letters with numbers. A 'numbers-only' password is a wide-open door."
      }
    ]
  }
];

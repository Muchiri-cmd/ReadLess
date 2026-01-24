import { useState } from 'react';
import { BookOpen, Search, Sparkles, User, BookMarked, Target, Lightbulb, TrendingUp, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';

const SummaryPage = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    if (!bookTitle || !author) return;
    setLoading(true); 
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const bookData = {
    title: "Atomic Habits",
    author: "James Clear",
    foreword: "Atomic Habits presents a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    whoIsItFor: [
      "Anyone looking to build better habits and break bad ones",
      "Professionals seeking to improve productivity and performance",
      "People struggling with consistency in their goals",
      "Leaders wanting to create positive organizational cultures"
    ],
    keyTakeaways: [
      {
        title: "The 1% Rule",
        description: "Small changes compound over time. Getting 1% better each day leads to being 37 times better after one year."
      },
      {
        title: "Identity-Based Habits",
        description: "Focus on who you want to become, not what you want to achieve. The goal is not to read a book, but to become a reader."
      },
      {
        title: "The Four Laws of Behavior Change",
        description: "Make it obvious, make it attractive, make it easy, and make it satisfying. These laws form the backbone of habit formation."
      },
      {
        title: "Environment Design",
        description: "Your environment shapes your behavior. Design your space to make good habits obvious and bad habits invisible."
      },
      {
        title: "The Plateau of Latent Potential",
        description: "Results often don't appear until you cross a critical threshold. Success is the product of daily habits, not once-in-a-lifetime transformations."
      }
    ],
    actionableSteps: [
      "Start with a habit that takes less than 2 minutes to complete",
      "Use habit stacking: attach a new habit to an existing one",
      "Create an implementation intention: 'I will [BEHAVIOR] at [TIME] in [LOCATION]'",
      "Make bad habits invisible by removing cues from your environment",
      "Track your habits using a simple calendar or journal",
      "Never miss twice - if you break a habit, get back on track immediately",
      "Join a culture where your desired behavior is the normal behavior"
    ],
    coreConcepts: [
      "Habits are the compound interest of self-improvement",
      "You do not rise to the level of your goals, you fall to the level of your systems",
      "Every action is a vote for the type of person you wish to become",
      "The most effective form of learning is practice, not planning"
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        {showResults && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-8 py-6">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{bookData.title}</h2>
              <p className="text-lg text-slate-600">by {bookData.author}</p>
            </div>

            <div className="px-8 py-8 space-y-10">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">Overview</h3>
                </div>
                <p className="text-slate-700 leading-relaxed text-base">
                  {bookData.foreword}
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">Who This Book Is For</h3>
                </div>
                <ul className="space-y-3">
                  {bookData.whoIsItFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-5">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-slate-900">Key Takeaways</h3>
                </div>
                <div className="space-y-5">
                  {bookData.keyTakeaways.map((takeaway, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">{takeaway.title}</h4>
                      <p className="text-slate-700 leading-relaxed">{takeaway.description}</p>
                    </div>
                  ))}
                </div>
              </section>


              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">Actionable Steps</h3>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                  <p className="text-sm text-blue-900 font-medium mb-4">Start implementing today:</p>
                  <ol className="space-y-3">
                    {bookData.actionableSteps.map((step, index) => (
                      <li key={index} className="flex gap-3 text-slate-700">
                        <span className="font-semibold text-blue-600 flex-shrink-0">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">Core Concepts to Remember</h3>
                </div>
                <div className="grid gap-4">
                  {bookData.coreConcepts.map((concept, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                      <p className="text-slate-700 italic">"{concept}"</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="bg-slate-50 border-t border-slate-200 px-8 py-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Summary generated on {new Date().toLocaleDateString()}</p>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
                  Save to Library
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryPage;
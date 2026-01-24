import { useState } from 'react';
import { BookOpen, Sparkles, User, BookMarked, Target, Lightbulb, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface BookData {
  title: string;
  author: string;
  foreword: string;
  whoIsItFor: string[];
  keyTakeaways: Array<{
    title: string;
    description: string;
  }>;
  actionableSteps: string[];
  coreConcepts: string[];
}

const SummaryPage = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!bookTitle || !author) return;
    
    setLoading(true);
    setError('');
    setShowResults(false);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      // Check if API key exists
      if (!apiKey) {
        throw new Error('API key not found. Make sure VITE_GEMINI_API_KEY is set in your .env file');
      }

      console.log('API Key loaded:', apiKey ? 'Yes' : 'No');
      
      // Initialize the Google GenAI client with API key from environment
      const ai = new GoogleGenAI({
        apiKey: apiKey
      });

      console.log('Sending request to Gemini...');

      const response = await ai.models.generateContent({
        model:  "gemini-2.5-flash",
        contents: `You are a professional book analyst. Provide a comprehensive, structured analysis of the book "${bookTitle}" by ${author}.

Return your response in valid JSON format with this exact structure:
{
  "title": "${bookTitle}",
  "author": "${author}",
  "foreword": "A comprehensive 3-4 sentence overview of the book's main premise, what it covers, and its significance",
  "whoIsItFor": [
    "Detailed description of first target audience",
    "Detailed description of second target audience",
    "Detailed description of third target audience",
    "Detailed description of fourth target audience"
  ],
  "keyTakeaways": [
    {
      "title": "First major concept or principle",
      "description": "Detailed explanation of this concept (2-3 sentences)"
    },
    {
      "title": "Second major concept or principle",
      "description": "Detailed explanation of this concept (2-3 sentences)"
    },
    {
      "title": "Third major concept or principle",
      "description": "Detailed explanation of this concept (2-3 sentences)"
    },
    {
      "title": "Fourth major concept or principle",
      "description": "Detailed explanation of this concept (2-3 sentences)"
    },
    {
      "title": "Fifth major concept or principle",
      "description": "Detailed explanation of this concept (2-3 sentences)"
    }
  ],
  "actionableSteps": [
    "Specific, practical step readers can implement immediately",
    "Another concrete action with clear instructions",
    "Third actionable step with details",
    "Fourth practical implementation step",
    "Fifth actionable takeaway",
    "Sixth practical step",
    "Seventh implementation strategy"
  ],
  "coreConcepts": [
    "Memorable quote or principle from the book",
    "Another key insight or principle",
    "Third core concept or quote",
    "Fourth essential principle"
  ]
}

IMPORTANT: 
- Return ONLY valid JSON, no additional text or markdown formatting
- Make the content comprehensive and insightful
- Ensure all descriptions are detailed and valuable
- Base this on the actual book content if you know it
- If you don't know the book, indicate this in the foreword`
      });

      console.log('Response received:', response);

      const generatedText = response.text;
      console.log('Generated text:', generatedText);
      
      // Extract JSON from the response (handle markdown code blocks)
      let jsonText = generatedText.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/g, '');
      }
      
      const parsedData: BookData = JSON.parse(jsonText);
      setBookData(parsedData);
      setShowResults(true);
      
    } catch (err: any) {
      console.error('Full error:', err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      
      let errorMessage = 'Failed to generate summary. ';
      
      if (err.message?.includes('API key')) {
        errorMessage += 'API key not found in .env file. Add VITE_GEMINI_API_KEY to your .env file.';
      } else if (err.message?.includes('API_KEY_INVALID')) {
        errorMessage += 'Invalid API key. Please check your VITE_GEMINI_API_KEY in .env file.';
      } else if (err.message?.includes('quota')) {
        errorMessage += 'API quota exceeded. Check your Google AI Studio quota.';
      } else {
        errorMessage += `Error: ${err.message || 'Unknown error occurred'}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-semibold text-slate-900">BookBreak</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-600 hover:text-slate-900 text-sm font-medium">Library</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 text-sm font-medium">Dashboard</a>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Account</button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Get Book Summary</h1>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Book Title
              </label>
              <div className="relative">
                <BookMarked className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Enter the book title"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Author
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter the author's name"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !bookTitle || !author}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Comprehensive Summary...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Summary
                </>
              )}
            </button>

           
          </div>
        </div>
        {showResults && bookData && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
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
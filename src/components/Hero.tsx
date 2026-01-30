import { NotebookText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Hero() {
  const [bookTitle, setBookTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!bookTitle.trim()) return;
    navigate(`/summary/${encodeURIComponent(bookTitle)}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Get the insights from any book in minutes, not hours
        </h1>

        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          Clear summaries, actionable takeaways, and immediate understanding.
          <b> Read Less, Take Action More.</b>
        </p>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <NotebookText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

            <input
              type="text"
              placeholder="Summarize any book..."
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
            />

            <button
              onClick={handleSubmit}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              See Summary
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          Try: "Atomic Habits", "Deep Work", or "Sapiens"
        </p>
      </div>
    </section>
  );
}

export default Hero;

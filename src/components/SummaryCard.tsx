import type { SummaryCardProps } from "../types";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatModal from "./ChatModal";

const SummaryCard = ({ bookData }: SummaryCardProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="px-8 pt-8 pb-6 border-b border-slate-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-1 leading-tight">
            {bookData.title}
          </h2>
          <p className="text-base text-slate-500">by {bookData.author}</p>
        </div>

        <div className="px-8 py-10 space-y-12">
          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              What's this book about?
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              {bookData.foreword}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Who should read this
            </h3>
            <div className="space-y-2">
              {bookData.whoIsItFor.map((item, index) => (
                <p key={index} className="text-slate-700 leading-relaxed">
                  • {item}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Key ideas
            </h3>
            <div className="space-y-6">
              {bookData.keyTakeaways.map((takeaway, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    {index + 1}. {takeaway.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed pl-5">
                    {takeaway.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              What you can do right now
            </h3>
            <div className="bg-slate-50 rounded-lg p-6 space-y-3">
              {bookData.actionableSteps.map((step, index) => (
                <p key={index} className="text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">
                    {index + 1}.
                  </span>{" "}
                  {step}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Remember this
            </h3>
            <div className="space-y-4">
              {bookData.coreConcepts.map((concept, index) => (
                <p
                  key={index}
                  className="text-slate-600 italic leading-relaxed pl-4"
                >
                  "{concept}"
                </p>
              ))}
            </div>
          </section>
        </div>

        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">
              Generated {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-64 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-200 flex items-center gap-3 group cursor-pointer"
          aria-label="Ask questions about this book"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-medium ">
            Ask about this book
          </span>
        </button>
      </div>

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        bookData={bookData}
      />
    </>
  );
};

export default SummaryCard;

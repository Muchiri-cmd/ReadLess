import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Stop abandoning books halfway through
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands who read smarter, not harder.
        </p>

        <Link to={`/summary/`}>
          <button className="px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-lg hover:bg-slate-50 inline-flex items-center gap-2">
            Start Reading Smarter
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;

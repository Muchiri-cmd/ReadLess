import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-600" />
          <Link to={"/"}>
            <span className="text-xl font-semibold text-slate-900">
              ReadLess
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to={`/summary/`}>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
              Summarize
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

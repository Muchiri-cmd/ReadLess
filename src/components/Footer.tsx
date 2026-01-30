import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-slate-900">ReadLess</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-900">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-900">
              Terms
            </a>
            <a href="#" className="hover:text-slate-900">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

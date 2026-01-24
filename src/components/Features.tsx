import { BookOpen,CheckCircle,Lightbulb } from "lucide-react"

const Features = () => {
  return (
    <section className="bg-slate-50 py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl border border-slate-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Complete Summary</h3>
          <p className="text-slate-600 leading-relaxed">
            Get the full context, key arguments, and core concepts of any book in a structured, easy-to-digest format.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-slate-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Actionable Steps</h3>
          <p className="text-slate-600 leading-relaxed">
            Clear, practical takeaways you can implement immediately. No fluff, just what you need to know.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-slate-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
            <Lightbulb className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Know Before You Read</h3>
          <p className="text-slate-600 leading-relaxed">
            See who the book is for, what problems it solves, and whether it matches your needs before investing time.
          </p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Features
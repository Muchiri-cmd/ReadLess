const Workings = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How it works</h2>
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex gap-6 items-start">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">1</div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Search for any book</h3>
          <p className="text-slate-600">Enter the title or author and find the book you're interested in.</p>
        </div>
      </div>
      
      <div className="flex gap-6 items-start">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">2</div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Get instant insights</h3>
          <p className="text-slate-600">Read the summary, key takeaways, and actionable steps in minutes.</p>
        </div>
      </div>
      
      <div className="flex gap-6 items-start">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">3</div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Decide and act</h3>
          <p className="text-slate-600">Make an informed choice about reading the full book or apply what you learned immediately.</p>
        </div>
      </div>
    </div>
  </section>

  )
}

export default Workings
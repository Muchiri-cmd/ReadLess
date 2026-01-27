import { BookMarked,AlertCircle,User } from 'lucide-react'
import type { SearchFormProps } from '../types'

const SearchForm = ({
    bookTitle,
    setBookTitle,
    author,
    setAuthor,
    loading,
    error,
    handleSubmit
}: SearchFormProps ) => {
  return (
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
          Author <span className="text-slate-500 text-xs">(optional)</span>
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter the author's name (optional)"
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
        disabled={loading || !bookTitle}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating Comprehensive Summary...
          </>
        ) : (
          <>
            Generate Summary
          </>
        )}
      </button>
    </div>
  </div>
  )
}

export default SearchForm
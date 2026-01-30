import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BookOpen,
  Sparkles,
  User,
  BookMarked,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import Navbar from "../components/Navbar";
import type { BookData } from "../types";
import { buildPrompt } from "../constants/prompt";
import SearchForm from "../components/SearchForm";
import SummaryCard from "../components/SummaryCard";

const SummaryPage = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [error, setError] = useState("");
  const { title } = useParams<{ title: string }>();

  useEffect(() => {
    if (title) {
      setBookTitle(decodeURIComponent(title));
    }
  }, [title]);

  const handleSubmit = async () => {
    if (!bookTitle) return;

    setLoading(true);
    setError("");
    setShowResults(false);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "API key not found. Make sure VITE_GEMINI_API_KEY is set in your .env file",
        );
      }
      const ai = new GoogleGenAI({
        apiKey: apiKey,
      });

      console.log("Sending request to Gemini...");

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: buildPrompt(bookTitle, author),
      });

      console.log("Response received:", response);

      const generatedText = response.text;
      console.log("Generated text:", generatedText);

      let jsonText = generatedText.trim();
      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?$/g, "");
      } else if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/```\n?/g, "");
      }

      const firstBrace = jsonText.indexOf("{");
      const lastBrace = jsonText.lastIndexOf("}");

      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error("No valid JSON object found in AI response");
      }

      jsonText = jsonText.slice(firstBrace, lastBrace + 1);

      const parsedData: BookData = JSON.parse(jsonText);

      setBookData(parsedData);
      setShowResults(true);
    } catch (err: any) {
      console.error("Full error:", err);
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);

      let errorMessage = "Failed to generate summary. ";

      if (err.message?.includes("API key")) {
        errorMessage +=
          "API key not found in .env file. Add VITE_GEMINI_API_KEY to your .env file.";
      } else if (err.message?.includes("API_KEY_INVALID")) {
        errorMessage +=
          "Invalid API key. Please check your VITE_GEMINI_API_KEY in .env file.";
      } else if (
        err.message?.includes("quota") ||
        err.message?.includes("429") ||
        err.message?.includes("RESOURCE_EXHAUSTED")
      ) {
        errorMessage +=
          "Rate limit hit. The free tier has strict limits. Wait 1 minute and try again, or upgrade your API key at https://aistudio.google.com/";
      } else if (err.message?.includes("500") || err.message?.includes("503")) {
        errorMessage +=
          "Gemini service temporarily unavailable. Please try again in a moment.";
      } else {
        errorMessage += `Error: ${err.message || "Unknown error occurred"}`;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <SearchForm
          bookTitle={bookTitle}
          setBookTitle={setBookTitle}
          author={author}
          setAuthor={setAuthor}
          loading={loading}
          error={error}
          handleSubmit={handleSubmit}
        />

        {showResults && bookData && <SummaryCard bookData={bookData} />}
      </div>
    </div>
  );
};

export default SummaryPage;

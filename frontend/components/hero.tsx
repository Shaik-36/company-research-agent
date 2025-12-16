"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

interface HeroProps {
  onSearch: (companyName: string) => void;
  isLoading: boolean;
}

export function Hero({ onSearch, isLoading }: HeroProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 inline mr-2" />
          AI-Powered Company Research
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Uncover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Truth</span> behind any Company
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Get deep insights into mission, culture, founders, and competitors. 
          The ultimate due diligence tool for job seekers.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="relative w-full max-w-xl"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-gray-900 rounded-lg p-2 ring-1 ring-white/10">
            <Search className="w-6 h-6 text-gray-400 ml-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter company name (e.g. Stripe, OpenAI)..."
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-lg px-4 py-2"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Searching..." : "Analyze"}
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}

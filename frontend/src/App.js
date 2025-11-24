import React, { useState } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    if (!topic.trim()) return;

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/scrape", {
        topic: topic
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      setResult({ summary: "Error fetching data" });
    }
  };

   return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg shadow-xl rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Wikipedia Summary Scraper
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Search a topic (e.g., Python)"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-green-600 text-white rounded-xl
                       hover:bg-green-700 active:bg-green-800 transition
                       font-semibold"
          >
            Search
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {result.title}
            </h2>

            <p className="text-gray-700 leading-relaxed">{result.summary}</p>

            {result.url && (
              <a
                href={result.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-green-600 hover:underline font-medium"
              >
                Open full article →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

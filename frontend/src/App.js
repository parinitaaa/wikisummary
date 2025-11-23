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
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Wikipedia Summary Scraper</h1>

      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (example: Python)"
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "10px"
        }}
      />

      <button
        onClick={handleSearch}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Search
      </button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>{result.title}</h2>
          <p>{result.summary}</p>
          {result.url && (
            <a href={result.url} target="_blank" rel="noreferrer">
              Open full article
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

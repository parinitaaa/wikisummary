# 🌐 WikiSnap — Wikipedia Summary Scraper  
A simple full-stack web app that fetches clean, readable summaries from Wikipedia.  
Built with **Flask (Python)** for backend scraping and **React + Tailwind CSS** for a modern UI.

---

## 🚀 Features

✅ Search any topic  
✅ Scrapes live Wikipedia data using BeautifulSoup  
✅ Returns the first meaningful summary  
✅ Clean, modern UI built with React + Tailwind  
✅ Fast backend API with Flask  
✅ CORS enabled for frontend–backend communication  
✅ Error handling for missing/invalid topics  

---
## 🔗 API Endpoint

### POST /api/scrape

### ✅ Request Body
{
  "topic": "India"
}

### ✅ Response
{
  "title": "India",
  "summary": "India is a country in South Asia...",
  "url": "https://en.wikipedia.org/wiki/India"
}



## 🧰 Technologies Used

### ✅ Frontend
- React.js
- Tailwind CSS
- Axios

### ✅ Backend
- Python
- Flask
- BeautifulSoup4
- Requests

### ✅ Dev Tools
- Node.js & npm
- Virtual Environment (venv)
- Git & GitHub



import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   # Allow React frontend to access this API


# Function to fetch and scrape Wikipedia summary
def get_wikipedia_summary(topic):
    try:
        topic_formatted = topic.replace(" ", "_")
        url = f"https://en.wikipedia.org/wiki/{topic_formatted}"

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/120.0.0.0 Safari/537.36",
            "From": "your_email@example.com"
        }

        response = requests.get(url, headers=headers)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        # Extract title
        title = soup.find("h1").get_text(strip=True)

        # summary paragraph
        paragraphs = soup.select("p")
        summary = None

        for p in paragraphs:
            text = p.get_text(strip=True)
            if text and "may refer to:" not in text:
                summary = text
                break

        if not summary:
            summary = "No readable summary found."

        return title, summary, url

    except Exception as e:
        return None, f"Error: {str(e)}", None



# API route for React frontend
@app.route('/api/scrape', methods=['POST'])
def scrape():
    data = request.get_json()
    topic = data.get("topic")

    title, summary, url = get_wikipedia_summary(topic)

    return jsonify({
        "title": title,
        "summary": summary,
        "url": url
    })

if __name__ == '__main__':
    app.run(debug=True)

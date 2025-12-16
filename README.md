# Company Research Agent 🕵️‍♂️🚀

An AI-powered research assistant that provides deep insights into companies for prospective employees, investors, or curious minds.

## 🌟 What is this?

This agentic application automates the due diligence process for researching a company. Instead of spending hours googling, you simply enter a company name, and the agent:
1.  **Searches the web** for the latest info.
2.  **Analyzes** the company's Mission, Vision, and Values.
3.  **Identifies** key founders and leadership.
4.  **Compares** the company with major competitors.
5.  **Evaluates** work culture, financials, and tech stack.
6.  **Synthesizes** a comprehensive, easy-to-read report.

## 🛠️ Tech Stack

-   **Frontend**: Next.js 14, TailwindCSS, Framer Motion (Premium UI)
-   **Backend**: Python, FastAPI
-   **AI/Agent**: LangChain, OpenAI GPT-3.5/4
-   **Tools**: DuckDuckGo Search (for real-time data)

## 🚀 How to Run

### Prerequisites
-   Node.js & npm
-   Python 3.8+
-   OpenAI API Key

### 1. Backend Setup

 Navigate to the backend folder:
 ```bash
 cd backend
 ```

 Create a virtual environment and install dependencies:
 ```bash
 # Windows
 python -m venv venv
 venv\Scripts\activate

 # Mac/Linux
 python3 -m venv venv
 source venv/bin/activate

 pip install -r requirements.txt
 ```

 Set up environment variables:
 Create a `.env` file in `backend/` and add your OpenAI Key:
 ```bash
 OPENAI_API_KEY=sk-your-key-here
 ```

 Run the server:
 ```bash
 uvicorn main:app --reload
 ```
 The backend will run at `http://localhost:8000`.

### 2. Frontend Setup

 Open a new terminal and navigate to the frontend folder:
 ```bash
 cd frontend
 ```

 Install dependencies:
 ```bash
 npm install
 ```

 Run the development server:
 ```bash
 npm run dev
 ```
 Open `http://localhost:3000` in your browser.

## 🔮 Future Improvements

Here are some ideas to make this project even better:
-   **PDF Export**: Download the research report as a beautifully formatted PDF.
-   **Live Web Scraping**: Integrate a headless browser (Puppeteer/Playwright) to scrape specific career pages or blogs.
-   **Deep Financial Analysis**: Integrate with Crunchbase or specific financial APIs for more accurate funding data.
-   **Sentiment Analysis**: Analyze employee reviews from Glassdoor/Reddit to give a "Culture Score".
-   **Deployment**: Deploy the frontend to Vercel and backend to Railway/Render.
